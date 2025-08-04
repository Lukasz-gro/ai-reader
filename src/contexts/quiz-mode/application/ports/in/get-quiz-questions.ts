import { AsyncResult } from '@/shared/entities/result';
import { GetQuizQuestionsResponse } from '@/contexts/quiz-mode/application/ports/out/QuizApi';

export interface GetQuizQuestions {
    execute(quizId: string): AsyncResult<GetQuizQuestionsResponse, Error>;
}
