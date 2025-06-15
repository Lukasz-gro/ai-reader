import { LearningRoadmap } from '@/contexts/course-mode/entities/learning-roadmap';

export interface Project {
    id: string;
    title: string;
    materialIds: string[];
    roadmap: LearningRoadmap;
    conversationIds: string[];
    quizIds: string[];
}
