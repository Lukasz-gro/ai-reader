import { ProjectPreview } from '@/shared/entities/project';

export interface GetUserProjects {
    execute(userId: string): Promise<ProjectPreview[]>;
}
