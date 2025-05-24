'use client';
import { Conversation } from '@/shared/entities/conversation';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { AnimatedChatMessage } from '@/contexts/course-mode/interface/web/react/chat/client/ChatMessage';

interface ChatViewProps {
    conversation: Conversation;
}

export function MessageView({ conversation }: ChatViewProps) {
    return (
        <ChatHistory conversation={conversation} />
    );
}

const ChatHistory: React.FC<{ conversation: Conversation }> = ({ conversation }) => (
    <div className='flex-1 overflow-y-auto mb-4 flex flex-col gap-3 px-4 py-6 min-h-[50vh] max-h-[70vh]'>
        <AnimatePresence initial={false}>
            {conversation.messages.map((msg) =>
                <AnimatedChatMessage message={msg} key={msg.id} />
            )}
        </AnimatePresence>
    </div>
);
