import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { QuizCreationParams } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';

export interface CreateQuizApiParams {
    projectTitle: string;
    materialIds: string[];
    params: QuizCreationParams;
}

export interface QuizApi {
    createQuiz(data: CreateQuizApiParams): Promise<Quiz>;
} 