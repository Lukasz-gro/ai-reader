import { MaterialRepo } from '@/shared/application/ports/out/material-repo';
import { StoredMaterial } from '@/shared/entities/stored-material';

export class InMemoryMaterialRepo implements MaterialRepo {
    materials: StoredMaterial[] = [];

    upsert(material: StoredMaterial): Promise<StoredMaterial> {
        if (this.materials.find(s => s.id === material.id)) {
            this.materials = this.materials.map(s => s.id === material.id ? material : s);
        } else {
            this.materials.push(material);
        }
        return Promise.resolve(material);
    }

    getAll(): Promise<StoredMaterial[]> {
        return Promise.resolve(this.materials);
    }

    clear(): Promise<void> {
        this.materials = [];
        return Promise.resolve();
    }
}
