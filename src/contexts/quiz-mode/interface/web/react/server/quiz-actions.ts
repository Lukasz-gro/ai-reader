'use server'
import { Project } from '@/shared/entities/project';
import { quizModeController } from '../../../controllers/quiz-mode-controller';
import { QuizSerializer, SerializedQuiz } from '@/contexts/quiz-mode/infra/serialization/quiz-serializer';

export async function createNewQuiz(project: Project): Promise<SerializedQuiz> {
    const quiz = await quizModeController.onCreateNewQuiz(project);
    return QuizSerializer.toJSON(quiz);
}
