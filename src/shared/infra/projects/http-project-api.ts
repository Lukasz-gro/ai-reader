import { ProjectApi } from '@/shared/application/ports/out/project-api';
import { Project } from '@/shared/entities/project';
import { GenericResponse } from '@/shared/entities/generic-repsonse';
import { HttpClient } from '@/shared/application/ports/out/http-client';

export class HttpProjectApi implements ProjectApi {
    constructor(
        private readonly httpClient: HttpClient,
    ) { }

    async getUserProjects(): Promise<Project[]> {
        // TODO we should probably allow callers to verify the schema himself instead of interpreting response type via generics
        const response = await this.httpClient.get<Project[]>('/project');
        return response.data;
    }

    async addProject(project: Project): Promise<GenericResponse> {
        // TODO we should probably allow callers to verify the schema himself instead of interpreting response type via generics
        const response = await this.httpClient.post<GenericResponse>('/project', project);
        return response.data;
    }
}
