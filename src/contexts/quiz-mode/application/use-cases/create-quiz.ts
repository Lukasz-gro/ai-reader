import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { CreateQuiz } from '@/contexts/quiz-mode/application/ports/in/create-quiz';
import { QuizCreationParams } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';
import { QuizApi } from '@/contexts/quiz-mode/application/ports/out/quiz-api';

export class CreateQuizUseCase implements CreateQuiz {
    constructor(private readonly quizApi: QuizApi) {}

    async execute(projectTitle: string, materialIds: string[], params: QuizCreationParams): Promise<Quiz> {
        return this.quizApi.createQuiz({
            projectTitle,
            materialIds,
            params,
        });
    }
} 