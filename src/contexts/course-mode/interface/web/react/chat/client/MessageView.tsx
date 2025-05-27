'use client';
import { Conversation } from '@/shared/entities/conversation';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { AnimatedChatMessage } from '@/contexts/course-mode/interface/web/react/chat/client/ChatMessage';

interface ChatViewProps {
    conversation: Conversation;
    isGenerating: boolean;
}

export function MessageView({ conversation, isGenerating }: ChatViewProps) {
    return <ChatHistory conversation={conversation} isGenerating={isGenerating} />;
}

const ChatHistory: React.FC<{
    conversation: Conversation;
    isGenerating: boolean;
}> = ({ conversation, isGenerating }) => {
    const bottomSpacerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (bottomSpacerRef.current) {
            bottomSpacerRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, [conversation.messages.length, isGenerating]);

    return (
        <div className='flex-1 overflow-y-auto mb-4 flex flex-col gap-3 px-4 py-6'>
            <AnimatePresence initial={false}>
                {conversation.messages.map((msg) => (
                    <AnimatedChatMessage message={msg} key={msg.id} />
                ))}
            </AnimatePresence>

            <div
                ref={bottomSpacerRef}
                className={`shrink-0 w-full pointer-events-none transition-all duration-300 ease-out ${
                    isGenerating ? 'h-48' : 'h-0'
                }`}
            />
        </div>
    );
};
