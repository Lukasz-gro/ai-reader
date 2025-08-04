import { AsyncResult } from '@/shared/entities/result';
import { QuizDescription } from '@/contexts/quiz-mode/entities/quiz';
import { CreateQuiz } from '@/contexts/quiz-mode/application/ports/in/create-quiz';
import { QuizApi, QuizCreationParams } from '@/contexts/quiz-mode/application/ports/out/QuizApi';

export class CreateQuizUseCase implements CreateQuiz {
    constructor(private readonly quizApi: QuizApi) {}

    execute(params: QuizCreationParams): AsyncResult<QuizDescription, Error> {
        return this.quizApi.createQuiz(params);
    }
}
