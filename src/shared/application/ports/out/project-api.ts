import { Project } from '@/shared/entities/project';
import { GenericResponse } from '@/shared/entities/generic-repsonse';

export interface ProjectApi {
    getUserProjects(userId: string): Promise<Project[]>;
    addProject(project: Project): Promise<GenericResponse>;
}
