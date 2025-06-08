'use server';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { Project } from '@/shared/entities/project';
import { quizModeController } from '@/contexts/quiz-mode/interface/controllers/quiz-mode-controller';
import { QuizQuestion } from '@/contexts/quiz-mode/entities/quiz-question';
import { Answer, QuestionValidationResult } from '@/contexts/quiz-mode/entities/question';
import { QuizCreationParams } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';

export async function createCustomizedQuiz(project: Project, params: QuizCreationParams): Promise<Quiz> {
    return await quizModeController.onCreateCustomizedQuiz(project, params);
}

export async function validateUserAnswer(question:QuizQuestion, userAnswer: Answer): Promise<QuestionValidationResult> {
    return await quizModeController.onCheckUserAnswer(question, userAnswer);
}
