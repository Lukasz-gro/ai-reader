import { GetProjectQuizzes } from '@/contexts/quiz-mode/application/ports/in/get-project-quizzes';
import { GetQuizQuestions } from '@/contexts/quiz-mode/application/ports/in/get-quiz-questions';
import { CreateQuiz } from '@/contexts/quiz-mode/application/ports/in/create-quiz';
import { ValidateQuizAnswer } from '@/contexts/quiz-mode/application/ports/in/validate-quiz-answer';
import { QuizDescription } from '@/contexts/quiz-mode/entities/quiz';
import { GetQuizQuestionsResponse, QuizCreationParams } from '@/contexts/quiz-mode/application/ports/out/QuizApi';
import { QuestionValidationResult, Answer } from '@/contexts/quiz-mode/entities/question';
import { AsyncResult } from '@/shared/entities/result';

export class QuizModeController {
    constructor(
        private readonly getProjectQuizzes: GetProjectQuizzes,
        private readonly getQuizQuestions: GetQuizQuestions,
        private readonly createQuiz: CreateQuiz,
        private readonly validateQuizAnswer: ValidateQuizAnswer
    ) {}

    async getQuizzesForProject(projectId: string): AsyncResult<QuizDescription[], Error> {
        return this.getProjectQuizzes.execute(projectId);
    }

    async getQuestionsForQuiz(quizId: string): AsyncResult<GetQuizQuestionsResponse, Error> {
        return this.getQuizQuestions.execute(quizId);
    }

    async createNewQuiz(params: QuizCreationParams): AsyncResult<QuizDescription, Error> {
        return this.createQuiz.execute(params);
    }

    async validateAnswer(questionId: string, answer: Answer): AsyncResult<QuestionValidationResult, Error> {
        return this.validateQuizAnswer.execute(questionId, answer);
    }
}
