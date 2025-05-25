import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Conversation } from '@/shared/entities/conversation';
import {
    addAssistantMessageToChat,
    streamLLMResponse
} from '@/contexts/course-mode/interface/web/react/chat/server/chat-actions';
import { Message, Role } from '@/shared/application/ports/out/llm-provider';

interface PendingAssistantMessageProps {
    conversation: Conversation;
    onConversationUpdate: React.Dispatch<React.SetStateAction<Conversation>>;
    onDone: () => void;
}

export const PendingAssistantMessage: React.FC<PendingAssistantMessageProps> = ({ conversation, onConversationUpdate, onDone, }) => {
    const [pendingId] = useState<string>(() => uuidv4());
    const previousIdRef = useRef<string | null>(conversation.messages.at(-1)?.id ?? null);

    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            try {
                let accumulated = "";
                const stream = await streamLLMResponse(conversation);

                for await (const chunk of stream) {
                    if (cancelled) break;
                    accumulated += chunk;

                    onConversationUpdate((prev) => {
                        const existingIdx = prev.messages.findIndex((m) => m.id === pendingId);
                        const assistantMessage: Message = {
                            id: pendingId,
                            role: Role.ASSISTANT,
                            previousId: previousIdRef.current,
                            content: accumulated,
                        };

                        const updatedMessages =
                            existingIdx === -1
                                ? [...prev.messages, assistantMessage]
                                : prev.messages.map((m, idx) => (idx === existingIdx ? assistantMessage : m));

                        return { ...prev, messages: updatedMessages };
                    });
                }

                if (!cancelled) {
                    const finalConversation = await addAssistantMessageToChat(conversation, accumulated, pendingId);
                    onConversationUpdate(finalConversation);
                    onDone();
                }
            } catch (err) {
                console.error("Streaming error", err);
                onDone();
            }
        };

        void run();

        return () => {
            cancelled = true;
        };
    }, []);

    return null;
};
