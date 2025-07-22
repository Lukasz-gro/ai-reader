import { ProjectPreview } from '@/shared/entities/project';

export interface CreateNewProject {
    execute(ownerId: string): Promise<ProjectPreview>;
}
