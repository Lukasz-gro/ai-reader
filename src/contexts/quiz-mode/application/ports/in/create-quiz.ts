import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { QuizCreationParams } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';

export interface CreateQuiz {
    execute(projectTitle: string, materialIds: string[], params: QuizCreationParams): Promise<Quiz>;
} 