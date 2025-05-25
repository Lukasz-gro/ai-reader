import { QuizQuestion } from '@/contexts/course-mode/entities/quiz-question';
import { ZodSchema } from 'zod';

export interface QuizProvider {
    generateQuestions<T extends QuizQuestion>(content: string, schema: ZodSchema<T>): Promise<T[]>; 
}
