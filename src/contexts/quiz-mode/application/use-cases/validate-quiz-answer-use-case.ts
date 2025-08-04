import { AsyncResult } from '@/shared/entities/result';
import { QuestionValidationResult, Answer } from '@/contexts/quiz-mode/entities/question';
import { ValidateQuizAnswer } from '@/contexts/quiz-mode/application/ports/in/validate-quiz-answer';
import { QuizApi } from '@/contexts/quiz-mode/application/ports/out/QuizApi';

export class ValidateQuizAnswerUseCase implements ValidateQuizAnswer {
    constructor(private readonly quizApi: QuizApi) {}

    execute(questionId: string, answer: Answer): AsyncResult<QuestionValidationResult, Error> {
        return this.quizApi.validateAnswer(questionId, answer);
    }
}
