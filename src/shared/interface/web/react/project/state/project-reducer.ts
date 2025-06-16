import { Action } from './project-actions';
import { ProjectState } from './project-state';

export function projectStateReducer(state: ProjectState, action: Action): ProjectState {
    switch (action.type) {
        case 'FETCH_START':
            return { status: 'loading', loading: true };
        case 'FETCH_SUCCESS':
            return { status: 'success', projects: action.payload, currentId: null };
        case 'FETCH_ERROR':
            return { status: 'error', error: action.payload };
        case 'PROJECT_SELECTED':
            if (state.status !== 'success') {
                throw new Error('Illegal state in SELECT action');
            }
            return { ...state, currentId: action.payload };
        case 'PROJECT_CREATED':
            if (state.status !== 'success') {
                throw new Error('Illegal state in CREATE action');
            }
            return { ...state, projects: [...state.projects, action.payload] };
        default:
            return state;
    }
}
