import React from 'react';
import { ProjectPane } from '@/shared/interface/web/react/project/ui-components/ProjectPane';
import { Chat } from '@/contexts/course-mode/interface/web/react/chat/Chat';
import { Conversation } from '@/shared/entities/conversation';
import { MockConversation } from '@/shared/infra/mocks/mock-conversation';

export const ChatPage: React.FC = () => {
    const conversation: Conversation = new MockConversation().withLength(20).build();
    console.log(conversation);

    return (
        <div className='flex flex-1'>
            <ProjectPane />
            <Chat conversation={conversation} />
        </div>
    );
};
