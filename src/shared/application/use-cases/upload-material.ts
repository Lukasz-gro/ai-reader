import { UploadMaterial } from '@/shared/application/ports/in/upload-material';
import { ParserManager } from '../services/parser-manager';
import { UserUpload } from '@/shared/entities/user-upload';
import { MaterialRepo } from '@/shared/application/ports/out/material-repo';
import { StoredMaterial } from '@/shared/entities/stored-material';
import { v4 as uuidv4 } from 'uuid';

export class UploadMaterialUseCase implements UploadMaterial {
    async execute(
        manager: ParserManager,
        uploadsBackend: MaterialRepo,
        upload: UserUpload,
    ): Promise<void> {
        const content = await manager.parse(upload);

        const material: StoredMaterial = {
            id: uuidv4(),
            title: upload.name,
            content: content,
        };

        await uploadsBackend.upsert(material);
    }

    getAvailableMimeTypes(manager: ParserManager): string[] {
        return manager.parsers.map(p => p.getValidMimeTypes()).flat();
    }
}
