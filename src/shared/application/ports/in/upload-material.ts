import { ParserManager } from '../../services/parser-manager';
import { UserUpload } from '@/shared/entities/user-upload';
import { Material } from '@/shared/entities/material';
import { MaterialRepo } from '@/shared/application/ports/out/material-repo';
import { EmbeddingProvider } from '@/shared/ports/out/embedding-provider';
import { TextChunker } from '../out/text-chunker';
import { Summarizer } from '@/shared/ports/out/summarizer';
import { VectorRepo } from '@/shared/ports/out/vector-repo';

export interface UploadMaterial {
    execute(
        manager: ParserManager,
        materialRepo: MaterialRepo,
        textChunker: TextChunker,
        embeddingProvider: EmbeddingProvider,
        summarizer: Summarizer,
        chunksVectorRepo: VectorRepo,
        upload: UserUpload,
    ): Promise<Material>;

    getAvailableMimeTypes(
        parsers: ParserManager
    ): string[];

    getAvailableFileExtensions(
        parsers: ParserManager
    ): string[];
}
