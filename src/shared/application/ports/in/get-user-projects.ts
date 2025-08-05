import { Project } from '@/shared/entities/project';

export interface GetUserProjects {
    execute(userId: string): Promise<Project[]>;
}
