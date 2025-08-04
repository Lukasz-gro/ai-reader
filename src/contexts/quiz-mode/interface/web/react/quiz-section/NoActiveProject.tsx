import { ProjectState } from "@/shared/interface/web/react/project/state/project-state";

interface NoActiveProjectProps {
    readonly project: ProjectState;
}

function NoActiveProject({ project }: NoActiveProjectProps) {
    if (project.status === 'loading') {
        return <div>Loading project...</div>;
    }
    
    if (project.status === 'error') {
        return <div>Error loading project: {project.error}</div>;
    }
    
    if (project.status === 'success' && !project.currentId) {
        return <div>Please select a project to view quiz</div>;
    }

    return null;
}

export default NoActiveProject;