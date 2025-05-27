import React, { Suspense, use, useState } from 'react';
import { Project } from '@/shared/entities/project';
import { Material } from '@/shared/entities/material';
import { Chat } from '@/contexts/course-mode/interface/web/react/chat/client/Chat';
import { createNewProjectConversation } from '@/contexts/course-mode/interface/web/react/chat/server/chat-actions';
import { Conversation, Mode } from '@/shared/entities/conversation';

export interface HomeViewProps {
    projects: Project[];
    onProjectSelect?: (project: Project) => void;
}

const ProjectsPicker: React.FC<{projects: Project[]}> = ({projects}) => {
    return (
        <div className={'flex flex-col gap-2'}>
            {projects.map((project: Project) => (
                <div key={project.id}>
                    {project.title}
                </div>
            ))}
        </div>
    );
};

export const HomeView: React.FC<HomeViewProps> = ({ projects, onProjectSelect}) => {
    const [activeTab, setActiveTab] = useState<Mode>('course');
    const [activeProject, setActiveProject] = useState<Project | null>(projects.at(0) ?? null);
    const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);

    return (
        <div className='flex w-full h-screen bg-p-90 text-p-10'>
            <aside className='w-56 shrink-0 border-r border-p-80 p-4 flex flex-col gap-4 overflow-y-auto'>
                <h2 className='text-lg leading-tight'>
                    Projects
                </h2>
                <div className='flex flex-col gap-2'>
                    {projects.map((project) => (
                        <button
                            key={project.id}
                            onClick={() => onProjectSelect?.(project)}
                            className='w-full text-left px-3 py-2 rounded-lg transition-colors duration-150'
                        >
                            {project.title}
                        </button>
                    ))}
                </div>
            </aside>

            <main className='flex-1 flex flex-col'>
                <nav className='flex border-b border-p-80'>
                    {(['course', 'explain', 'quiz'] as Mode[]).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setActiveTab(mode)}
                            className={`px-6 py-3 uppercase tracking-wider transition-colors duration-150 focus:outline-none hover:bg-p-80 ${
                                activeTab === mode
                                    ? 'border-b-4 border-a-50'
                                    : ''
                            }`}
                        >
                            {mode} mode
                        </button>
                    ))}
                </nav>

                <section className='flex-1 overflow-y-auto p-6'>
                    <Suspense fallback={<div className='text-center text-p-60'>Loading conversation…</div>}>
                        { activeProject && activeConversation ? (
                            <Chat conversation={activeConversation} />
                        ) : (
                            <div className='flex justify-center'>
                                <button
                                    onClick={() => { createNewProjectConversation(activeProject, activeTab).then(res => setActiveConversation(res)) }}
                                    className='px-6 py-3 bg-a-50 text-p-10 rounded-lg hover:bg-a-60 transition-colors'
                                >
                                    Start Conversation
                                </button>
                            </div>
                        )}
                    </Suspense>
                </section>
            </main>

            <aside className='w-64 shrink-0 border-l border-p-80 bg-sd-90 p-4 flex flex-col'>
                <h2 className='text-lg leading-tight text-sd-10'>
                    Materials
                </h2>

                <div className='flex-1 mt-2 overflow-y-auto flex flex-col gap-2'>
                    {activeProject?.materials.map((res) => (
                        <div
                            key={res.id}
                            className='px-3 py-2 rounded-lg bg-sd-30 text-sd-10'
                        >
                            {res.title}
                        </div>
                    ))}
                </div>

                <div className='mt-4 border-2 border-dashed border-sd-50 rounded-lg p-4 flex items-center justify-center text-center text-sd-10 cursor-pointer select-none hover:bg-sd-30/15 transition-colors duration-150'>
                    Drop new material
                </div>
            </aside>
        </div>
    );
};
