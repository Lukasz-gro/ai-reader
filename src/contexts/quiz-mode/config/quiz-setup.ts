import { httpClient } from '@/shared/infra/http/axios-http-client';
import { HttpQuizApiProvider } from '@/contexts/quiz-mode/infra/http/http-quiz-api-provider';
import { GetProjectQuizzesUseCase } from '@/contexts/quiz-mode/application/use-cases/get-project-quizzes-use-case';
import { GetQuizQuestionsUseCase } from '@/contexts/quiz-mode/application/use-cases/get-quiz-questions-use-case';
import { CreateQuizUseCase } from '@/contexts/quiz-mode/application/use-cases/create-quiz-use-case';
import { ValidateQuizAnswerUseCase } from '@/contexts/quiz-mode/application/use-cases/validate-quiz-answer-use-case';
import { QuizModeController } from '@/contexts/quiz-mode/interface/controllers/quiz-mode-controller';
import { HttpClient } from '@/shared/application/ports/out/http-client';

export const createQuizController = (httpClient: HttpClient): QuizModeController => {
    const quizApiProvider = new HttpQuizApiProvider(httpClient);
    
    const getProjectQuizzesUseCase = new GetProjectQuizzesUseCase(quizApiProvider);
    const getQuizQuestionsUseCase = new GetQuizQuestionsUseCase(quizApiProvider);
    const createQuizUseCase = new CreateQuizUseCase(quizApiProvider);
    const validateQuizAnswerUseCase = new ValidateQuizAnswerUseCase(quizApiProvider);
    
    return new QuizModeController(
        getProjectQuizzesUseCase,
        getQuizQuestionsUseCase,
        createQuizUseCase,
        validateQuizAnswerUseCase
    );
};

export const quizController = createQuizController(httpClient);