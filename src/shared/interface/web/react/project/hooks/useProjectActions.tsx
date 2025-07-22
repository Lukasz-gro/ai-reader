import { useProjectController } from './useProjectController';
import { useProjectDispatch } from './useProjectDispatch';

export function useProjectActions() {
    const { projectController } = useProjectController();
    const projectDispatch = useProjectDispatch();

    const setSelectedProject = (projectId: string) => {
        projectDispatch({ type: 'PROJECT_SELECTED', payload: projectId });
    };

    const createProject = async (userId: string) => {
        const project = await projectController.createProject(userId);
        projectDispatch({ type: 'PROJECT_CREATED', payload: project });
    };

    return { setSelectedProject, createProject };
}
