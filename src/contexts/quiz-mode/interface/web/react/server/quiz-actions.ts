'use server'
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { Project } from '@/shared/entities/project';
import { quizModeController } from '../../../controllers/quiz-mode-controller';

export async function createNewQuiz(project: Project): Promise<Quiz> {
    return await quizModeController.onCreateNewQuiz(project);
}
