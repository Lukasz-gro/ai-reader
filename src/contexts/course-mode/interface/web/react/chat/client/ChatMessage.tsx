'use client';
import { Message } from '@/shared/application/ports/out/llm-provider';
import { motion } from 'framer-motion';
import React from 'react';

const messageVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 }
};

export const AnimatedChatMessage: React.FC<{ message: Message }> = ({ message }) => (
    <motion.div
        className={`flex w-full ${ message.role === 'USER' ? 'justify-end' : 'justify-start' }`}
        variants={messageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.2, type: 'easeInOut' }}
        layout="position"
    >
        <ChatMessage message={message} />
    </motion.div>
);

const ChatMessage: React.FC<{ message: Message }> = ({ message }) =>
    message.role === 'USER'
        ? <UserMessage>{message.content}</UserMessage>
        : <BotMessage>{message.content}</BotMessage>;


const UserMessage: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    <div className='bg-sd-70 text-p-10 px-5 py-3 rounded-[18px_18px_6px_18px] max-w-[70%] break-words text-base shadow-xl shadow-black/30 my-1 ml-auto'>
        {children}
    </div>

const BotMessage: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    <div className='bg-p-90 text-p-20 px-5 py-3 rounded-[18px_18px_18px_6px] max-w-[70%] break-words text-base shadow-xl shadow-black/30 border-1 border-p-80 my-1 mr-auto'>
        {children}
    </div>
