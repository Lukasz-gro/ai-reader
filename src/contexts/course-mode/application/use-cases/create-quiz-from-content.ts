import { Quiz } from '../../entities/quiz';
import { CreateQuizFromContent } from '../ports/in/create-quiz-from-content';
import { QuizProvider } from '../ports/out/quiz-provider';

export class CreateQuizFromContentUseCase implements CreateQuizFromContent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    execute(content: string, quizProvider: QuizProvider): Promise<Quiz> {
        throw new Error('Method not implemented.');
    }
}
