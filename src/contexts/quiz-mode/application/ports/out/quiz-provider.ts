import { QuizQuestion } from '@/contexts/quiz-mode/entities/quiz-question';

export interface QuizProvider {
    generateQuestions<T extends QuizQuestion>(resource: string, questionSchema: Record<string, unknown>, numOfQuestions?: number): Promise<T[]>; 
}
