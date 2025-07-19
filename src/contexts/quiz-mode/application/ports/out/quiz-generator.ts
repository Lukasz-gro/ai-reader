import { Quiz } from '../../../entities/quiz';
import { QuizCreationParams } from '../in/create-quiz-from-material';

export interface QuizGenerationRequest {
    projectTitle: string;
    materialIds: string[];
    params: QuizCreationParams;
}

export interface QuizGenerator {
    generateQuiz(request: QuizGenerationRequest): Promise<Quiz>;
} 