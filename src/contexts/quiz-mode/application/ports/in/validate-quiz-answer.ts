import { AsyncResult } from '@/shared/entities/result';
import { QuestionValidationResult, Answer } from '@/contexts/quiz-mode/entities/question';

export interface ValidateQuizAnswer {
    execute(questionId: string, answer: Answer): AsyncResult<QuestionValidationResult, Error>;
}
