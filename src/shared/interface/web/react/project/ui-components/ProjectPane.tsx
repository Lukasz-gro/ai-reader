import { useProjects } from '../hooks/useProjects';
import { useProjectActions } from '../hooks/useProjectActions';
import { Project } from '@/shared/entities/project';
import { Tooltip } from '@/shared/interface/web/react/Tooltip';
import { FileIcon, MessageCircleIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React, { useState } from 'react';

export const ProjectPane: React.FC = () => {
    const projectState = useProjects();
    const { setSelectedProject, createProject } = useProjectActions();
    const [isCollapsed, setIsCollapsed] = useState(false);

    // TODO get current user from auth
    const userId = 'test-user-id';

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleNewProject = async () => {
        const projectName = prompt('Enter project name:');
        if (projectName) {
            await createProject(projectName, userId);
        }
    };

    if (projectState.status === 'loading') {
        return (
            <aside className='w-64 border-r border-p-80 flex items-center justify-center'>
                <div className='text-p-50'>Loading projects...</div>
            </aside>
        );
    }

    if (projectState.status === 'error') {
        return (
            <aside className='w-64 border-r border-p-80 flex items-center justify-center'>
                <div className='text-red-500'>Error: {projectState.error}</div>
            </aside>
        );
    }

    if (isCollapsed) {
        return (
            <aside className='w-12 border-r border-p-80 flex flex-col'>
                <div className='flex justify-center border-b border-p-80'>
                    <Tooltip tooltip='Show projects'>
                        <button 
                            onClick={toggleCollapse}
                            className='p-4 hover:bg-p-80 transition-colors duration-200'
                        >
                            <ChevronRightIcon className='w-4 h-4 stroke-p-50 hover:stroke-p-10' />
                        </button>
                    </Tooltip>
                </div>
            </aside>
        );
    }

    return (
        <aside className='w-64 border-r border-p-80'>
            <div className='border-b border-p-80'>
                <div className='flex justify-between items-center'>
                    <h3 className='p-4'>Projects</h3>
                    <div className='flex items-center'>
                        <Tooltip tooltip='New project'>
                            <button onClick={handleNewProject}>
                                <PlusIcon className='m-2 w-6 h-6 stroke-p-50 hover:stroke-p-10 transition-colors duration-200 cursor-pointer'/>
                            </button>
                        </Tooltip>
                        <Tooltip tooltip='Hide projects'>
                            <button 
                                onClick={toggleCollapse}
                                className='m-2 p-1 hover:bg-p-80 rounded transition-colors duration-200'
                            >
                                <ChevronLeftIcon className='w-4 h-4 stroke-p-50 hover:stroke-p-10' />
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className='mt-4 flex flex-col gap-2 overflow-y-auto'>
                <ProjectPicker 
                    projects={projectState.projects} 
                    currentProjectId={projectState.currentId}
                    onProjectSelect={setSelectedProject} 
                />
            </div>
        </aside>
    );
};

const ProjectPicker: React.FC<{
    projects: Project[];
    currentProjectId: string | null;
    onProjectSelect: (projectId: string) => void;
}> = ({ projects, currentProjectId, onProjectSelect }) => {

    const onProjectClick = (project: Project) => {
        onProjectSelect(project.id);
    };
    
    const isActive = (project: Project) => {
        return project.id === currentProjectId;
    };

    const gradientDefault = 'bg-gradient-to-br from-p-80 via-sd-90 to-sd-80';
    const borderDefault = 'border border-2 border-sd-50/30';
    const gradientActive = 'bg-gradient-to-br from-sd-90 to-sd-80';
    const borderActive = 'border border-2 border-sd-50';
    const inactive = `${gradientDefault} ${borderDefault}`;
    const active = `${gradientActive} ${borderActive}`;
    const hover = 'hover:from-sd-90 hover:to-sd-80';

    return (
        <div className='flex flex-col gap-2 px-4'>
            {projects.map((project: Project) => (
                <button
                    className={`${isActive(project) ? active : inactive} ${hover} w-full text-left px-6 pb-5 pt-3 rounded-lg transition-colors duration-200 cursor-pointer`}
                    key={project.id}
                    onClick={() => onProjectClick(project)}
                >
                    <p className='font-semibold'>{project.title}</p>
                    <div className='flex flex-row gap-4'>
                        <div className='flex gap-1 items-center'>
                            <FileIcon className='w-[1rem] h-[1rem] stroke-sd-30'/>
                            <span className='text-sd-30 relative top-[1px]'>{project.materials.length}</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <MessageCircleIcon className='w-[1rem] h-[1rem] stroke-sd-30'/>
                            <span className='text-sd-30 relative top-[1px]'>{project.conversations.length}</span>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
};
