import React, { useEffect } from 'react';
import { HomeView } from '@/app/HomeView';
import { useProjectStore } from '../hooks/useProjectStore';
import { projectService } from '@/shared/application/services/ProjectService';

export const Home: React.FC = () => {
    const { projects, selectedProject, isLoading, error, setSelectedProject } = useProjectStore();

    useEffect(() => {
        projectService.loadProjects();
    }, []);

    const handleProjectSelect = (projectId: string) => {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            projectService.selectProject(project);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading projects...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-4 p-4 bg-gray-100 rounded">
                <h2 className="text-lg font-semibold mb-2">Project Selection</h2>
                <div className="flex gap-2">
                    {projects.map(project => (
                        <button
                            key={project.id}
                            onClick={() => handleProjectSelect(project.id)}
                            className={`px-4 py-2 rounded ${
                                selectedProject?.id === project.id
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white border border-gray-300'
                            }`}
                        >
                            {project.title}
                        </button>
                    ))}
                </div>
                {selectedProject && (
                    <div className="mt-2 text-sm text-gray-600">
                        Selected: {selectedProject.title}
                    </div>
                )}
            </div>
            <HomeView projects={projects} />
        </div>
    );
};
