import { QuizQuestion } from '@/contexts/quiz-mode/entities/quiz-question';
import { DifficultyLevel } from '../in/create-quiz-from-material';

export interface QuizGenerationParams {
    difficulty: DifficultyLevel;
    numberOfQuestions: number;
}

export interface QuizProvider {
    generateQuestions<T extends QuizQuestion>(
        resource: string, 
        questionSchema: Record<string, unknown>, 
        params: QuizGenerationParams
    ): Promise<T[]>; 
}
