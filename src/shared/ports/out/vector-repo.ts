import { EmbeddedChunk } from '@/shared/entities/chunk';

export interface VectorRepo {
    get(ids: string[]): Promise<EmbeddedChunk[]>;
    getAll(): Promise<EmbeddedChunk[]>;
    put(chunks: EmbeddedChunk[]): Promise<EmbeddedChunk[]>;
    delete(ids: string[]): Promise<string[]>;
    upsert(chunks: EmbeddedChunk[]): Promise<EmbeddedChunk[]>;
    query(embedding: number[], k: number): Promise<EmbeddedChunk[]>;
}
