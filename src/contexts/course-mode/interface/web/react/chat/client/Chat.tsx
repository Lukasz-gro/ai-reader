'use client';

import React, { useState } from 'react';
import { Conversation } from '@/shared/entities/conversation';
import { MessageView } from './MessageView';
import { addUserMessageToChat } from '../server/chat-actions';
import { PrimaryButton } from '../../components/primary-button';
import { PendingAssistantMessage } from '@/contexts/course-mode/interface/web/react/chat/client/PendingAssistantMessage';

interface ChatProps {
    conversation: Conversation;
}

export function Chat({ conversation }: ChatProps) {
    const [message, setMessage] = useState('');
    const [currentConversation, setCurrentConversation] = useState<Conversation>(conversation);

    const [isGenerating, setIsGenerating] = useState(false);
    const [streamKey, setStreamKey] = useState(0);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!message.trim()) return;

        const updatedConversation = await addUserMessageToChat(currentConversation, message);
        setCurrentConversation(updatedConversation);
        setMessage('');
        setIsGenerating(true);
        setStreamKey(Date.now());
    };

    return (
        <ChatBox>
            <MessageView conversation={currentConversation} />
            {isGenerating && (
                <PendingAssistantMessage
                    key={streamKey}
                    conversation={currentConversation}
                    onConversationUpdate={setCurrentConversation}
                    onDone={() => {
                        setIsGenerating(false);
                    }}
                />
            )}
            <MessageForm onSubmitAction={handleSubmit}>
                <MessageInput
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Ask about anything...'
                    disabled={isGenerating}
                />
                <PrimaryButton type='submit' disabled={isGenerating}>
                    {isGenerating ? 'Generating...' : 'Send'}
                </PrimaryButton>
            </MessageForm>
        </ChatBox>
    );
}

const ChatBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className='bg-p-90 rounded-lg shadow-lg shadow-black/30 border-1 border-p-80 px-8 py-10 max-w-[700px] w-full my-8 flex flex-col'>
        {children}
    </div>
);

const MessageForm: React.FC<{ onSubmitAction: (e: React.FormEvent) => void; children: React.ReactNode }> = ({ onSubmitAction, children }) => (
    <form onSubmit={onSubmitAction} className='flex gap-4 p-4 border-t-1 border-p-70'>
        {children}
    </form>
);

const MessageInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input
        {...props}
        className={`
      flex-1 px-4 py-3 border border-p-70 rounded text-base bg-p-90 text-p-10 outline-none transition-all duration-200
      focus:border-sd-50 focus:shadow-md focus:shadow-sd-50/30
      ${props.className}`}
    />
);
