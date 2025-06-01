import { QuizProvider } from "@/contexts/quiz-mode/application/ports/out/quiz-provider";
import { Quiz } from "@/contexts/quiz-mode/entities/quiz";
import { CreateQuizFromMaterial } from "@/contexts/quiz-mode/application/ports/in/create-quiz-from-material";
import { OpenAIQuizProvider } from "@/contexts/quiz-mode/infra/llms/OpenAIQuizProvider";
import { Project } from "@/shared/entities/project";
import { CreateQuizFromMaterialUseCase } from "@/contexts/quiz-mode/application/use-cases/create-quiz-from-material";

class QuizModeController {
    constructor(
        private readonly quizProvider: QuizProvider,
        private readonly createQuizFromMaterial: CreateQuizFromMaterial
    ) {}

    async onCreateNewQuiz(project: Project): Promise<Quiz> {
        return await this.createQuizFromMaterial.execute(project, this.quizProvider);
    }
}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) { throw new Error('OPENAI_API_KEY is required'); }
const quizProvider = new OpenAIQuizProvider(apiKey);

const createQuizFromMaterialUseCase = new CreateQuizFromMaterialUseCase();

const quizModeController = new QuizModeController(
    quizProvider,
    createQuizFromMaterialUseCase
);

export {
    quizModeController
};
