import { QuizPreview } from '@/shared/entities/quiz-preview';
import { QuizCreationParams } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';

export interface CreateQuizForProject {
    execute(projectId: string, params: QuizCreationParams): Promise<QuizPreview>;
} 