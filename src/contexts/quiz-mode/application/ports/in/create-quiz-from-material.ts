import { Project } from '@/shared/entities/project';
import { Quiz } from '../../../entities/quiz';
import { QuizProvider } from '../out/quiz-provider';
import { MaterialRepo } from '@/shared/application/ports/out/material-repo';

// TODO - adjust interface
export interface CreateQuizFromMaterial {
    execute(
        project: Project,
        quizProvider: QuizProvider,
        materialRepo: MaterialRepo,
        params: QuizCreationParams
    ): Promise<Quiz>;
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'expert';

export interface QuizCreationParams {
    numberOfQuestions: number;
    difficulty: DifficultyLevel;
    includeMultipleChoice: boolean;
    includeOpenEnded: boolean;
}
