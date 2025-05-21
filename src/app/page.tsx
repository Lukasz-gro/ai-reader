'use client';

import { Course } from '@/contexts/course-mode/entities/course';
import { useState } from 'react';
import { Conversation } from '@/shared/entities/conversation';
import { Chat } from '@/contexts/course-mode/interface/web/react/chat/client/Chat';
import { createNewCourseConversation } from '@/contexts/course-mode/interface/web/react/chat/server/chat-actions';
import { PrimaryButton } from '@/contexts/course-mode/interface/web/react/components/primary-button';

const mockCourse: Course = {
    id: '1',
    name: 'Mock Course',
    roadmap: {
        id: '1',
        title: 'Mock Course Roadmap',
        checkpoints: []
    },
    conversations: [],
    project: {
        id: '1',
        title: 'Mock Project',
        materials: []
    }
};

export default function Home() {
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateConversation = async () => {
        setIsLoading(true);
        try {
            const newConversation = await createNewCourseConversation(mockCourse);
            setConversation(newConversation);
        } catch (error) {
            console.error('Failed to create conversation:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={'flex min-h-[80vh] justify-center items-center'}>
            {conversation ? (
                <Chat conversation={conversation} />
            ) : (
                <section>
                    <PrimaryButton 
                        onClick={handleCreateConversation}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating...' : 'Create new course'}
                    </PrimaryButton>
                </section>
            )}
        </div>
    );
}
