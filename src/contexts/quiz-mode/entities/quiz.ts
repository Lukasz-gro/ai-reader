import { QuizQuestion } from './quiz-question';

export type ProgressStage = 'NEW' | 'STARTRED' | 'COMPLETED';

export interface Quiz {
    id: string;
    projId: string;
    userId: string;
    name: string;
    completed: ProgressStage;
    questions: QuizQuestion[];
}

export interface QuizDescription {
    id: string;
    projId: string;
    userId: string;
    name: string;
    completed: ProgressStage;
}
