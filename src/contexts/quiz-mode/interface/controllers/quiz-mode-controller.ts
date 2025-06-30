import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { QuizCreationParams } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';
import { Project } from '@/shared/entities/project';
import { QuizGenerator, QuizGenerationRequest } from '@/contexts/quiz-mode/application/ports/out/quiz-generator';
import { QuizApiService } from '@/contexts/quiz-mode/infra/http/quiz-api-service';
import { CheckUserAnswer } from '@/contexts/quiz-mode/application/ports/in/check-user-answer';
import { QuizQuestion } from '@/contexts/quiz-mode/entities/quiz-question';
import { Answer, QuestionServices, QuestionValidationResult } from '@/contexts/quiz-mode/entities/question';
import { CheckUserAnswerUseCase } from '@/contexts/quiz-mode/application/use-cases/check-user-answer';
import { AxiosHttpClient } from '@/shared/infra/http/axios-http-client';

class QuizModeController {
    constructor(
        private readonly quizGenerator: QuizGenerator,
        private readonly questionService: QuestionServices,
        private readonly checkUserAnswer: CheckUserAnswer
    ) {}

    async onCreateCustomizedQuiz(project: Project, params: QuizCreationParams): Promise<Quiz> {
        const request: QuizGenerationRequest = {
            projectTitle: project.title,
            materialIds: project.materials.map(material => material.id),
            params
        };
        
        return await this.quizGenerator.generateQuiz(request);
    }

    async onCheckUserAnswer(question: QuizQuestion, userAnswer: Answer): Promise<QuestionValidationResult> {
        return await this.checkUserAnswer.execute(question, userAnswer, this.questionService);
    }
}

class MockQuestionService implements QuestionServices {
    async validate(): Promise<QuestionValidationResult> {
        return { ok: true };
    }
}

const httpClient = new AxiosHttpClient();
const quizApiService = new QuizApiService(httpClient);
const checkUserAnswerUseCase = new CheckUserAnswerUseCase();
const mockQuestionService = new MockQuestionService();

const quizModeController = new QuizModeController(
    quizApiService,
    mockQuestionService,
    checkUserAnswerUseCase
);

export {
    quizModeController
};
