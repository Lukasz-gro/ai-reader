import { GetUserProjects } from '@/shared/application/ports/in/get-user-projects';
import { Project } from '@/shared/entities/project';
import { ProjectApi } from '@/shared/application/ports/out/project-api';

export class GetUserProjectsUseCase implements GetUserProjects {
    constructor(
        private readonly api: ProjectApi
    ) { }

    execute(userId: string): Promise<Project[]> {
        return this.api.getUserProjects(userId);
    }
}
