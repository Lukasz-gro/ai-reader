import { ProjectPreview } from '@/shared/entities/project';

export interface CreateNewProject {
    execute(title: string, ownerId: string): Promise<ProjectPreview>;
}
