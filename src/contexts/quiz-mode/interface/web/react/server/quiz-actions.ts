'use server';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { Project } from '@/shared/entities/project';
import { quizModeController } from '@/contexts/quiz-mode/interface/controllers/quiz-mode-controller';
import { QuizQuestion } from '@/contexts/quiz-mode/entities/quiz-question';
import { Answer, QuestionValidationResult } from '@/contexts/quiz-mode/entities/question';

export async function createNewQuiz(project: Project): Promise<Quiz> {
    return await quizModeController.onCreateNewQuiz(project);
}

export async function validateUserAnswer(question:QuizQuestion, userAnswer: Answer): Promise<QuestionValidationResult> {
    const xd = await quizModeController.onCheckUserAnswer(question, userAnswer);
    console.log(xd);
    return xd;
}
