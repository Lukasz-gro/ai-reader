import { QuizProvider } from '@/contexts/quiz-mode/application/ports/out/quiz-provider';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { CreateQuizFromMaterial } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';
import { OpenAIQuizProvider } from '@/contexts/quiz-mode/infra/llms/open-ai-quiz-provider';
import { Project } from '@/shared/entities/project';
import { CreateQuizFromMaterialUseCase } from '@/contexts/quiz-mode/application/use-cases/create-quiz-from-material';
import { CheckUserAnswer } from '@/contexts/quiz-mode/application/ports/in/check-user-answer';
import { QuizQuestion } from '@/contexts/quiz-mode/entities/quiz-question';
import { Answer, QuestionServices, QuestionValidationResult } from '@/contexts/quiz-mode/entities/question';
import { CheckUserAnswerUseCase } from '@/contexts/quiz-mode/application/use-cases/check-user-answer';
import { MaterialRepo } from '@/shared/application/ports/out/material-repo';
import { JsonMaterialRepo } from '@/shared/infra/uploads/json-materials-repo';
import { OpenAIStructuredProvider } from '@/shared/infra/llms/open-ai-structured-provider';
import { OpenAIQuestionService } from '../../infra/llms/open-ai-question-service';
import { QuizCreationParams } from '../../application/ports/in/create-quiz-from-material';

class QuizModeController {
    constructor(
        private readonly quizProvider: QuizProvider,
        private readonly createQuizFromMaterial: CreateQuizFromMaterial,
        private readonly questionService: QuestionServices,
        private readonly checkUserAnswer: CheckUserAnswer,
        private readonly materialRepo: MaterialRepo
    ) {}

    async onCreateCustomizedQuiz(project: Project, params: QuizCreationParams): Promise<Quiz> {
        return await this.createQuizFromMaterial.execute(
            project, 
            this.quizProvider, 
            this.materialRepo, 
            params
        );
    }

    async onCheckUserAnswer(question: QuizQuestion, userAnswer: Answer): Promise<QuestionValidationResult> {
        return await this.checkUserAnswer.execute(question, userAnswer, this.questionService);
    }
}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) { throw new Error('OPENAI_API_KEY is required'); }
 
const openAIStructuredProvider = new OpenAIStructuredProvider(apiKey);

const quizProvider = new OpenAIQuizProvider(openAIStructuredProvider);

const createQuizFromMaterialUseCase = new CreateQuizFromMaterialUseCase();

const openAIQuestionService = new OpenAIQuestionService(openAIStructuredProvider);

const checkUserAnswerUseCase = new CheckUserAnswerUseCase();

const quizModeController = new QuizModeController(
    quizProvider,
    createQuizFromMaterialUseCase,
    openAIQuestionService,
    checkUserAnswerUseCase,
    new JsonMaterialRepo(),
);

export {
    quizModeController
};
