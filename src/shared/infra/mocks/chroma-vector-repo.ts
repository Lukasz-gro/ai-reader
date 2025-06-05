import { EmbeddedChunk } from '@/shared/entities/chunk';
import { VectorRepo } from '@/shared/ports/out/vector-repo';

export class ChromaVectorRepo implements VectorRepo {
    delete(ids: string[]): Promise<string[]> {
        void ids;
        return Promise.resolve([]);
    }

    get(ids: string[]): Promise<EmbeddedChunk[]> {
        void ids;
        return Promise.resolve([]);
    }

    getAll(): Promise<EmbeddedChunk[]> {
        return Promise.resolve([]);
    }

    put(chunks: EmbeddedChunk[]): Promise<EmbeddedChunk[]> {
        return Promise.resolve(chunks);
    }

    query(embedding: number[], k: number = 5): Promise<EmbeddedChunk[]> {
        void embedding;
        void k;
        return Promise.resolve([]);
    }

    upsert(chunks: EmbeddedChunk[]): Promise<EmbeddedChunk[]> {
        void chunks;
        return Promise.resolve([]);
    }
}
