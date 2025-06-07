import { QuizQuestion } from '@/contexts/quiz-mode/entities/quiz-question';

export interface QuizProvider {
    generateQuestions<T extends QuizQuestion>(content: string, schema: Record<string, unknown>, numOfQuestions?: number): Promise<T[]>; 
}
