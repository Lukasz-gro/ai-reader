import { ParsedContent } from '@/shared/entities/parsed-content';

export interface StoredMaterial {
    id: string;
    // TODO userId ?
    title: string;
    content: ParsedContent;
}
