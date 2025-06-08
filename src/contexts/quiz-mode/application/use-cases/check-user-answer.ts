import { Answer, QuestionValidationResult, QuestionServices } from '@/contexts/quiz-mode/entities/question';
import { QuizQuestion } from '@/contexts/quiz-mode/entities/quiz-question';
import { CheckUserAnswer } from '@/contexts/quiz-mode/application/ports/in/check-user-answer';

export class CheckUserAnswerUseCase implements CheckUserAnswer {
    async execute(question: QuizQuestion, userAnswer: Answer, questionServices: QuestionServices): Promise<QuestionValidationResult> {
        if (question.type === 'open_ended') {
            return await questionServices.validate(question, userAnswer);
        } else if (question.type === 'multiple_choice') {
            const userChoice = userAnswer.value as string;

            if (question.correctChoiceId === userChoice) {
                return {
                    ok: true
                };
            }
            return {
                ok: false
            };
        }

        throw new Error('Unknown question type to validate');
    }
}
