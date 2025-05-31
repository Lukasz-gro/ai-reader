import { StoredMaterial } from '@/shared/entities/stored-material';

export interface MaterialRepo {
    upsert(material: StoredMaterial): Promise<StoredMaterial>;
    getAll(): Promise<StoredMaterial[]>;
    clear(): Promise<void>;
}
