import { UploadsParser } from '@/shared/application/ports/out/uploads-parser';
import { UserUpload } from '@/shared/entities/user-upload';
import { ParsedContent } from '@/shared/entities/parsed-content';

import pdfParse from 'pdf-parse';

export class PdfParser implements UploadsParser {
    private readonly validMimeTypes = ['application/pdf'];

    getValidMimeTypes(): string[] {
        return this.validMimeTypes;
    }

    canParse(file: UserUpload): boolean {
        return this.validMimeTypes.includes(file.mimeType);
    }

    async parse(file: UserUpload): Promise<ParsedContent> {
        const result = await pdfParse(file.data);

        return {
            type: 'text',
            content: result.text,
            metadata: {
                pages: result.numpages,
                info: result.info,
                metadata: result.metadata,
            },
        };
    }
}
