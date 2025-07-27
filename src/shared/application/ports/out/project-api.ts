import { Project, ProjectPreview } from '@/shared/entities/project';
import { GenericResponse } from '@/shared/entities/generic-repsonse';
import { QuizCreationParams } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';
import { QuizPreview } from '@/shared/entities/quiz-preview';

export interface ProjectApi {
    getUserProjects(userId: string): Promise<ProjectPreview[]>;
    addProject(project: Project): Promise<GenericResponse>;
    createQuizForProject(projectId: string, params: QuizCreationParams): Promise<QuizPreview>;
}
