import { EmbeddingProvider } from '@/shared/ports/out/embedding-provider';
import { Embeddable, Embedded } from '@/shared/entities/chunk';

export class MockEmbeddingProvider implements EmbeddingProvider {
    embed<T extends Embeddable>(chunks: T[]): Promise<(T & Embedded)[]> {
        void chunks;
        return Promise.resolve([]);
    }
}
