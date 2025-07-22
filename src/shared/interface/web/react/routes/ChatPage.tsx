import React from 'react';
import { ProjectPane } from '@/shared/interface/web/react/project/ui-components/ProjectPane';
import { Chat } from '@/contexts/course-mode/interface/web/react/chat/Chat';
import { Conversation } from '@/shared/entities/conversation';
import { MockConversation } from '@/shared/infra/mocks/mock-conversation';

export const ChatPage: React.FC = () => {
    const conversation: Conversation = new MockConversation().build();

    return (
        <div className='flex w-full h-screen bg-p-90 text-p-10'>
            <ProjectPane />
            <main className='flex-1 flex flex-col'>
                <div className='flex-1 flex items-center justify-center'>
                    <div className='text-center'>
                        <Chat conversation={conversation}/>
                    </div>
                </div>
            </main>
        </div>
    );
};
