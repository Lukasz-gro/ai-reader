import { MaterialPreview } from '@/shared/entities/material';
import { AsyncResult } from '@/shared/entities/result';
import { UploadPayload } from '@/shared/entities/user-upload';

export interface UploadsApi {
    upload(material: UploadPayload): AsyncResult<MaterialPreview, string>;
    listMaterials(projectId: string): Promise<MaterialPreview[]>;
    listValidUploadFiletypes(): Promise<string[]>
}
