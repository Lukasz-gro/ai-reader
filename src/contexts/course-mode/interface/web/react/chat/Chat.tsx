import React from 'react';
import { Conversation } from '@/shared/entities/conversation';
import { MessageView } from './MessageView';
import { PendingAssistantMessage } from '@/contexts/course-mode/interface/web/react/chat/PendingAssistantMessage';

interface ChatProps {
    conversation: Conversation;
    isGenerating: boolean;
    setConversation: (c: Conversation) => void;
    onDoneGenerating: () => void;
}

export function Chat({ conversation, isGenerating, setConversation, onDoneGenerating, }: ChatProps) {
    return (
        <section className='flex flex-1 h-full min-h-0 flex-col items-center'>
            <div className='flex-1 overflow-y-auto w-full custom-scrollbar'>
                <div className='flex flex-1 max-w-[1000px] mx-auto'>
                    <MessageView conversation={conversation} isGenerating={isGenerating} />
                    {isGenerating && (
                        <PendingAssistantMessage
                            conversation={conversation}
                            onConversationUpdate={setConversation}
                            onDone={onDoneGenerating}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
