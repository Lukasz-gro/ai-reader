import { ProjectPreview } from '@/shared/entities/project';
import { CreateNewProjectUseCase } from '@/shared/application/use-cases/create-new-project';
import { HttpProjectApi } from '@/shared/infra/projects/http-project-api';
import { CreateNewProject } from '@/shared/application/ports/in/create-new-project';
import { GetUserProjects } from '@/shared/application/ports/in/get-user-projects';
import { GetUserProjectsUseCase } from '@/shared/application/use-cases/get-user-projects';
import { httpClient } from '@/shared/infra/http/axios-http-client';
import { CreateQuizForProject } from '@/shared/application/ports/in/create-quiz-for-project';
import { CreateQuizForProjectUseCase } from '@/shared/application/use-cases/create-quiz-for-project';
import { QuizPreview } from '@/shared/entities/quiz-preview';
import { QuizCreationParams } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';

export class ProjectController {
    constructor(
        private readonly getUserProjects: GetUserProjects,
        private readonly createNewProject: CreateNewProject,
        private readonly _createQuizForProject: CreateQuizForProject,
    ) { }

    async getAllProjects(): Promise<ProjectPreview[]> {
        return this.getUserProjects.execute('testUserId');
    }

    async createProject(userId: string): Promise<ProjectPreview> {
        return this.createNewProject.execute(userId);
    }
}

const projectApi = new HttpProjectApi(httpClient);

export const projectController = new ProjectController(
    new GetUserProjectsUseCase(projectApi),
    new CreateNewProjectUseCase(projectApi),
    new CreateQuizForProjectUseCase(projectApi),
);
