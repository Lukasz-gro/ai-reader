'use client';

import { HomeView } from '@/app/HomeView';
import { Project } from '@/shared/entities/project';

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

export default function Home() {
    return (
        <HomeView projects={[mockProject]}/>
    );
}
