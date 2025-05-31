import { ParserManager } from '../../services/parser-manager';
import { UserUpload } from '@/shared/entities/user-upload';
import { MaterialRepo } from '@/shared/application/ports/out/material-repo';

export interface UploadMaterial {
    execute(
        manager: ParserManager,
        uploadsBackend: MaterialRepo,
        upload: UserUpload,
    ): Promise<void>;

    getAvailableMimeTypes(
        manager: ParserManager
    ): string[];
}
