import { useProjectController } from "./useProjectController";
import { useProjectDispatch } from "./useProjectDispatch";

export function useProjectActions() {
    const { projectController } = useProjectController();
    const projectDispatch = useProjectDispatch();

    const setSelectedProject = (projectId: string) => {
        projectDispatch({ type: 'SELECT', payload: projectId });
    }

    const createProject = async (projectTitle: string) => {
        const project = await projectController.createProject(projectTitle);
        projectDispatch({ type: 'CREATE', payload: project });
    }

    return { setSelectedProject, createProject };
}
