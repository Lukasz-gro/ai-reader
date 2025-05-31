'use server';

import { uploadsController } from '@/shared/interface/controllers/uploads-controller';

export async function uploadMaterialAction(formData: FormData): Promise<void> {
    const file = formData.get('file') as File | null;
    if (!file) throw new Error('No file provided');

    await uploadsController.uploadMaterial(file);
}

export async function getAcceptedMimeTypes(): Promise<string[]> {
    return uploadsController.getValidUploadMimeTypes();
}
