import { Project } from '@/shared/entities/project';
import { Quiz } from '../../entities/quiz';
import { CreateQuizFromMaterial } from '../ports/in/create-quiz-from-material';
import { QuizProvider } from '../ports/out/quiz-provider';

export class CreateQuizFromMaterialUseCase implements CreateQuizFromMaterial {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    execute(project: Project, quizProvider: QuizProvider): Promise<Quiz> {
        throw new Error('Method not implemented.');
    }
}
