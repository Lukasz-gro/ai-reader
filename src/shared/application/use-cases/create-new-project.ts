import { CreateNewProject } from '@/shared/application/ports/in/create-new-project';
import { ProjectApi } from '@/shared/application/ports/out/project-api';
import { LearningRoadmap, Project } from '@/shared/entities/project';
import { v4 as uuidv4 } from 'uuid';

export class CreateNewProjectUseCase implements CreateNewProject {
    constructor(
        private readonly api: ProjectApi
    ) { }

    async execute(ownerId: string): Promise<Project> {
        const newProject = getNewEmptyProject(ownerId);
        const { message } = await this.api.addProject(newProject);
        // TODO toast message
        console.log(message);
        return newProject;
    }
}

function getNewEmptyProject(ownerId: string): Project {
    return {
        id: uuidv4(),
        ownerId: ownerId,
        title: generateProjectTitle(),
        roadmap: generateEmptyRoadmap(),
    };
}

function generateProjectTitle() {
    const dateString = formatDateWithOrdinal(new Date());
    return `New Project from ${dateString}`;
}

function formatDateWithOrdinal(date: Date): string {
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();

    const getOrdinal = (n: number): string => {
        if (n >= 11 && n <= 13) return 'th';
        switch (n % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return `${month} ${day}${getOrdinal(day)}`;
}

function generateEmptyRoadmap(): LearningRoadmap {
    return {
        id: uuidv4(),
        checkpoints: [],
    };
}
