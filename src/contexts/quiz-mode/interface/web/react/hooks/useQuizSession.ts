import { useReducer, useCallback } from 'react';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { Answer, QuestionValidationResult } from '@/contexts/quiz-mode/entities/question';
import { quizApi } from '@/contexts/quiz-mode/infra';
import { QuizQuestion } from '@/contexts/quiz-mode/entities/quiz-question';

type QuizSessionState = {
    quiz: Quiz | null;
    currentQuestionIndex: number;
    userAnswers: Record<string, QuestionValidationResult>;
    isLoading: boolean;
    error: Error | null;
};

type QuizSessionAction =
    | { type: 'START_QUIZ'; payload: Quiz }
    | { type: 'ANSWER_QUESTION'; payload: { questionId: string; result: QuestionValidationResult } }
    | { type: 'NEXT_QUESTION' }
    | { type: 'RESET' };

const initialState: QuizSessionState = {
    quiz: null,
    currentQuestionIndex: 0,
    userAnswers: {},
    isLoading: false,
    error: null,
};

const quizSessionReducer = (state: QuizSessionState, action: QuizSessionAction): QuizSessionState => {
    switch (action.type) {
        case 'START_QUIZ':
            return { ...initialState, quiz: action.payload };
        case 'ANSWER_QUESTION':
            return {
                ...state,
                userAnswers: { ...state.userAnswers, [action.payload.questionId]: action.payload.result },
            };
        case 'NEXT_QUESTION':
            return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

export const useQuizSession = () => {
    const [state, dispatch] = useReducer(quizSessionReducer, initialState);

    const startQuiz = useCallback(async (quizId: string) => {
        try {
            const quiz = await quizApi.getQuiz(quizId);
            dispatch({ type: 'START_QUIZ', payload: quiz });
        } catch (err) {
            // Handle error state appropriately
        }
    }, []);

    const answerQuestion = useCallback(async (question: QuizQuestion, answer: Answer) => {
        try {
            const result = await quizApi.checkAnswer(question, answer);
            dispatch({ type: 'ANSWER_QUESTION', payload: { questionId: question.id, result } });
        } catch (err) {
            // Handle error state
        }
    }, []);

    const nextQuestion = useCallback(() => {
        if (state.quiz && state.currentQuestionIndex < state.quiz.questions.length - 1) {
            dispatch({ type: 'NEXT_QUESTION' });
        }
    }, [state.quiz, state.currentQuestionIndex]);

    const resetSession = useCallback(() => {
        dispatch({ type: 'RESET' });
    }, []);

    return {
        state,
        startQuiz,
        answerQuestion,
        nextQuestion,
        resetSession,
        currentQuestion: state.quiz?.questions[state.currentQuestionIndex],
        isQuizCompleted: state.quiz ? state.currentQuestionIndex >= state.quiz.questions.length : false,
    };
}; 