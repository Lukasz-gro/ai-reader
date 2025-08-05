import { UploadsApi } from '@/shared/application/ports/out/uploads-api';
import { MaterialPreview } from '@/shared/entities/material';
import { HttpClient } from '@/shared/application/ports/out/http-client';
import { UploadPayload } from '@/shared/entities/user-upload';
import { AsyncResult, nok, ok } from '@/shared/entities/result';

export class UploadsHttpApi implements UploadsApi {
    constructor(
        private readonly httpClient: HttpClient,
    ) { }

    async upload(payload: UploadPayload): AsyncResult<MaterialPreview, string> {
        const formData = new FormData();
        formData.append('file', payload.file);
        formData.append('projectId', payload.projectId);
        formData.append('title', payload.title);
        formData.append('mimeType', payload.mimeType);

        try {
            const response = await this.httpClient.post<MaterialPreview>('/material', formData);
            return ok(response.data);
        } catch (error: unknown) {
            void error;
            return nok('Error uploading material');
        }
    }

    async listMaterials(projectId: string): Promise<MaterialPreview[]> {
        const response = await this.httpClient.get<MaterialPreview[]>(`/material/project/${projectId}`);
        return response.data;
    }

    async listValidUploadFiletypes(): Promise<string[]> {
        const response = await this.httpClient.get<string[]>('/material/filetypes');
        return response.data;
    }
}
