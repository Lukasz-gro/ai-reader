import { HttpClient } from '@/shared/application/ports/out/http-client';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { CreateQuizApiParams, QuizApi } from '@/contexts/quiz-mode/application/ports/out/quiz-api';

export class HttpQuizApi implements QuizApi {
    constructor(
        private readonly httpClient: HttpClient,
    ) { }

    async createQuiz(data: CreateQuizApiParams): Promise<Quiz> {
        const response = await this.httpClient.post<Quiz>('/quiz/create', data);
        return response.data;
    }
} 