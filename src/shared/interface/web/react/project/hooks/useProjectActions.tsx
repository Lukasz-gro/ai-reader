import { useProjectController } from './useProjectController';
import { useProjectDispatch } from './useProjectDispatch';
import { QuizCreationParams } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';

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

    const createQuizForProject = async (projectId: string, params: QuizCreationParams) => {
        const newQuizPreview = await projectController.createQuizForProject(projectId, params);
        projectDispatch({ type: 'QUIZ_ADDED', payload: { projectId, quiz: newQuizPreview } });
    };

    return { setSelectedProject, createProject, createQuizForProject };
}
