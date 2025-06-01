import { UploadsParser } from '@/shared/application/ports/out/uploads-parser';
import { UserUpload } from '@/shared/entities/user-upload';
import { ParsedContent } from '@/shared/entities/parsed-content';

export class ParserManager {
    public parsers: UploadsParser[] = [];

    register(parser: UploadsParser) {
        this.parsers.push(parser);
    }

    async parse(file: UserUpload): Promise<ParsedContent> {
        const parser = this.parsers.find(p => p.canParse(file));
        if (!parser) throw new Error('Unsupported file type');
        return await parser.parse(file);
    }
}
