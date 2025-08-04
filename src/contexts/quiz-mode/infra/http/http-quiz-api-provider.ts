import { HttpClient } from '@/shared/application/ports/out/http-client';
import { 
    QuizApi, 
    QuizCreationParams, 
    GetQuizQuestionsResponse 
} from '@/contexts/quiz-mode/application/ports/out/QuizApi';
import { QuizDescription } from '@/contexts/quiz-mode/entities/quiz';
import { QuestionValidationResult, Answer } from '@/contexts/quiz-mode/entities/question';
import { AsyncResult, tryResult } from '@/shared/entities/result';

export class HttpQuizApiProvider implements QuizApi {
    constructor(private readonly httpClient: HttpClient) {}

    async getQuizzes(projId: string): AsyncResult<QuizDescription[], Error> {
        return tryResult(async () => {
            const response = await this.httpClient.get<QuizDescription[]>(`/quiz/${projId}`);
            return response.data;
        });
    }

    async getQuizQuestions(quizId: string): AsyncResult<GetQuizQuestionsResponse, Error> {
        return tryResult(async () => {
            const response = await this.httpClient.get<GetQuizQuestionsResponse>(`/quiz/${quizId}/questions`);
            return response.data;
        });
    }

    async createQuiz(params: QuizCreationParams): AsyncResult<QuizDescription, Error> {
        return tryResult(async () => {
            const response = await this.httpClient.post<{ quiz: QuizDescription }>('/quiz', params);
            return response.data.quiz;
        });
    }

    async validateAnswer(questionId: string, answer: Answer): AsyncResult<QuestionValidationResult, Error> {
        return tryResult(async () => {
            const response = await this.httpClient.post<QuestionValidationResult>(
                `/quiz/questions/${questionId}/validate-answer`, 
                answer
            );
            return response.data;
        });
    }
}
