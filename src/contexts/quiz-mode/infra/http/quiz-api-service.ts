import { Quiz } from '../../entities/quiz';
import { HttpClient } from '@/shared/application/ports/out/http-client';
import { QuizGenerator, QuizGenerationRequest } from '../../application/ports/out/quiz-generator';

export class QuizApiService implements QuizGenerator {
    constructor(private readonly httpClient: HttpClient) {}

    async generateQuiz(request: QuizGenerationRequest): Promise<Quiz> {
        try {
            const response = await this.httpClient.post<Quiz>('/api/quiz/create', request);
            return response.data;
        } catch (error) {
            console.error('Error generating quiz from backend:', error);
            throw new Error('Failed to generate quiz from backend');
        }
    }
} 