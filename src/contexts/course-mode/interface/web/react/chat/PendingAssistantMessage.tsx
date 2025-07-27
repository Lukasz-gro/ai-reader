import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Conversation, ConversationMessage, Role } from '@/shared/entities/conversation';
import { handleNewAssistantMessage, streamLLMResponse } from '../../../controllers/course-mode-controller';

interface PendingAssistantMessageProps {
    conversation: Conversation;
    onConversationUpdate: (c: Conversation) => void;
    onDone: () => void;
}

export const PendingAssistantMessage: React.FC<PendingAssistantMessageProps> = ({ conversation, onConversationUpdate, onDone, }) => {
    const messageId = uuidv4();
    const previousMessageId = conversation.messages.at(-1)?.id ?? null;

    useEffect(() => {
        let isCancelled = false;
        const startStreaming = async () => {
            try {
                const stream = streamLLMResponse(conversation.id);
                const chunks: string[] = [];

                for await (const data of stream) {
                    if (isCancelled) break;
                    chunks.push(data.chunk);
                    updatePendingMessage(chunks);
                }

                if (!isCancelled) {
                    await finalizeMessage(chunks.join(''));
                }
            } catch (error) {
                console.error('LLM streaming failed:', error);
                onDone();
            }
        };

        const updatePendingMessage = (chunks: string[]) => {
            const assistantMessage: ConversationMessage = {
                id: messageId,
                conversationId: conversation.id,
                role: Role.ASSISTANT,
                previousId: previousMessageId,
                content: chunks,
            };

            onConversationUpdate(updateMessageInConversation(conversation, assistantMessage));
        };

        const finalizeMessage = async (finalContent: string) => {
            const updated = await handleNewAssistantMessage(conversation, finalContent, messageId);
            onConversationUpdate(updated);
            onDone();
        };

        const updateMessageInConversation = (conversation: Conversation, message: ConversationMessage): Conversation => {
            const index = conversation.messages.findIndex((m) => m.id === messageId);
            const updatedMessages =
                index === -1
                    ? [...conversation.messages, message]
                    : conversation.messages.map((m, i) => (i === index ? message : m));

            return { ...conversation, messages: updatedMessages };
        };

        void startStreaming();

        return () => {
            isCancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
};
