import React, { useState } from 'react';
import { Project } from '@/shared/entities/project';
import { Chat } from '@/contexts/course-mode/interface/web/react/chat/client/Chat';
import { createNewProjectConversation } from '@/contexts/course-mode/interface/web/react/chat/server/chat-actions';
import { Conversation, Mode } from '@/shared/entities/conversation';
import { FileIcon, MessageCircleIcon } from 'lucide-react';

export interface HomeViewProps {
    projects: Project[];
}

export const HomeView: React.FC<HomeViewProps> = ({ projects }) => {
    const [activeTab, setActiveTab] = useState<Mode>('course');
    const [activeProject, setActiveProject] = useState<Project | null>(projects.at(0) ?? null);
    const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);

    return (
        <div className='flex w-full h-screen bg-p-90 text-p-10'>
            <aside className='w-56 border-r border-p-80'>
                <LeftSideSection projects={projects} onProjectSelect={setActiveProject} />
            </aside>
            <main className='flex-1 flex flex-col'>
                <ConversationModeSelector activeTab={activeTab} onSelectActiveTab={(newMode) => setActiveTab(newMode)} />
                <section className='flex-1 overflow-y-auto p-6'>
                    <CenterSection activeTab={activeTab} activeProject={activeProject} activeConversation={activeConversation} setActiveConversation={setActiveConversation} />
                </section>
            </main>
            <aside className='w-64 border-l border-p-80 bg-sd-90/30 flex flex-col h-full'>
                <RightSideSection activeProject={activeProject} />
            </aside>
        </div>
    );
};

const LeftSideSection: React.FC<{projects: Project[], onProjectSelect: (p: Project) => void}> = ({ projects, onProjectSelect }) => {
    return (
        <div>
            <div className={'border-b border-p-80'}>
                <h3 className={'p-4'}>
                    Projects
                </h3>
            </div>
            <div className='mt-4 flex flex-col gap-2 overflow-y-auto'>
                <ProjectsPicker projects={projects} onProjectSelect={onProjectSelect} />
            </div>
        </div>
    );
};

const ProjectsPicker: React.FC<{projects: Project[], onProjectSelect: (project: Project) => void}> = ({ projects, onProjectSelect }) => {
    const [activeProjectId, setActiveProjectId] = useState<string | null>();

    void activeProjectId;
    void setActiveProjectId;

    const gradient = 'bg-gradient-to-br from-p-80 via-sd-90 to-sd-80';
    const border = 'border border-2 border-sd-50/30';
    return (
        <div className={'flex flex-col gap-2 px-4'}>
            {projects.map((project: Project) => (
                <button
                    className={`${gradient} ${border} w-full text-left px-3 py-2 rounded-lg transition-colors duration-150 hover:bg-sd-70 cursor-pointer`}
                    key={project.id}
                    onClick={() => onProjectSelect(project)}
                >
                    <p className={'font-semibold'}>{project.title}</p>
                    <div className={'flex flex-row gap-4'}>
                        <div className={'flex gap-1 items-center'}>
                            <FileIcon className={'w-[1rem] h-[1rem] stroke-sd-30'}/>
                            <span className={'text-sd-30 relative top-[1px]'}>{project.materials.length}</span>
                        </div>
                        <div className={'flex gap-1 items-center'}>
                            <MessageCircleIcon className={'w-[1rem] h-[1rem] stroke-sd-30'}/>
                            <span className={'text-sd-30 relative top-[1px]'}>{project.conversations.length}</span>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
};

const ConversationModeSelector: React.FC<{activeTab: Mode, onSelectActiveTab: (m: Mode) => void}> = ({ activeTab, onSelectActiveTab }) => {
    return (
        <nav className='flex border-b border-p-80'>
            {(['course', 'explain', 'quiz'] as Mode[]).map((mode) => (
                <button
                    key={mode}
                    onClick={() => onSelectActiveTab(mode)}
                    className={`transition-colors duration-150 focus:outline-none hover:bg-p-80 ${
                        activeTab === mode
                            ? 'border-b-4 border-a-50'
                            : ''
                    }`}
                >
                    <h3 className={'p-[14px] tracking-wider uppercase'}>{mode} mode</h3>
                </button>
            ))}
        </nav>
    );
};

const CenterSection: React.FC<{
    activeProject: Project | null,
    activeConversation: Conversation | null,
    activeTab: Mode,
    setActiveConversation: (newActiveConversation: Conversation) => void,
}> = ({ activeProject, activeConversation, activeTab, setActiveConversation }) => {
    return (
        <div className={'flex flex-col h-full'}>
            {activeProject && activeConversation ? (
                <Chat conversation={activeConversation} />
            ) : activeProject ? (
                <div className='flex justify-center'>
                    <button
                        onClick={() => {
                            createNewProjectConversation(activeProject, activeTab)
                                .then(res => setActiveConversation(res));
                        }}
                        className='px-6 py-3 bg-a-50 hover:bg-a-50/80 text-p-10 rounded-lg transition-colors cursor-pointer'
                    >
                        Start Conversation
                    </button>
                </div>
            ) : (
                <div>
                    No project selected.
                </div>
            )}
        </div>
    );
};

const RightSideSection: React.FC<{activeProject: Project | null}> = ({ activeProject }) => {
    return (
        <div className={'flex flex-col h-full'}>
            <div className={'border-b border-sd-80'}>
                <h3 className={'p-4'}>
                    Materials
                </h3>
            </div>
            <div className={'p-4 flex flex-col h-full'}>
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
                    Drop new materials
                </div>
            </div>
        </div>
    );
};
