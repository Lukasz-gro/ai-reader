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
    materialIds: [],
    conversations: [],
    quizes: []
};

export default async function Home() {
    const currentUser = await getCurrentUser();
    
    // TODO projects should be fetched for the logged user
    return (
        <HomeView projects={[mockProject]} currentUser={currentUser} />
    );
}
