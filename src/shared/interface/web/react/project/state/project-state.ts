import { ProjectPreview } from '@/shared/entities/project';

interface SuccessState {
    status: 'success';
    projects: ProjectPreview[];
    currentId: string | null;
}

interface LoadingState {
    status: 'loading';
    loading: true;
}

interface ErrorState {
    status: 'error';
    error: string;
}

export type ProjectState = SuccessState | LoadingState | ErrorState;
