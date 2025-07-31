import { UploadMaterial } from '../ports/in/upload-material';
import { MaterialPreview } from '@/shared/entities/material';
import { UploadsApi } from '@/shared/application/ports/out/uploads-api';
import { UploadPayload } from '@/shared/entities/user-upload';
import { Result } from '@/shared/entities/result';

export class UploadMaterialUseCase implements UploadMaterial {
    constructor(
        private readonly api: UploadsApi
    ) { }

    async execute(file: File, projectId: string): Promise<Result<MaterialPreview, string>> {
        const payload: UploadPayload = {
            projectId: projectId,
            title: file.name,
            mimeType: file.type,
            file,
        };

        return this.api.upload(payload);
    }
}
