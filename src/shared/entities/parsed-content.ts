export type ContentType = 'text' | 'image' | 'audio' | 'video';

export interface ParsedContentBase {
    type: ContentType;
    metadata?: Record<string, unknown>;
}

export interface TextContent extends ParsedContentBase {
    type: 'text';
    content: string;
}

export interface BinaryContent extends ParsedContentBase {
    type: 'image' | 'audio' | 'video';
    content: Buffer;
}

export type ParsedContent = TextContent | BinaryContent;
