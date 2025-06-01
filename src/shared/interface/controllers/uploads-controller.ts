import { UploadMaterial } from '@/shared/application/ports/in/upload-material';
import { ParserManager } from '@/shared/application/services/parser-manager';
import { Material } from '@/shared/entities/material';
import { UserUpload } from '@/shared/entities/user-upload';
import { MaterialRepo } from '@/shared/application/ports/out/material-repo';
import { TxtParser } from '@/shared/infra/parsing/txt-parser';
import { PdfParser } from '@/shared/infra/parsing/pdf-parser';
import { JsonMaterialRepo } from '@/shared/infra/uploads/json-materials-repo';
import { UploadMaterialUseCase } from '@/shared/application/use-cases/upload-material';

export class UploadsController {
    constructor(
        private readonly parserManager: ParserManager,
        private readonly repo: MaterialRepo,
        private readonly uploadMaterialUseCase: UploadMaterial,
    ) { }

    async uploadMaterial(file: File): Promise<Material> {
        const buffer = Buffer.from(await file.arrayBuffer());
        const upload: UserUpload = {
            name: file.name,
            mimeType: file.type,
            data: buffer,
        };
        return await this.uploadMaterialUseCase.execute(this.parserManager, this.repo, upload);
    }

    getValidUploadMimeTypes = () => {
        return this.uploadMaterialUseCase.getAvailableMimeTypes(this.parserManager);
    };
}

const parserManager: ParserManager = new ParserManager();
parserManager.register(new PdfParser());
parserManager.register(new TxtParser());

export const uploadsController = new UploadsController(
    parserManager,
    new JsonMaterialRepo(),
    new UploadMaterialUseCase(),
);
