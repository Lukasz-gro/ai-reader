import { HttpClient } from '@/shared/application/ports/out/http-client';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { QuizApi } from '@/contexts/quiz-mode/application/ports/out/quiz-api';
import { QuizQuestion } from '@/contexts/quiz-mode/entities/quiz-question';
import { Answer, QuestionValidationResult } from '@/contexts/quiz-mode/entities/question';

export class HttpQuizApi implements QuizApi {
    constructor(
        private readonly httpClient: HttpClient,
    ) { }

    async getQuiz(id: string): Promise<Quiz> {
        const response = await this.httpClient.get<Quiz>(`/quiz/${id}`);
        return response.data;
    }

    async checkAnswer(question: QuizQuestion, answer: Answer): Promise<QuestionValidationResult> {
        const response = await this.httpClient.post<QuestionValidationResult>(`/quiz/check-answer`, { question, answer });
        return response.data;
    }
} 