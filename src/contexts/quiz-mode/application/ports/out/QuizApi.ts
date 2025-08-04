import { QuestionValidationResult, Answer } from "@/contexts/quiz-mode/entities/question";
import { QuizDescription } from "@/contexts/quiz-mode/entities/quiz";
import { QuizQuestion } from "@/contexts/quiz-mode/entities/quiz-question";
import { AsyncResult } from "@/shared/entities/result";

export interface QuizCreationParams {
    projId: string;
    userId: string;
    name: string;
    numberOfQuestions: number;
    difficulty: 'beginner' | 'intermediate' | 'expert';
    includeMultipleChoice: boolean;
    includeOpenEnded: boolean;
    extractionPrompt?: string;
    additionalContext?: Record<string, unknown>;
}

export interface GetQuizQuestionsResponse {
    questions: QuizQuestion[];
}

export interface QuizApi {
    getQuizzes(projId: string): AsyncResult<QuizDescription[], Error>;
    
    getQuizQuestions(quizId: string): AsyncResult<GetQuizQuestionsResponse, Error>;
    
    createQuiz(params: QuizCreationParams): AsyncResult<QuizDescription, Error>;
    
    validateAnswer(questionId: string, answer: Answer): AsyncResult<QuestionValidationResult, Error>;
}
