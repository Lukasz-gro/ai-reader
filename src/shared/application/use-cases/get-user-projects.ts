import { GetUserProjects } from '@/shared/application/ports/in/get-user-projects';
import { ProjectPreview } from '@/shared/entities/project';
import { ProjectApi } from '@/shared/application/ports/out/project-api';

export class GetUserProjectsUseCase implements GetUserProjects {
    constructor(
        private readonly api: ProjectApi
    ) { }

    execute(userId: string): Promise<ProjectPreview[]> {
        return this.api.getUserProjects(userId);
    }
}
