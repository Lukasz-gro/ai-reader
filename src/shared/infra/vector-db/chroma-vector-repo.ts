import { ChromaClient, Collection, EmbeddingFunction } from 'chromadb';
import { VectorRepo } from '@/shared/ports/out/vector-repo';
import { LeafChunk, TextChunkMeta } from '@/shared/entities/chunk';

interface ChromaMeta extends TextChunkMeta {
    parentId: string | null;
    childrenIds: string[];
    summary: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

function chunkToChromaPayload(chunk: LeafChunk) {
    const { id, text, embedding, parentId, childrenIds, metadata, summary } = chunk;
    return {
        id,
        document: text,
        embedding,
        metadata: {
            parentId,
            childrenIds,
            summary,
            startOffset: metadata.startOffset,
            endOffset: metadata.endOffset,
            level: metadata.level,
        } satisfies ChromaMeta,
    };
}

function chromaRecordToChunk(
    id: string,
    document: string,
    embedding: number[],
    metadata: ChromaMeta,
): LeafChunk {
    return {
        id,
        text: document,
        embedding: embedding,
        parentId: metadata.parentId,
        childrenIds: metadata.childrenIds,
        metadata: { startOffset: metadata.startOffset, endOffset: metadata.endOffset, level: metadata.level },
        summary: metadata.summary,
    };
}

export class ChromaVectorRepo implements VectorRepo {
    private client: ChromaClient;
    private collection: Collection | undefined;
    private readonly embeddingFunction?: EmbeddingFunction;

    constructor(
        private readonly collectionName = 'leaf_chunks',
        options?: {
            host?: string;
            port?: number;
            embeddingFunction?: EmbeddingFunction;
        },
    ) {
        const host = options?.host ?? 'localhost';
        const port = options?.port ?? 8000;
        this.client = new ChromaClient({ host, port });

        if (options?.embeddingFunction) {
            this.embeddingFunction = options.embeddingFunction;
        }
    }

    async get(ids: string[]): Promise<LeafChunk[]> {
        if (ids.length === 0) return [];
        const collection = await this.getCollection();
        const result = await collection.get({
            ids,
            include: ['documents', 'embeddings', 'metadatas'],
        });

        return result.ids.map((id, i) =>
            chromaRecordToChunk(
                id,
                result.documents[i]!,
                result.embeddings[i]!,
                result.metadatas[i]! as unknown as ChromaMeta,
            ),
        );
    }

    async getAll(): Promise<LeafChunk[]> {
        const col = await this.getCollection();
        const result = await col.get({ include: ['documents', 'embeddings', 'metadatas'] });
        return result.ids.map((id, i) =>
            chromaRecordToChunk(
                id,
                result.documents[i]!,
                result.embeddings[i]!,
                result.metadatas[i]! as unknown as ChromaMeta,
            ),
        );
    }

    async put(chunks: LeafChunk[]): Promise<LeafChunk[]> {
        return this.putOrUpsert(chunks, (col, payload) => col.add(payload));
    }

    async upsert(chunks: LeafChunk[]): Promise<LeafChunk[]> {
        return this.putOrUpsert(chunks, (col, payload) => col.upsert(payload));
    }

    async delete(ids: string[]): Promise<string[]> {
        const col = await this.getCollection();
        if (ids.length === 0) return [];
        await col.delete({ ids });
        return ids;
    }

    async query(embedding: number[], k: number): Promise<LeafChunk[]> {
        if (k <= 0) return [];
        const collection = await this.getCollection();
        const result = await collection.query({
            queryEmbeddings: [embedding],
            nResults: k,
            include: ['documents', 'embeddings', 'metadatas'],
        });

        // query can take a batch of embeddings, this is a single query so we pull the first result
        return (result.ids[0] || []).map((id, i) =>
            chromaRecordToChunk(
                id,
                result.documents[0][i]!,
                result.embeddings[0][i]!,
                result.metadatas[0][i]! as ChromaMeta,
            ),
        );
    }

    private async putOrUpsert(
        chunks: LeafChunk[],
        action: (col: Collection, payload: {
            ids: string[];
            documents: string[];
            embeddings: number[][];
            metadatas: ChromaMeta[];
        }) => Promise<unknown>
    ): Promise<LeafChunk[]> {
        if (chunks.length === 0) return [];
        const col = await this.getCollection();

        const ids: string[] = [];
        const documents: string[] = [];
        const embeddings: number[][] = [];
        const metadatas: ChromaMeta[] = [];

        for (const chunk of chunks) {
            const payload = chunkToChromaPayload(chunk);
            ids.push(payload.id);
            documents.push(payload.document);
            embeddings.push(payload.embedding);
            metadatas.push(payload.metadata);
        }

        await action(col, { ids, documents, embeddings, metadatas });
        return chunks;
    }

    private async getCollection(): Promise<Collection> {
        if (!this.collection) {
            this.collection = await this.client.getOrCreateCollection({
                name: this.collectionName,
                embeddingFunction: this.embeddingFunction ?? NO_EMBED,
            });
        }
        return this.collection;
    }
}

const NO_EMBED: EmbeddingFunction = {
    generate: async (_docs: string[]) => {
        void _docs;
        throw new Error('Client must supply embeddings');
    },
};
