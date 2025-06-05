import { Summarizable, Summarized } from '@/shared/entities/chunk';
import { Summarizer } from '@/shared/ports/out/summarizer';

export class MockSummarizer implements Summarizer {
    summarize<T extends Summarizable>(chunks: T[]): Promise<(T & Summarized)[]> {
        void chunks;
        return Promise.resolve([]);
    }

    summarizeOne<T extends Summarizable>(chunk: T): Promise<T & Summarized> {
        return Promise.resolve({...chunk, summary: ''});
    }
}
