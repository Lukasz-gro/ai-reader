export interface LearningCheckpoint {
    id: string;
    title: string;
    description: string;
    completedTimestamp: Date;
}

export interface LearningRoadmap {
    id: string;
    checkpoints: LearningCheckpoint[];
}

export interface Project {
    id: string;
    ownerId: string;
    title: string;
    roadmap: LearningRoadmap;
}
