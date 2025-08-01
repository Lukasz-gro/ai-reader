import { MaterialPreview } from '@/shared/entities/material';
import { httpClient } from '@/shared/infra/http/fetch-http-client';
import { AsyncResult, nok } from '@/shared/entities/result';
import { UploadsHttpApi } from '@/shared/infra/uploads/uploads-http-api';
import { UploadMaterial } from '@/shared/application/ports/in/upload-material';
import { UploadsApi } from '@/shared/application/ports/out/uploads-api';
import { UploadMaterialUseCase } from '@/shared/application/use-cases/upload-material';

export class UploadsController {
    constructor(
        private readonly uploadsApi: UploadsApi,
        private readonly uploadMaterial: UploadMaterial,
    ) { }

    async handleTriggerUpload(projectId: string, formData: FormData): AsyncResult<MaterialPreview, string> {
        const file = formData.get('file') as File | null;
        if (!file) {
            return nok('No file to upload');
        }

        return this.uploadMaterial.execute(file, projectId);
    }

    async listValidUploadFiletypes(): Promise<string> {
        const list = await this.uploadsApi.listValidUploadFiletypes();
        return list.join(',');
    }

    async listProjectMaterials(projectId: string): Promise<MaterialPreview[]> {
        return this.uploadsApi.listMaterials(projectId);
    }
}

const uploadsApi = new UploadsHttpApi(httpClient);
const uploadMaterial = new UploadMaterialUseCase(uploadsApi);
export const uploadsController = new UploadsController(uploadsApi, uploadMaterial);
