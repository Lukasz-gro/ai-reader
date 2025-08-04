import { AsyncResult } from '@/shared/entities/result';
import { QuizDescription } from '@/contexts/quiz-mode/entities/quiz';
import { QuizCreationParams } from '@/contexts/quiz-mode/application/ports/out/QuizApi';

export interface CreateQuiz {
    execute(params: QuizCreationParams): AsyncResult<QuizDescription, Error>;
}
