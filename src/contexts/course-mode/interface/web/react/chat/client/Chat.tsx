"use client";

import React, { useState } from "react";
import { Conversation } from "@/shared/entities/conversation";
import { ChatBox, MessageView } from './MessageView';
import { addUserMessageToChat } from "../server/chat-actions";
import { Button } from "../../components/button";

interface ChatProps {
    conversation: Conversation;
}

export function Chat({ conversation }: ChatProps) {
    const [message, setMessage] = useState("");
    const [currentConversation, setCurrentConversation] = useState<Conversation>(conversation);

    const handleSubmit = async () => {
        if (!message.trim()) return;
        const updatedConversation = await addUserMessageToChat(currentConversation, message);
        setCurrentConversation(updatedConversation);
        setMessage("");
    };

    return (
        <ChatBox>
            <MessageView conversation={currentConversation} />
            <MessageForm onSubmit={handleSubmit}>
                <MessageInput
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about anything..."
                />
                <Button onClick={handleSubmit}>Send</Button>
            </MessageForm>
        </ChatBox>
    );
}

export const MessageForm: React.FC<{ onSubmit: (e: React.FormEvent) => void, children: React.ReactNode }> = ({ onSubmit, children }) => (
    <form
        onSubmit={onSubmit}
        className={`
      flex gap-4 p-4
      bg-p-90 border-t border-p-80
      rounded-b-[18px]
    `}
    >
        {children}
    </form>
);

export const MessageInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input
        {...props}
        className={`
        flex-1
        px-4 py-3
        border border-p-80
        rounded
        text-base
        bg-p-90 text-p-10
        outline-none
        transition-all duration-200
        focus:border-s-50
        focus:shadow-[0_0_0_3px_rgba(66,153,225,0.10)]
        ${props.className}` }
    />
);
