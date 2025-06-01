import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ParserManager } from '@/shared/application/services/parser-manager';
import { MockParser } from '@/shared/infra/mocks/mock-parser';
import { UserUpload } from '@/shared/entities/user-upload';
import { UploadMaterialUseCase } from './upload-material';
import { MaterialRepo } from '../ports/out/material-repo';
import { InMemoryMaterialRepo } from '@/shared/infra/mocks/in-memory-material-repo';

describe('upload material use case', () => {
    let useCase: UploadMaterialUseCase;
    let manager: ParserManager;
    let repo: MaterialRepo;
    let parser: MockParser;

    const testUpload: UserUpload = {
        name: 'test-file.pdf',
        mimeType: 'application/pdf',
        data: Buffer.from('some content'),
    };

    beforeEach(() => {
        useCase = new UploadMaterialUseCase();
        manager = new ParserManager();
        repo = new InMemoryMaterialRepo();
        parser = new MockParser(['application/pdf']);
        manager.register(parser);
    });

    afterEach(() => {
        repo.clear();
    });

    it('should upload parsed material content to repo', async () => {
        const uploaded = await useCase.execute(manager, repo, testUpload);

        const stored = await repo.getAll();
        expect(stored.length).toEqual(1);
        expect(stored[0]).toEqual(uploaded);
    });

    it('should throw when no parser can handle the file', async () => {
        const upload: UserUpload = {
            name: 'not-supported.txt',
            mimeType: 'text/plain',
            data: Buffer.from('irrelevant'),
        };
        await expect(useCase.execute(manager, repo, upload)).rejects.toThrow('Unsupported file type');
        const stored = await repo.getAll();
        expect(stored.length).toBe(0);
    });

    it('should allow multiple materials to be uploaded', async () => {
        const secondUpload: UserUpload = {
            name: 'another.pdf',
            mimeType: 'application/pdf',
            data: Buffer.from('more'),
        };
        await useCase.execute(manager, repo, testUpload);
        await useCase.execute(manager, repo, secondUpload);

        const stored = await repo.getAll();
        expect(stored.length).toBe(2);
        expect(stored[0].title).toBe(testUpload.name);
        expect(stored[1].title).toBe(secondUpload.name);
    });

    it('should expose all valid mime types from all registered parsers', () => {
        const anotherParser = new MockParser(['image/png', 'text/plain']);
        manager.register(anotherParser);

        const available = useCase.getAvailableMimeTypes(manager);
        expect(available).toEqual(expect.arrayContaining(['application/pdf', 'image/png', 'text/plain']));
    });

    it('should call parse on the first matching parser', async () => {
        const canParseSpy = vi.spyOn(parser, 'canParse');
        await useCase.execute(manager, repo, testUpload);
        expect(canParseSpy).toHaveBeenCalledWith(testUpload);
    });

    it('should throw if parse throws', async () => {
        const throwingParser = new MockParser(['application/pdf']);
        vi.spyOn(throwingParser, 'parse').mockRejectedValue(new Error('parse error'));
        const throwingManager = new ParserManager();
        throwingManager.register(throwingParser);

        await expect(
            useCase.execute(throwingManager, repo, testUpload)
        ).rejects.toThrow('parse error');
    });
});
