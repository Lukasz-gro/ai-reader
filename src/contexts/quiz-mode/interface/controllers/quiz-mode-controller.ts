import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { QuizCreationParams } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';
import { CheckUserAnswer } from '@/contexts/quiz-mode/application/ports/in/check-user-answer';
import { QuizQuestion } from '@/contexts/quiz-mode/entities/quiz-question';
import { Answer, QuestionServices, QuestionValidationResult } from '@/contexts/quiz-mode/entities/question';
import { CheckUserAnswerUseCase } from '@/contexts/quiz-mode/application/use-cases/check-user-answer';
import { CreateQuizUseCase } from '@/contexts/quiz-mode/application/use-cases/create-quiz';
import { HttpQuizApi } from '@/contexts/quiz-mode/infra/http-quiz-api';
import { httpClient } from '@/shared/infra/http/axios-http-client';
import { CreateQuiz } from '@/contexts/quiz-mode/application/ports/in/create-quiz';

class QuizController {
    constructor(
        private readonly createQuizUseCase: CreateQuiz,
        private readonly checkUserAnswer: CheckUserAnswer,
    ) {}

    async createQuiz(projectTitle: string, materialIds: string[], params: QuizCreationParams): Promise<Quiz> {
        return await this.createQuizUseCase.execute(projectTitle, materialIds, params);
    }

    async onCheckUserAnswer(question: QuizQuestion, userAnswer: Answer): Promise<QuestionValidationResult> {
        // @ts-expect-error - questionService is not available
        return await this.checkUserAnswer.execute(question, userAnswer, null);
    }
}
 
const checkUserAnswerUseCase = new CheckUserAnswerUseCase();
const quizApi = new HttpQuizApi(httpClient);
const createQuizUseCase = new CreateQuizUseCase(quizApi);

export const quizController = new QuizController(
    createQuizUseCase,
    checkUserAnswerUseCase,
);
