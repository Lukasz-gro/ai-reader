import { ValidationResult } from '../../entities/question';
import { QuestionServices } from '../../entities/question';
import { Answer } from '../../entities/question';
import { QuizQuestion } from '../../entities/quiz-question';
import { CheckUserAnswer } from '../ports/in/check-user-answer';

export class CheckUserAnswerUseCase implements CheckUserAnswer {
    execute(question: QuizQuestion, userAnswer: Answer, questionServices: QuestionServices): Promise<ValidationResult> {
        return question.validate(userAnswer, questionServices);
    }
}
