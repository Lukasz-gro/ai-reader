import React, { useState } from 'react';
import { Project } from '@/shared/entities/project';
import { Chat } from '@/contexts/course-mode/interface/web/react/chat/client/Chat';
import { createNewProjectConversation } from '@/contexts/course-mode/interface/web/react/chat/server/chat-actions';
import { Conversation, Mode } from '@/shared/entities/conversation';
import { FileIcon, MessageCircleIcon, PlusIcon } from 'lucide-react';

export interface HomeViewProps {
    projects: Project[];
}

export const HomeView: React.FC<HomeViewProps> = ({ projects }) => {
    const [activeTab, setActiveTab] = useState<Mode>('course');
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);

    return (
        <div className='flex w-full h-screen bg-p-90 text-p-10'>
            <aside className='w-64 border-r border-p-80'>
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

const LeftSideSection: React.FC<{
    projects: Project[],
    onProjectSelect: (p: Project) => void
}> = ({ projects, onProjectSelect }) => {
    return (
        <div>
            <div className={'border-b border-p-80'}>
                <div className={'flex justify-between items-center'}>
                    <h3 className={'p-4'}>
                        Projects
                    </h3>
                    <div title={'New project'}>
                        <PlusIcon className={'m-4 w-8 h-8 stroke-p-50 hover:stroke-p-10 transition-colors duration-200 cursor-pointer'}/>
                    </div>
                </div>
            </div>
            <div className='mt-4 flex flex-col gap-2 overflow-y-auto'>
                <ProjectPicker projects={projects} onProjectSelect={onProjectSelect} />
            </div>
        </div>
    );
};

const ProjectPicker: React.FC<{
    projects: Project[],
    onProjectSelect: (project: Project) => void
}> = ({ projects, onProjectSelect }) => {
    const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

    const onProjectClick = (project: Project) => {
        setActiveProjectId(project.id);
        onProjectSelect(project);
    };
    const isActive = (project: Project) => {
        return project.id === activeProjectId;
    };

    const gradientDefault = 'bg-gradient-to-br from-p-80 via-sd-90 to-sd-80';
    const borderDefault = 'border border-2 border-sd-50/30';
    const gradientActive = 'bg-gradient-to-br from-sd-90 to-sd-80';
    const borderActive = 'border border-2 border-sd-50';
    const inactive = `${gradientDefault} ${borderDefault}`;
    const active = `${gradientActive} ${borderActive}`;
    const hover = 'hover:from-sd-90 hover:to-sd-80';

    return (
        <div className={'flex flex-col gap-2 px-4'}>
            {projects.map((project: Project) => (
                <button
                    className={`${isActive(project) ? active : inactive} ${hover} w-full text-left px-6 pb-5 pt-3 rounded-lg transition-colors duration-200 cursor-pointer`}
                    key={project.id}
                    onClick={() => onProjectClick(project)}
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
                    className={`transition-colors duration-200 focus:outline-none hover:bg-p-80 cursor-pointer border-y-4 border-t-transparent
                    ${ activeTab === mode ? 'border-b-a-50' : 'border-transparent' }`}
                >
                    <h3 className={'p-[12px] px-8 tracking-wider uppercase'}>{mode} mode</h3>
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
            {!activeProject ? (
                <NoProjectPlaceholder />
            ) :
                !activeConversation ? (
                    <StartConversationPlaceholder
                        activeProject={activeProject}
                        activeTab={activeTab}
                        setActiveConversation={setActiveConversation}
                    />
                ) : (
                    <Chat conversation={activeConversation} />
                )}
        </div>
    );
};

const NoProjectPlaceholder: React.FC = () => {
    return (
        <div className={'self-center mt-8'}>
            <h1 className={'text-p-70'}>
                No project selected.
            </h1>
            <p className={'text-p-70 text-center'}>
                Select existing project or add a new one.
            </p>
        </div>
    );
};

const StartConversationPlaceholder: React.FC<{
    activeProject: Project,
    activeTab: Mode,
    setActiveConversation: (c: Conversation) => void
}> = ({ activeProject, activeTab, setActiveConversation }) => {
    const [loading, setLoading] = useState(false);

    return (
        <div className='flex justify-center'>
            {loading ? (
                <div className='flex flex-col justify-center items-center w-full py-10'>
                    <div className='w-96 h-4 bg-sd-70 rounded animate-pulse mb-4' />
                    <div className='w-80 h-4 bg-sd-60 rounded animate-pulse mb-2' />
                    <div className='w-72 h-4 bg-sd-60 rounded animate-pulse mb-2' />
                    <div className='w-100 h-4 bg-sd-60 rounded animate-pulse mb-2' />
                    <span className={'mt-4'}>Please hold...</span>
                </div>
            ) : (
                <button
                    onClick={() => {
                        setLoading(true);
                        createNewProjectConversation(activeProject, activeTab)
                            .then(res => setActiveConversation(res));
                    }}
                    className='px-6 py-2 mt-4 bg-a-50 hover:bg-a-50/80 text-p-10 rounded-lg transition-colors cursor-pointer'
                >
                    <p className={'text-lg capitalize'}>
                        Start {activeTab} Conversation
                    </p>
                </button>
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
                <div className='border-2 border-dashed border-sd-50 rounded-lg p-6 flex items-center justify-center text-center text-sd-10 cursor-pointer select-none hover:bg-sd-30/15 transition-colors duration-150'>
                    Drop new materials
                </div>
            </div>
        </div>
    );
};
