'use client';
import { Message } from '@/shared/application/ports/out/llm-provider';
import { motion } from 'framer-motion';
import React from 'react';
import Markdown from 'react-markdown';

const messageVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 }
};

export const AnimatedChatMessage: React.FC<{ message: Message }> = ({ message }) => (
    <motion.div
        className={'flex w-full'}
        variants={messageVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        transition={{ duration: 0.2, type: 'easeInOut' }}
        layout='position'
    >
        <ChatMessage message={message} />
    </motion.div>
);

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
    const content: React.ReactNode = Array.isArray(message.content)
        ? message.content.map((chunk, i) => <AnimatedText key={i} content={chunk} />)
        : <Markdown>{message.content}</Markdown>;

    return message.role === 'USER'
        ? <UserMessage>{content}</UserMessage>
        : <AssistantMessage>{content}</AssistantMessage>;
};

const UserMessage: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    <div className={'max-w-[85%] ml-auto'}>
        <div className='bg-sd-70 text-p-10 px-5 py-3 rounded-[18px_18px_6px_18px] text-base shadow-xl shadow-black/30'>
            {children}
        </div>
    </div>;

const AssistantMessage: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    <div className={'max-w-[85%] mr-auto'}>
        <div className='bg-p-90 text-p-20 px-5 py-3 rounded-[18px_18px_18px_6px] text-base shadow-xl shadow-black/30 border-1 border-p-80 my-1'>
            {children}
        </div>
    </div>;

const AnimatedText: React.FC<{ content: string }> = ({ content }) => (
    <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'easeIn' }}
    >
        {content}
    </motion.span>
)
