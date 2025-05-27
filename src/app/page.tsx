'use client';

import { HomeView } from '@/contexts/course-mode/interface/web/react/chat/client/HomeView';
import { Project } from '@/shared/entities/project';

const mockProject: Project = {
    id: '1',
    title: 'Mock Project',
    roadmap: {
        id: '1',
        title: 'Mock Project Roadmap',
        checkpoints: []
    },
    materials: [],
    conversations: [],
};

export default function Home() {
    return (
        <HomeView projects={[mockProject]}/>
        // <div className={'flex min-h-[80vh] justify-center items-center'}>
        //     {conversation ? (
        //         <Chat conversation={conversation} />
        //     ) : (
        //         <section>
        //             <PrimaryButton
        //                 onClick={handleCreateConversation}
        //                 disabled={isLoading}
        //             >
        //                 {isLoading ? 'Creating...' : 'Create new course'}
        //             </PrimaryButton>
        //         </section>
        //     )}
        // </div>
    );
}
