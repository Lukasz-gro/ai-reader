import { useReducer, useCallback } from 'react';
import { quizManagementReducer, initialQuizManagementState } from './quiz-management-reducer';
import { QuizManagementAction } from './quiz-management-actions';
import { QuizCreationParams } from '@/contexts/quiz-mode/application/ports/out/QuizApi';
import { QuizViewMode } from './quiz-state';
import { foldResult, AsyncResult } from '@/shared/entities/result';
import { quizController } from '@/contexts/quiz-mode/config/quiz-setup';

function runQuizAction<T>(
    task: () => AsyncResult<T, Error>,
    dispatch: React.Dispatch<QuizManagementAction>,
    onSuccess: (value: T) => QuizManagementAction,
    onError: (error: string) => QuizManagementAction
) {
    task().then(result => 
        foldResult(
            result,
            (value: T) => dispatch(onSuccess(value)),
            (error: Error) => dispatch(onError(error.message))
        )
    );
}

export function useQuizManagement() {
    const [state, dispatch] = useReducer(quizManagementReducer, initialQuizManagementState);

    const actions = {
        setView: useCallback((view: QuizViewMode) => {
            dispatch({ type: 'SET_VIEW', payload: view });
        }, []),

        resetState: useCallback(() => {
            dispatch({ type: 'RESET_QUIZ_MANAGEMENT' });
        }, []),

        fetchQuizzes: useCallback((projId: string) => {
            dispatch({ type: 'FETCH_QUIZZES_START' });
            runQuizAction(
                () => quizController.getQuizzesForProject(projId),
                dispatch,
                (quizzes) => ({ type: 'FETCH_QUIZZES_SUCCESS', payload: quizzes }),
                (error) => ({ type: 'FETCH_QUIZZES_ERROR', payload: error })
            );
        }, []),

        createQuiz: useCallback((params: QuizCreationParams) => {
            dispatch({ type: 'SUBMIT_QUIZ_CREATION', payload: params });
            runQuizAction(
                () => quizController.createNewQuiz(params),
                dispatch,
                (quiz) => ({ type: 'QUIZ_CREATION_SUCCESS', payload: quiz }),
                (error) => ({ type: 'QUIZ_CREATION_ERROR', payload: error })
            );
        }, [])
    };

    return { state, actions };
}
