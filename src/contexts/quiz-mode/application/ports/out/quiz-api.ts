import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { QuizQuestion } from '@/contexts/quiz-mode/entities/quiz-question';
import { Answer, QuestionValidationResult } from '@/contexts/quiz-mode/entities/question';


export interface QuizApi {
    getQuiz(id: string): Promise<Quiz>;
    checkAnswer(question: QuizQuestion, answer: Answer): Promise<QuestionValidationResult>;
} 