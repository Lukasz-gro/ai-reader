import { UploadMaterial } from '@/shared/application/ports/in/upload-material';
import { ParserManager } from '@/shared/application/services/parser-manager';
import { Material } from '@/shared/entities/material';
import { UserUpload } from '@/shared/entities/user-upload';
import { MaterialRepo } from '@/shared/application/ports/out/material-repo';
import { TxtParser } from '@/shared/infra/parsing/txt-parser';
import { PdfParser } from '@/shared/infra/parsing/pdf-parser';
import { JsonMaterialRepo } from '@/shared/infra/uploads/json-materials-repo';
import { UploadMaterialUseCase } from '@/shared/application/use-cases/upload-material';
import { TextChunker } from '@/shared/application/ports/out/text-chunker';
import { EmbeddingProvider } from '@/shared/ports/out/embedding-provider';
import { Summarizer } from '@/shared/ports/out/summarizer';
import { VectorRepo } from '@/shared/ports/out/vector-repo';
import { RecursiveTextChunker } from '@/shared/infra/chunking/recursive-text-chunker';
import { LLMSummarizer } from '@/shared/infra/summarizing/llm-summarizer';
import { OpenAIProvider } from '@/shared/infra/llms/open-ai-provider';
import { OpenAIEmbeddingProvider } from '@/shared/infra/embedding/openai-embedding-provider';
import { JsonVectorRepo } from '@/shared/infra/vector-db/json-vector-repo';

export class UploadsController {
    constructor(
        private readonly parserManager: ParserManager,
        private readonly materialRepo: MaterialRepo,
        private readonly textChunker: TextChunker,
        private readonly embeddingProvider: EmbeddingProvider,
        private readonly summarizer: Summarizer,
        private readonly chunksVectorRepo: VectorRepo,
        private readonly uploadMaterialUseCase: UploadMaterial,
    ) { }

    async uploadMaterial(file: File): Promise<Material> {
        const buffer = Buffer.from(await file.arrayBuffer());
        const upload: UserUpload = {
            name: file.name,
            mimeType: file.type,
            data: buffer,
        };
        return await this.uploadMaterialUseCase.execute(
            this.parserManager,
            this.materialRepo,
            this.textChunker,
            this.embeddingProvider,
            this.summarizer,
            this.chunksVectorRepo,
            upload
        );
    }

    getValidUploadExtensions = () => {
        return this.uploadMaterialUseCase.getAvailableFileExtensions(this.parserManager);
    };

    async getMaterialsByIds(materialIds: string[]): Promise<Material[]> {
        const allMaterials = await this.materialRepo.getAll();
        return allMaterials.filter(material => materialIds.includes(material.id));
    }
}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) { throw new Error('OPENAI_API_KEY is required'); }

const parserManager: ParserManager = new ParserManager();
parserManager.register(new PdfParser());
parserManager.register(new TxtParser());

export const uploadsController = new UploadsController(
    parserManager,
    new JsonMaterialRepo(),
    new RecursiveTextChunker(),
    new OpenAIEmbeddingProvider(apiKey),
    new LLMSummarizer(new OpenAIProvider(apiKey)),
    new JsonVectorRepo(),
    new UploadMaterialUseCase(),
);
