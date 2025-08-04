import { QuizManagementAction } from './quiz-management-actions';
import { QuizManagementState } from './quiz-state';

export const initialQuizManagementState: QuizManagementState = {
    currentView: 'list',
    quizzes: { status: 'loading', loading: true }
};

export function quizManagementReducer(state: QuizManagementState, action: QuizManagementAction): QuizManagementState {
    switch (action.type) {
        case 'SET_VIEW':
            return {
                ...state,
                currentView: action.payload
            };

        case 'FETCH_QUIZZES_START':
            return {
                ...state,
                quizzes: { status: 'loading', loading: true }
            };

        case 'FETCH_QUIZZES_SUCCESS':
            return {
                ...state,
                quizzes: { status: 'success', data: action.payload }
            };

        case 'FETCH_QUIZZES_ERROR':
            return {
                ...state,
                quizzes: { status: 'error', error: action.payload }
            };

        case 'SUBMIT_QUIZ_CREATION':
            return {
                ...state,
                currentView: 'creating'
            };

        case 'QUIZ_CREATION_SUCCESS': {
            const newQuizzes = state.quizzes.status === 'success' 
                ? [...state.quizzes.data, action.payload]
                : [action.payload];
                
            return {
                ...state,
                currentView: 'list',
                quizzes: { status: 'success', data: newQuizzes }
            };
        }

        case 'QUIZ_CREATION_ERROR':
            return {
                ...state,
                currentView: 'creation'
            };

        case 'RESET_QUIZ_MANAGEMENT':
            return initialQuizManagementState;

        default:
            return state;
    }
}
