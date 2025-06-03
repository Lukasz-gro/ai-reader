import { Project } from '@/shared/entities/project';
import { Quiz } from '../../../entities/quiz';
import { QuizProvider } from '../out/quiz-provider';
import { MaterialRepo } from '@/shared/application/ports/out/material-repo';

export interface CreateQuizFromMaterial {
    execute(
        project: Project,
        quizProvider: QuizProvider,
        materialRepo: MaterialRepo
    ): Promise<Quiz>;
}
