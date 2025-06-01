import { LearningRoadmap } from '@/contexts/course-mode/entities/learning-roadmap';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { Conversation } from '@/shared/entities/conversation';

export interface Project {
    id: string;
    title: string;
    materialIds: string[];
    roadmap: LearningRoadmap;
    conversations: Conversation[];
    quizes: Quiz[];
}
