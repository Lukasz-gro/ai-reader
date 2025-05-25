'use client';

import React, { useState } from 'react';
import { Conversation } from '@/shared/entities/conversation';
import { MessageView } from './MessageView';
import { addAssistantMessageToChat, addUserMessageToChat, streamLLMResponse } from '../server/chat-actions';
import { PrimaryButton } from '../../components/primary-button';
import { Message } from '@/shared/application/ports/out/llm-provider';
import { v4 as uuidv4 } from 'uuid';

interface ChatProps {
    conversation: Conversation;
}

export function Chat({ conversation }: ChatProps) {
    const [message, setMessage] = useState('');
    const [currentConversation, setCurrentConversation] = useState<Conversation>(conversation);
    const [isGenerating, setIsGenerating] = useState(false);
    const [pendingResponse, setPendingResponse] = useState<string>('');
    const [pendingMessageId, setPendingMessageId] = useState<string>('');

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!message.trim()) return;

        let updatedConversation = await addUserMessageToChat(currentConversation, message);
        setCurrentConversation(updatedConversation);
        setMessage('');

        setIsGenerating(true);
        setPendingResponse('');
        const newMessageId = uuidv4();
        setPendingMessageId(newMessageId);
        let fullResponse = '';
        const stream = await streamLLMResponse(updatedConversation);
        for await (const partial of stream) {
            fullResponse = partial;
            setPendingResponse(fullResponse);
        }
        updatedConversation = await addAssistantMessageToChat(updatedConversation, fullResponse, newMessageId);
        setCurrentConversation(updatedConversation);

        setIsGenerating(false);
        setPendingResponse('');
        setPendingMessageId('');
    };

    const conversationWithPending =
        isGenerating && pendingResponse
            ? {
                ...currentConversation,
                messages: [
                    ...currentConversation.messages,
                    {
                        id: pendingMessageId,
                        role: 'ASSISTANT',
                        previousId: currentConversation.messages.at(-1)?.id ?? null,
                        content: pendingResponse,
                        pending: true,
                    } as Message,
                ],
            }
            : currentConversation;


    return (
        <ChatBox>
            <MessageView conversation={currentConversation} />
            {isGenerating && pendingResponse && (
                <PendingAssistantMessage id={pendingMessageId} content={pendingResponse} />
            )}
            <MessageForm onSubmitAction={handleSubmit}>
                <MessageInput
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about anything..."
                    disabled={isGenerating}
                />
                <PrimaryButton type="submit" disabled={isGenerating}>
                    {isGenerating ? 'Generating...' : 'Send'}
                </PrimaryButton>
            </MessageForm>
        </ChatBox>
    );
}

const ChatBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-p-90 rounded-lg shadow-lg shadow-black/30 border-1 border-p-80 px-8 py-10 max-w-[700px] w-full my-8 flex flex-col">
        {children}
    </div>
);

const MessageForm: React.FC<{ onSubmitAction: (e: React.FormEvent) => void; children: React.ReactNode }> = ({ onSubmitAction, children, }) => (
    <form onSubmit={onSubmitAction} className="flex gap-4 p-4 border-t-1 border-p-70">
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

const PendingAssistantMessage: React.FC<{ id: string; content: string }> = ({ id, content }) => (
    <div
        key={id}
        className="flex items-start gap-3 animate-pulse opacity-80"
    >
        <div className="w-6 h-6 rounded-full bg-sd-50 animate-spin mr-2" />
        <div className="flex-1 bg-p-80/80 rounded-lg px-4 py-2 text-p-20 border border-p-60 shadow-inner">
            {content}
        </div>
    </div>
);
