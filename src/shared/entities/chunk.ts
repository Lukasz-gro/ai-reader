export interface TextChunk {
    id: string,
    parentId: string | null,
    text: string,
    metadata: TextChunkMeta
}

export interface TextChunkMeta {
    level: number,
    startOffset: number,
    endOffset: number,
}
