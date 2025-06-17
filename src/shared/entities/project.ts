import { LearningRoadmap } from '@/contexts/course-mode/entities/learning-roadmap';
import { MaterialPreview } from './material-preview';
import { ConversationPreview } from './conversation-preview';
import { QuizPreview } from './quiz-preview';

export interface Project {
    id: string;
    title: string;
    materials: MaterialPreview[];
    roadmap: LearningRoadmap;
    conversations: ConversationPreview[];
    quizzes: QuizPreview[];
}
