'use server';

import { uploadsController } from '@/shared/interface/controllers/uploads-controller';
import { Material } from '@/shared/entities/material';

export async function uploadMaterialAction(formData: FormData): Promise<Material> {
    const file = formData.get('file') as File | null;
    if (!file) throw new Error('No file provided');

    return uploadsController.uploadMaterial(file);
}

export async function getAcceptedMimeTypes(): Promise<string[]> {
    return uploadsController.getValidUploadMimeTypes();
}

export async function getMaterialsByIds(materialIds: string[]): Promise<Material[]> {
    return uploadsController.getMaterialsByIds(materialIds);
}
