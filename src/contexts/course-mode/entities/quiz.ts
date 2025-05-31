import { QuizQuestion } from './quiz-question';

export interface Quiz {
    id: string;
    name: string;
    questions: QuizQuestion[];
}
