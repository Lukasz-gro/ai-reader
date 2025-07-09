import { ProjectPreview } from '@/shared/entities/project';
import { CreateNewProjectUseCase } from '@/shared/application/use-cases/create-new-project';
import { HttpProjectApi } from '@/shared/infra/projects/http-project-api';
import { CreateNewProject } from '@/shared/application/ports/in/create-new-project';
import { GetUserProjects } from '@/shared/application/ports/in/get-user-projects';
import { GetUserProjectsUseCase } from '@/shared/application/use-cases/get-user-projects';
import { httpClient } from '@/shared/infra/http/axios-http-client';

export class ProjectController {
    constructor(
        private readonly getUserProjects: GetUserProjects,
        private readonly createNewProject: CreateNewProject,
    ) { }

    async getAllProjects(): Promise<ProjectPreview[]> {
        return this.getUserProjects.execute('testUserId');
    }

    async createProject(projectTitle: string, userId: string): Promise<ProjectPreview> {
        return this.createNewProject.execute(projectTitle, userId);
    }
}

const projectApi = new HttpProjectApi('http://localhost:5000', httpClient);

export const projectController = new ProjectController(
    new GetUserProjectsUseCase(projectApi),
    new CreateNewProjectUseCase(projectApi)
);
