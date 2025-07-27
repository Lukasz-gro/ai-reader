import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectPane } from '@/shared/interface/web/react/project/ui-components/ProjectPane';
import { Chat } from '@/contexts/course-mode/interface/web/react/chat/Chat';
import { Conversation } from '@/shared/entities/conversation';
import { ChatInput } from '@/contexts/course-mode/interface/web/react/chat/ChatInput';

export const ChatPage: React.FC = () => {
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [isGenerating, setGenerating] = useState(false);

    return (
        <div className='flex flex-1'>
            <ProjectPane />
            <div className={`flex flex-1 flex-col transition-all ${conversation || 'justify-center items-center'} `} >
                <motion.div
                    className={`flex flex-col ${conversation && 'flex-1'} min-h-0`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.35 }}
                >
                    {conversation && (
                        <Chat
                            conversation={conversation}
                            isGenerating={isGenerating}
                            setConversation={setConversation}
                            onDoneGenerating={() => setGenerating(false)}
                        />
                    )}
                </motion.div>

                <motion.div
                    className={'flex w-full'}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.35 }}
                >
                    <ChatInput
                        conversation={conversation}
                        setConversation={setConversation}
                        generating={isGenerating}
                        setGenerating={setGenerating}
                    />
                </motion.div>
            </div>
        </div>
    );
};
