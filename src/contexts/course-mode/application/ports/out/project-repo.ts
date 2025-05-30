import { Project } from '@/shared/entities/project';

export interface ProjectRepo {
    upsert(project: Project): Promise<void>;
    clear(): Promise<void>;
    getAll(): Promise<Project[]>;
}
