import { ProjectApi } from '@/shared/application/ports/out/project-api';
import { Project, ProjectPreview } from '@/shared/entities/project';
import { GenericResponse } from '@/shared/entities/generic-repsonse';
import { HttpClient } from '@/shared/application/ports/out/http-client';
import { QuizCreationParams } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';
import { QuizPreview } from '@/shared/entities/quiz-preview';

export class HttpProjectApi implements ProjectApi {
    constructor(
        private readonly httpClient: HttpClient,
    ) { }

    async getUserProjects(): Promise<ProjectPreview[]> {
        // TODO we should probably allow callers to verify the schema himself instead of interpreting response type via generics
        const response = await this.httpClient.get<ProjectPreview[]>('/project');
        return response.data;
    }

    async addProject(project: Project): Promise<GenericResponse> {
        // TODO we should probably allow callers to verify the schema himself instead of interpreting response type via generics
        const response = await this.httpClient.post<GenericResponse>('/project', project);
        return response.data;
    }

    async createQuizForProject(projectId: string, params: QuizCreationParams): Promise<QuizPreview> {
        const response = await this.httpClient.post<QuizPreview>(`/project/${projectId}/quizzes`, params);
        return response.data;
    }
}
