"use client";
import { Conversation } from "@/shared/entities/conversation";
import React from 'react';

interface ChatViewProps {
    conversation: Conversation;
}

export function MessageView({ conversation }: ChatViewProps) {
    return (
        <ChatBox>
            <ChatContainer>
                <ChatHistory conversation={conversation} />
            </ChatContainer>
        </ChatBox>
    );
}

export const ChatContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex flex-col flex-1 min-h-[70vh] max-h-[80vh] w-full bg-p-10">{children}</div>
);

export const ChatHistory: React.FC<{ conversation: Conversation }> = ({ conversation }) => (
    <div
        className={`
      flex-1 overflow-y-auto mb-4 flex flex-col gap-3 px-4 py-6 min-h-[50vh] max-h-[70vh]
    `}
    >
        {conversation.messages.map((msg) =>
            msg.role === 'USER'
                ? <UserMessage key={msg.id}>{msg.content}</UserMessage>
                : <BotMessage key={msg.id}>{msg.content}</BotMessage>
        )}
    </div>
);

export const UserMessage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="
    self-end
    bg-s-50
    text-p-90
    px-5 py-3
    rounded-[18px_18px_6px_18px]
    max-w-[70%]
    break-words
    text-base
    shadow-[0_2px_8px_var(--color-s-50)/12]
    border-[1.5px]
    border-s-40
    my-1
    ml-auto
  ">
        {children}
    </div>
);

export const BotMessage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="
    self-start
    bg-p-90
    text-p-20
    px-5 py-3
    rounded-[18px_18px_18px_6px]
    max-w-[70%]
    break-words
    text-base
    shadow-[0_2px_8px_var(--color-p-30)/12]
    border-[1.5px]
    border-p-80
    my-1
    mr-auto
  ">
        {children}
    </div>
);

export const ChatBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="
    bg-p-90
    rounded-[18px]
    shadow-[0_8px_32px_rgba(0,0,0,0.10)]
    border-[1.5px]
    border-p-80
    px-8 py-10
    max-w-[700px]
    w-full
    mx-auto
    my-8
    flex flex-col items-stretch
  ">
        {children}
    </div>
);
