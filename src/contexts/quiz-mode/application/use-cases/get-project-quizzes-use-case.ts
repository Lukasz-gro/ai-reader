import { AsyncResult } from '@/shared/entities/result';
import { QuizDescription } from '@/contexts/quiz-mode/entities/quiz';
import { GetProjectQuizzes } from '@/contexts/quiz-mode/application/ports/in/get-project-quizzes';
import { QuizApi } from '@/contexts/quiz-mode/application/ports/out/QuizApi';

export class GetProjectQuizzesUseCase implements GetProjectQuizzes {
    constructor(private readonly quizApi: QuizApi) {}

    execute(projectId: string): AsyncResult<QuizDescription[], Error> {
        return this.quizApi.getQuizzes(projectId);
    }
}
