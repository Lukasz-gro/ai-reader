import { QuizQuestion } from './quiz-question';

export interface Quiz {
    id: string;
    questions: QuizQuestion[];
}
