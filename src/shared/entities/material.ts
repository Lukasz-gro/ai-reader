import { ParsedContent } from '@/shared/entities/parsed-content';

export interface Material {
    id: string;
    // TODO userId ?
    title: string;
    content: ParsedContent;
}
