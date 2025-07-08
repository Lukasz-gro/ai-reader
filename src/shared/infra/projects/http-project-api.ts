import { ProjectApi } from '@/shared/application/ports/out/project-api';
import { Project, ProjectPreview } from '@/shared/entities/project';
import { GenericResponse } from '@/shared/entities/generic-repsonse';
import { httpClient } from '@/shared/infra/http/axios-http-client';

export class HttpProjectApi implements ProjectApi {
    constructor(
        private readonly basePath: string
    ) { }

    async getUserProjects(): Promise<ProjectPreview[]> {
        const getProjectUrl = new URL('/api/project', this.basePath).toString();
        // TODO we should probably allow callers to verify the schema himself instead of interpreting response type via generics
        const response = await httpClient.get<ProjectPreview[]>(getProjectUrl);
        return response.data;
    }

    async addProject(project: Project): Promise<GenericResponse> {
        const getProjectUrl = new URL('/api/project', this.basePath).toString();
        // TODO we should probably allow callers to verify the schema himself instead of interpreting response type via generics
        const response = await httpClient.post<GenericResponse>(getProjectUrl, project);
        return response.data;
    }
}
