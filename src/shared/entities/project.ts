import { LearningRoadmap } from '@/contexts/course-mode/entities/learning-roadmap';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { Conversation, UiConversation } from '@/shared/entities/conversation';
import { UiMaterial } from '@/shared/entities/material';

export interface Project {
    id: string;
    title: string;
    materialIds: string[];
    roadmap: LearningRoadmap;
    conversations: Conversation[];
    quizzes: Quiz[];
}

export interface UiProject {
    id: string;
    title: string;
    materialIds: string[];
    roadmapId: string;
    conversationIds: string[];
    quizIds: string[];
}

export function projectToUi(p: Project): UiProject {
    return {
        id: p.id,
        title: p.title,
        materialIds: p.materialIds,
        roadmapId: p.roadmap.id,
        conversationIds: p.conversations.map(c => c.id),
        quizIds: p.quizzes.map(q => q.id),
    }
}