import { useProjects } from '../hooks/useProjects';
import { useProjectActions } from '../hooks/useProjectActions';
import { ProjectPreview } from '@/shared/entities/project';
import { Tooltip } from '@/shared/interface/web/react/Tooltip';
import { ChevronLeftIcon, ChevronRightIcon, MessageCircleIcon, PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '@/shared/interface/web/react/auth/hooks/useAuth';

export const ProjectPane: React.FC = () => {
    const projectState = useProjects();
    const { setSelectedProject, createProject } = useProjectActions();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const authState = useAuth();
    if (authState.status !== 'success' || authState.data.user === null) {
        return null;
    }
    const userId = authState.data.user.id;

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleNewProject = async () => {
        await createProject(userId);
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
                        <button onClick={toggleCollapse} className='group cursor-pointer'>
                            <ChevronRightIcon className='m-2 w-6 h-6 stroke-p-50 group-hover:stroke-p-10 transition-colors duration-200'/>
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
                            <button onClick={handleNewProject} className='group cursor-pointer'>
                                <PlusIcon className='mr-2 w-6 h-6 stroke-p-50 hover:stroke-p-10 cursor-pointer'/>
                            </button>
                        </Tooltip>
                        <Tooltip tooltip='Hide projects'>
                            <button onClick={toggleCollapse} className='group cursor-pointer'>
                                <ChevronLeftIcon className='mr-2 w-6 h-6 stroke-p-50 group-hover:stroke-p-10 transition-colors duration-200'/>
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
    projects: ProjectPreview[];
    currentProjectId: string | null;
    onProjectSelect: (projectId: string) => void;
}> = ({ projects, currentProjectId, onProjectSelect }) => {

    const onProjectClick = (project: ProjectPreview) => {
        onProjectSelect(project.id);
    };
    
    const isActive = (project: ProjectPreview) => {
        return project.id === currentProjectId;
    };

    const gradientDefault = 'bg-gradient-to-b from-sd-90/50 to-sd-90/50';
    const borderDefault = 'border border-2 border-sd-70';
    const gradientActive = 'bg-gradient-to-br from-sd-70 to-sd-80';
    const borderActive = 'border border-2 border-sd-50';
    const inactive = `${gradientDefault} ${borderDefault}`;
    const active = `${gradientActive} ${borderActive}`;
    const hover = 'hover:from-sd-90 hover:to-sd-80';

    return (
        <div className='flex flex-col gap-2 px-4'>
            {projects.map((project: ProjectPreview) => (
                <button
                    className={`${isActive(project) ? active : inactive} ${isActive(project) || hover} w-full text-left px-6 pb-5 pt-3 rounded-lg transition-colors duration-200 cursor-pointer`}
                    key={project.id}
                    onClick={() => onProjectClick(project)}
                >
                    <p className='font-semibold'>{project.title}</p>
                </button>
            ))}
        </div>
    );
};
