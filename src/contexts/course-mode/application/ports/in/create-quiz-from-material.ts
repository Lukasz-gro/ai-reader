import { Project } from '@/shared/entities/project';
import { Quiz } from '../../../entities/quiz';
import { QuizProvider } from '../out/quiz-provider';

export interface CreateQuizFromMaterial {
    execute(
        project: Project,
        quizProvider: QuizProvider
    ): Promise<Quiz>;
}
