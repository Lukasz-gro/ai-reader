import { ProjectRepo } from '../../application/ports/out/project-repo';
import { Project } from '@/shared/entities/project';

export class InMemoryProjectRepo implements ProjectRepo {
    private projects: Project[] = [];

    upsert(project: Project): Promise<void> {
        const target = this.projects.find((c) => c.id === c.id);
        if (!target) {
            this.projects.push(project);
        } else {
            this.projects = this.projects.map((c) => c.id === target.id ? project : c);
        }
        return Promise.resolve();
    }

    clear(): Promise<void> {
        this.projects = [];
        return Promise.resolve();
    }

    getAll(): Promise<Project[]> {
        return Promise.resolve(this.projects);
    }
}
