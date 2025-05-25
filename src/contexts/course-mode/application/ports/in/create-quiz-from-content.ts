import { Quiz } from '../../../entities/quiz';
import { QuizProvider } from '../out/quiz-provider';

export interface CreateQuizFromContent {
    execute(
        content: string,
        quizProvider: QuizProvider
    ): Promise<Quiz>;
}
