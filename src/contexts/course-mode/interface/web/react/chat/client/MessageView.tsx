'use client';
import { Conversation } from '@/shared/entities/conversation';
import React from 'react';

interface ChatViewProps {
    conversation: Conversation;
}

export function MessageView({ conversation }: ChatViewProps) {
    return (
        <ChatHistory conversation={conversation} />
    );
}

const ChatHistory: React.FC<{ conversation: Conversation }> = ({ conversation }) => (
    <div className={'flex-1 overflow-y-auto mb-4 flex flex-col gap-3 px-4 py-6 min-h-[50vh] max-h-[70vh]'} >
        {conversation.messages.map((msg) =>
            msg.role === 'USER'
                ? <UserMessage key={msg.id}>{msg.content}</UserMessage>
                : <BotMessage key={msg.id}>{msg.content}</BotMessage>
        )}
    </div>
);

const UserMessage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className='self-end bg-s-70 text-p-10 px-5 py-3 rounded-[18px_18px_6px_18px] max-w-[70%] break-words text-base shadow-xl shadow-black/30 border-1 border-s-40 my-1 ml-auto'>
        {children}
    </div>
);

const BotMessage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className=' self-start bg-p-90 text-p-20 px-5 py-3 rounded-[18px_18px_18px_6px] max-w-[70%] break-words text-base shadow-xl shadow-black/30 border-1 border-p-80 my-1 mr-auto'>
        {children}
    </div>
);
