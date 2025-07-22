import { QuizPreview } from './quiz-preview';
import { MaterialPreview } from '@/shared/entities/material';
import { ConversationPreview } from '@/shared/entities/conversation';

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
    materialIds: string[];
    quizIds: string[];
    conversationIds: string[];
}

export interface ProjectPreview {
    id: string;
    title: string;
    description: string;
}


export interface ProjectPreview {
    id: string;
    ownerId: string;
    title: string;
    materials: MaterialPreview[];
    roadmap: LearningRoadmap;
    conversations: ConversationPreview[];
    quizzes: QuizPreview[];
}
