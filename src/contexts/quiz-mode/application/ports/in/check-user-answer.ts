import { QuizQuestion } from '@/contexts/quiz-mode/entities/quiz-question';
import { Answer, QuestionServices, ValidationResult } from '../../../entities/question';

export interface CheckUserAnswer {
    execute(
        question: QuizQuestion,
        userAnswer: Answer,
        questionServices: QuestionServices
    ): Promise<ValidationResult>;
}
