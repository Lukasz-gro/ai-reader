import { HttpQuizApi } from './http-quiz-api';
import { httpClient } from '@/shared/infra/http/axios-http-client';

export const quizApi = new HttpQuizApi(httpClient); 
