import { MaterialPreview } from '@/shared/entities/material';
import { Result } from '@/shared/entities/result';

export interface UploadMaterial {
    execute(file: File, projectId: string): Promise<Result<MaterialPreview, string>>;
}
