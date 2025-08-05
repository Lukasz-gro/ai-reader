import { Project } from '@/shared/entities/project';
import { CreateNewProjectUseCase } from '@/shared/application/use-cases/create-new-project';
import { HttpProjectApi } from '@/shared/infra/projects/http-project-api';
import { CreateNewProject } from '@/shared/application/ports/in/create-new-project';
import { GetUserProjects } from '@/shared/application/ports/in/get-user-projects';
import { GetUserProjectsUseCase } from '@/shared/application/use-cases/get-user-projects';
import { httpClient } from '@/shared/infra/http/fetch-http-client';

export class ProjectController {
    constructor(
        private readonly getUserProjects: GetUserProjects,
        private readonly createNewProject: CreateNewProject,
    ) { }

    async getAllProjects(): Promise<Project[]> {
        return this.getUserProjects.execute('testUserId');
    }

    async createProject(userId: string): Promise<Project> {
        return this.createNewProject.execute(userId);
    }
}

const projectApi = new HttpProjectApi(httpClient);

export const projectController = new ProjectController(
    new GetUserProjectsUseCase(projectApi),
    new CreateNewProjectUseCase(projectApi)
);
