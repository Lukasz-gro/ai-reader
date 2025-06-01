import { Answer, ValidationResult, QuestionServices } from '@/contexts/quiz-mode/entities/question';
import { QuizQuestion } from '@/contexts/quiz-mode/entities/quiz-question';
import { CheckUserAnswer } from '@/contexts/quiz-mode/application/ports/in/check-user-answer';

export class CheckUserAnswerUseCase implements CheckUserAnswer {
    execute(question: QuizQuestion, userAnswer: Answer, questionServices: QuestionServices): Promise<ValidationResult> {
        return question.validate(userAnswer, questionServices);
    }
}
