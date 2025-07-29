import { UserUpload } from '@/shared/entities/user-upload';
import { Material } from '@/shared/entities/material';

export interface UploadMaterial {
    execute(
        upload: UserUpload,
    ): Promise<Material>;

    // getAvailableMimeTypes(
    //     parsers: ParserManager
    // ): string[];
    //
    // getAvailableFileExtensions(
    //     parsers: ParserManager
    // ): string[];
}
