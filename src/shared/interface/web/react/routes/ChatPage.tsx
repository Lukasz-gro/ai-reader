import React, { useState, useCallback } from 'react';
import { ProjectPane } from '@/shared/interface/web/react/project/ui-components/ProjectPane';
import { Chat } from '@/contexts/course-mode/interface/web/react/chat/Chat';
import { Conversation } from '@/shared/entities/conversation';
import { handleStartNewConversation } from '@/contexts/course-mode/interface/controllers/course-mode-controller';
import { MessageInput, MessageForm } from '@/contexts/course-mode/interface/web/react/chat/ChatInput';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatPage: React.FC = () => {
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [firstPrompt, setFirstPrompt] = useState('');
    const [isStarting, setIsStarting] = useState(false);

    const handleInitialSubmit = useCallback(
        async (e?: React.FormEvent) => {
            if (e) e.preventDefault();
            if (!firstPrompt.trim() || isStarting) return;

            try {
                setIsStarting(true);
                const conv = await handleStartNewConversation(
                    'some-project',
                    'course',
                    firstPrompt.trim()
                );
                setConversation(conv);
            } finally {
                setIsStarting(false);
            }
        },
        [firstPrompt, isStarting]
    );

    return (
        <div className='flex flex-1'>
            <ProjectPane />

            {conversation && <Chat conversation={conversation} />}

            <AnimatePresence>
                {!conversation && (
                    <motion.div
                        key='initial-input'
                        className='flex flex-1 items-center justify-center'
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.35 }}
                    >
                        <MessageForm onSubmitAction={handleInitialSubmit}>
                            <MessageInput
                                value={firstPrompt}
                                onChange={(e) => setFirstPrompt(e.target.value)}
                                placeholder='Say hello to start chatting…'
                                disabled={isStarting}
                                className='min-w-[300px] md:min-w-[500px]'
                            />
                        </MessageForm>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
