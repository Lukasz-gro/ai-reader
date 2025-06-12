export const dynamic = 'force-dynamic';

import { HomeView } from '@/app/HomeView';
import { Project } from '@/shared/entities/project';
import { getCurrentUser } from '@/shared/interface/middleware/auth-middleware';

// If you use json db you can add some materialIds to fetch them on initial load
const mockProject: Project = {
    id: '1',
    title: 'Mock Project',
    roadmap: {
        id: '1',
        title: 'Mock Project Roadmap',
        checkpoints: []
    },
    materialIds: ['1dae40e9-a56b-4235-9ec2-18d54ebb2e60'],
    conversations: [],
    quizes: []
};

export default async function Home() {
    const currentUser = await getCurrentUser();
    
    return (
        <HomeView projects={[mockProject]} currentUser={currentUser} />
    );
}
