import { Embeddable, Embedded } from '@/shared/entities/chunk';

export interface EmbeddingProvider {
    embed<T extends Embeddable>(chunks: T[]): Promise<(T & Embedded)[]>;
}
