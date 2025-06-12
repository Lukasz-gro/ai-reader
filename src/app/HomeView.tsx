'use client';

import { Chat } from '@/contexts/course-mode/interface/web/react/chat/client/Chat';
import { createNewProjectConversation } from '@/contexts/course-mode/interface/web/react/chat/server/chat-actions';
import { NoProjectPlaceholder } from '@/contexts/course-mode/interface/web/react/project/NoProjectPlaceholder';
import { QuizSection } from '@/contexts/quiz-mode/interface/web/react/client/general-view/QuizSection';
import { Conversation, Mode } from '@/shared/entities/conversation';
import { Material } from '@/shared/entities/material';
import { Project } from '@/shared/entities/project';
import { User } from '@/shared/entities/user';
import {
    uploadMaterialAction,
    getMaterialsByIds,
    getValidUploadExtensions
} from '@/shared/interface/web/react/home/server/upload-actions';
import { Tooltip } from '@/shared/interface/web/react/Tooltip';
import { logoutAction } from '@/shared/interface/web/react/auth/server/auth-actions';
import { BoltIcon, FileIcon, MessageCircleIcon, PlusIcon, UserIcon, LogInIcon, UserPlusIcon, LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';

export interface HomeViewProps {
    projects: Project[];
    currentUser?: User | null;
}

export const HomeView: React.FC<HomeViewProps> = ({ projects, currentUser }) => {
    const [activeTab, setActiveTab] = useState<Mode>('course');
    const [activeProject, setActiveProject] = useState<Project>(projects[0]);
    
    const onMaterialUpdate = (materialIds: string[]) => {
        setActiveProject((prev) => {
            return {
                ...prev,
                materialIds
            };
        });
    };

    return (
        <div className='flex w-full h-screen bg-p-90 text-p-10'>
            <aside className='w-64 border-r border-p-80'>
                <LeftSideSection projects={projects} onProjectSelect={setActiveProject} />
            </aside>
            <main className='flex-1 flex flex-col'>
                <TopMenu activeTab={activeTab} onSelectActiveTab={setActiveTab} currentUser={currentUser} />
                <section className='flex-1 overflow-y-auto p-6'>
                    <CenterSection
                        activeTab={activeTab}
                        activeProject={activeProject}
                    />
                </section>
            </main>
            <aside className='w-64 border-l border-p-80 bg-sd-90/30 flex flex-col h-full'>
                <RightSideSection projectMaterialIds={activeProject.materialIds} onMaterialUpdate={onMaterialUpdate}/>
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
                    <Tooltip tooltip={'New project'}>
                        <div>
                            <PlusIcon className={'m-4 w-8 h-8 stroke-p-50 hover:stroke-p-10 transition-colors duration-200 cursor-pointer'}/>
                        </div>
                    </Tooltip>
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
                            <span className={'text-sd-30 relative top-[1px]'}>{project.materialIds.length}</span>
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

const TopMenu: React.FC<{activeTab: Mode, onSelectActiveTab: (m: Mode) => void, currentUser?: User | null}> = ({ activeTab, onSelectActiveTab, currentUser }) => {
    return (
        <div className={'flex justify-between items-center border-b border-p-80'}>
            <ConversationModeSelector activeTab={activeTab} onSelectActiveTab={(newMode) => onSelectActiveTab(newMode)} />
            <div className={'flex gap-4 mr-8'}>
                {currentUser ? (
                    <AuthenticatedUserMenu user={currentUser} />
                ) : (
                    <UnauthenticatedUserMenu />
                )}
                <Tooltip tooltip={'Settings'}>
                    <button>
                        <BoltIcon className={'w-6 h-6 stroke-p-50 hover:stroke-p-10 transition-all duration-200 cursor-pointer hover:rotate-45'} />
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

const ConversationModeSelector: React.FC<{activeTab: Mode, onSelectActiveTab: (m: Mode) => void}> = ({ activeTab, onSelectActiveTab }) => {
    return (
        <nav className='flex'>
            {(['course', 'explain', 'quiz'] as Mode[]).map((mode) => (
                <button
                    key={mode}
                    onClick={() => onSelectActiveTab(mode)}
                    className={`transition-colors duration-200 focus:outline-none hover:bg-p-80 cursor-pointer border-y-4 border-t-transparent
                    ${ activeTab === mode ? 'border-b-a-50' : 'border-transparent' }`}
                >
                    <h3 className={'p-[12px] px-8 tracking-wider text-nowrap uppercase'}>{mode} mode</h3>
                </button>
            ))}
        </nav>
    );
};

const AuthenticatedUserMenu: React.FC<{ user: User }> = ({ user }) => {
    return (
        <div className={'flex gap-4 items-center'}>
            <Tooltip tooltip={`Logged in as ${user.username}`}>
                <Link href='/dashboard' className={'flex items-center gap-2 px-3 py-1 rounded hover:bg-p-80 transition-colors duration-200'}>
                    <UserIcon className={'w-4 h-4 stroke-p-50'} />
                    <span className={'text-p-50 text-sm'}>{user.username}</span>
                </Link>
            </Tooltip>
            <Tooltip tooltip={'Logout'}>
                <form action={logoutAction} className={'inline'}>
                    <button type='submit'>
                        <LogOutIcon className={'w-6 h-6 stroke-p-50 hover:stroke-p-10 transition-colors duration-200 cursor-pointer'} />
                    </button>
                </form>
            </Tooltip>
        </div>
    );
};

const UnauthenticatedUserMenu: React.FC = () => {
    return (
        <div className={'flex gap-4'}>
            <Tooltip tooltip={'Sign In'}>
                <Link href='/login'>
                    <LogInIcon className={'w-6 h-6 stroke-p-50 hover:stroke-p-10 transition-colors duration-200 cursor-pointer'} />
                </Link>
            </Tooltip>
            <Tooltip tooltip={'Register'}>
                <Link href='/register'>
                    <UserPlusIcon className={'w-6 h-6 stroke-p-50 hover:stroke-p-10 transition-colors duration-200 cursor-pointer'} />
                </Link>
            </Tooltip>
        </div>
    );
};

const CenterSection: React.FC<{
    activeProject: Project | null,
    activeTab: Mode
}> = ({ activeProject, activeTab }) => {
    if (!activeProject) {
        return <NoProjectPlaceholder />;
    }

    if (activeTab === 'quiz') {
        return <QuizSection activeProject={activeProject}></QuizSection>;
    }
    return <ConversationSection activeProject={activeProject} activeTab={activeTab}/>;
};

const ConversationSection: React.FC<{
    activeProject: Project,
    activeTab: Mode
}> = ({ activeProject, activeTab }) => {
    const [activeConversation, setActiveConversation] = useState<Conversation|null>(null);

    return (
        <div className={'flex flex-col h-full'}>
            {!activeConversation ? (
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

export const RightSideSection: React.FC<{ 
    projectMaterialIds: string[];
    onMaterialUpdate: (materialIds: string[]) => void;
}> = ({ projectMaterialIds, onMaterialUpdate }) => {
    const [validFileExtensions, setValidFileExtensions] = useState<string[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const existingMaterialIdsRef = useRef<Set<string>>(new Set());

    async function handleUpload(formData: FormData) {
        const material = await uploadMaterialAction(formData);
        setMaterials(prev => [...prev, material]);
        existingMaterialIdsRef.current.add(material.id);
        onMaterialUpdate([...projectMaterialIds, material.id]);
    }

    console.log(validFileExtensions);
    useEffect(() => {
        getValidUploadExtensions().then(res => setValidFileExtensions(res));
    }, []);

    useEffect(() => {
        async function fetchMaterials() {
            if (projectMaterialIds.length === 0) {
                setMaterials([]);
                existingMaterialIdsRef.current.clear();
                return;
            }
            
            try {
                const newMaterialIds = projectMaterialIds.filter(id => !existingMaterialIdsRef.current.has(id));
                
                if (newMaterialIds.length > 0) {
                    const fetchedMaterials = await getMaterialsByIds(newMaterialIds);
                    setMaterials(prev => [...prev, ...fetchedMaterials]);
                    fetchedMaterials.forEach(material => existingMaterialIdsRef.current.add(material.id));
                }
            } catch (error) {
                console.error('Failed to fetch materials:', error);
            }
        }

        void fetchMaterials();
    }, [projectMaterialIds]);

    return (
        <div className='flex flex-col h-full'>
            <div className='border-b border-sd-80'>
                <h3 className='p-4'>Materials</h3>
            </div>
            <div className='flex flex-col h-full min-h-0'>
                <MaterialsDisplay materials={materials} />
                <div className='shrink-0 px-4 pb-4'>
                    <MaterialUploadForm
                        acceptedTypes={validFileExtensions}
                        handleUpload={handleUpload}
                    />
                </div>
            </div>
        </div>
    );
};

const MaterialsDisplay: React.FC<{ materials: Material[] }> = ({ materials }) => {
    const classDefault = 'bg-gradient-to-b from-p-70 via-p-70 to-sd-90 border-p-50/30';
    const classHover = 'hover:-translate-y-2 hover:from-p-60 hover:via-p-60 hover:border-t-p-50';

    return (
        <div className='flex-1 overflow-y-auto flex flex-col p-4 gap-2 custom-scrollbar'>
            {materials.map(m => (
                <div key={m.id} className={`${classDefault} ${classHover} with-noise shrink-0 fade-bg-to-bottom squeeze-bottom border-x-2 border-t-2 transition-all duration-150 px-4 pt-4 pb-8 mb-[-32px] rounded-t-lg overflow-x-hidden text-ellipsis`}>
                    <div className='content-perspective'>
                        <p className={'text-sm font-mono'} title={m.title}>{m.title}</p>
                        {typeof m.content.metadata?.pages === 'number' &&
                            <p className={'text-sm font-mono'}>{m.content.metadata.pages} pages</p>}
                        {typeof m.content.metadata?.lines === 'number' &&
                            <p className={'text-sm font-mono'}>{m.content.metadata.lines} lines</p>}
                    </div>
                </div>
            ))}
        </div>
    );
};

const MaterialUploadForm: React.FC<{acceptedTypes: string[], handleUpload: (formData: FormData) => Promise<void>}> = ({ acceptedTypes, handleUpload }) => {
    const [pending, setPending] = useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setPending(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        await handleUpload(formData);
        setPending(false);
    }

    return (
        <form
            onSubmit={onSubmit}
            className='mt-4'
        >
            <label
                htmlFor='file-upload'
                className='group border-2 border-dashed border-sd-50 rounded-lg p-6 flex items-center justify-center text-center text-sd-10 cursor-pointer select-none hover:bg-sd-70/10 transition-colors duration-150'
                style={{ minHeight: 80 }}
            >
                {pending ?
                    <em className='text-sd-40'>Uploading...</em> :
                    <p className={'text-sd-40 group-hover:text-sd-10'}>Drop new material</p>
                }
                <input
                    id='file-upload'
                    name='file'
                    type='file'
                    className='hidden'
                    accept={acceptedTypes.join(',')}
                    required
                    disabled={pending}
                    onChange={e => { e.currentTarget.form?.requestSubmit(); }}
                />
            </label>
        </form>
    );
};
