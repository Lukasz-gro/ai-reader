import { ParserManager } from '../../services/parser-manager';
import { UserUpload } from '@/shared/entities/user-upload';
import { Material } from '@/shared/entities/material';
import { MaterialRepo } from '@/shared/application/ports/out/material-repo';

export interface UploadMaterial {
    execute(
        parsers: ParserManager,
        repo: MaterialRepo,
        upload: UserUpload,
    ): Promise<Material>;

    getAvailableMimeTypes(
        parsers: ParserManager
    ): string[];

    getAvailableFileExtensions(
        parsers: ParserManager
    ): string[];
}
