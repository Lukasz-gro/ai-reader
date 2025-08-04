import { AsyncResult } from '@/shared/entities/result';
import { QuizApi, GetQuizQuestionsResponse } from '@/contexts/quiz-mode/application/ports/out/QuizApi';
import { GetQuizQuestions } from '@/contexts/quiz-mode/application/ports/in/get-quiz-questions';

export class GetQuizQuestionsUseCase implements GetQuizQuestions {
    constructor(private readonly quizApi: QuizApi) {}

    execute(quizId: string): AsyncResult<GetQuizQuestionsResponse, Error> {
        return this.quizApi.getQuizQuestions(quizId);
    }
}
