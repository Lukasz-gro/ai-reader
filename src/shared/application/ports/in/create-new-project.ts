import { Project } from '@/shared/entities/project';

export interface CreateNewProject {
    execute(ownerId: string): Promise<Project>;
}
