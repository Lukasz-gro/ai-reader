import React from 'react';
import { QuizSection } from '@/contexts/quiz-mode/interface/web/react/client/general-view/QuizSection';
import { useProjects } from '../project/hooks/useProjects';

export const Quiz: React.FC = () => {
    const projectsState = useProjects();

    if (projectsState.status === 'error' || projectsState.status === 'loading') {
        return <div>Error loading projects</div>;
    }

    const { currentId, projects } = projectsState;

    if (!currentId) {
        return (
            <div className='flex flex-col items-center justify-center h-screen bg-p-90 text-p-10'>
                <div className='text-center'>
                    <h1 className='text-2xl font-semibold mb-4'>Quiz Mode</h1>
                    <p className='text-p-50 mb-6'>
                        Please select a project from the sidebar to start a quiz.
                    </p>
                    <div className='bg-p-80 rounded-lg p-6 border border-p-70'>
                        <p className='text-sm text-p-40'>
                            Choose a project from the left panel to begin creating and taking quizzes.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='flex w-full h-screen bg-p-90 text-p-10'>
            <div className='flex-1 flex flex-col'>
                <header className='border-b border-p-80 p-4'>
                    <h1 className='text-2xl font-semibold'>Quiz Mode</h1>
                    <p className='text-sm text-p-50'>Project: {projects[0].title}</p>
                </header>
                <section className='flex-1 overflow-y-auto p-6'>
                    <QuizSection activeProject={projects[0]} />
                </section>
            </div>
        </div>
    );
}; 
