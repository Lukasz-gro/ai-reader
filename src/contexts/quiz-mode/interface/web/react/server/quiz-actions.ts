'use server';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { Project } from '@/shared/entities/project';
import { quizModeController } from '@/contexts/quiz-mode/interface/controllers/quiz-mode-controller';
import { QuizQuestion } from '@/contexts/quiz-mode/entities/quiz-question';
import { Answer, ValidationResult } from '@/contexts/quiz-mode/entities/question';

export async function createNewQuiz(project: Project): Promise<Quiz> {
    return await quizModeController.onCreateNewQuiz(project);
}

export async function validateUserAnswer(question:QuizQuestion, userAnswer: Answer): Promise<ValidationResult> {
    return await quizModeController.onCheckUserAnswer(question, userAnswer);
}
