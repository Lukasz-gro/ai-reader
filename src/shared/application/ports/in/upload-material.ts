import { MaterialPreview } from '@/shared/entities/material';
import { AsyncResult } from '@/shared/entities/result';

export interface UploadMaterial {
    execute(file: File, projectId: string): AsyncResult<MaterialPreview, string>;
}
