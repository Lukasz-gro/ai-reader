import { Material } from './material';
import { LearningRoadmap } from '@/contexts/course-mode/entities/learning-roadmap';
import { Quiz } from '@/contexts/course-mode/entities/quiz';
import { Conversation } from '@/shared/entities/conversation';

export interface Project {
    id: string;
    title: string;
    materials: Material[];
    roadmap: LearningRoadmap;
    conversations: Conversation[];
    quizes: Quiz[];
}
