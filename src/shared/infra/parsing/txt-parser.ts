import { UploadsParser } from '@/shared/application/ports/out/uploads-parser';
import { UserUpload } from '@/shared/entities/user-upload';
import { ParsedContent } from '@/shared/entities/parsed-content';

export class TxtParser implements UploadsParser {
    private readonly validMimeTypes = ['text/plain', 'application/txt'];

    getValidMimeTypes(): string[] {
        return this.validMimeTypes;
    }

    canParse(file: UserUpload): boolean {
        return file.mimeType === 'text/plain' || file.name.endsWith('.txt');
    }

    async parse(file: UserUpload): Promise<ParsedContent> {
        try {
            const decoder = new TextDecoder('utf-8');
            const text = decoder.decode(file.data);

            return {
                type: 'text',
                content: text,
                metadata: {
                    length: text.length,
                    lines: text.split(/\r?\n/).length,
                },
            };
        } catch (err) {
            throw new Error(`Failed to parse .txt file: ${(err as Error).message}`);
        }
    }
}
