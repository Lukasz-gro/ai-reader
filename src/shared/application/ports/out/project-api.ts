import { Project, ProjectPreview } from '@/shared/entities/project';
import { GenericResponse } from '@/shared/entities/generic-repsonse';

export interface ProjectApi {
    getUserProjects(userId: string): Promise<ProjectPreview[]>;
    addProject(project: Project): Promise<GenericResponse>;
}
