import { Project } from "@/shared/entities/project";
import { v4 as uuidv4 } from 'uuid';

// TODO: this will contain use cases
export class ProjectController {
    async getAllProjects(): Promise<Project[]> {
        return [];
    }

    async createProject(projectTitle: string): Promise<Project> {
        return {
            id: uuidv4(),
            title: projectTitle,
            roadmap: {
                id: "1",
                title: projectTitle,
                checkpoints: []
            },
            conversationIds: [],
            materialIds: [],
            quizIds: []
        }
    }
}

export const projectController = new ProjectController();
