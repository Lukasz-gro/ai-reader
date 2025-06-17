import { Project } from '@/shared/entities/project';
import { v4 as uuidv4 } from 'uuid';

// TODO: this will contain use cases
export class ProjectController {
    async getAllProjects(): Promise<Project[]> {
        return [{
            id: '1',
            title: 'Project 1',
            roadmap: {
                id: '1',
                title: 'Project 1',
                checkpoints: []
            },
            conversations: [],
            materials: [],
            quizzes: []
        }];
    }

    async createProject(projectTitle: string): Promise<Project> {
        return {
            id: uuidv4(),
            title: projectTitle,
            roadmap: {
                id: '1',
                title: projectTitle,
                checkpoints: []
            },
            conversations: [],
            materials: [],
            quizzes: []
        };
    }
}

export const projectController = new ProjectController();
