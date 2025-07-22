import { CreateQuizForProject } from '@/shared/application/ports/in/create-quiz-for-project';
import { ProjectApi } from '@/shared/application/ports/out/project-api';
import { QuizPreview } from '@/shared/entities/quiz-preview';
import { QuizCreationParams } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';

export class CreateQuizForProjectUseCase implements CreateQuizForProject {
    constructor(private readonly projectApi: ProjectApi) {}

    async execute(projectId: string, params: QuizCreationParams): Promise<QuizPreview> {
        return this.projectApi.createQuizForProject(projectId, params);
    }
} 