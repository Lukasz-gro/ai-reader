import { AsyncResult } from '@/shared/entities/result';
import { QuizDescription } from '@/contexts/quiz-mode/entities/quiz';

export interface GetProjectQuizzes {
    execute(projectId: string): AsyncResult<QuizDescription[], Error>;
}
