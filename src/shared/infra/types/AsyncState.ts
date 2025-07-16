interface SuccessState<T> {
    status: 'success';
    data: T;
}

interface LoadingState {
    status: 'loading';
    loading: true;
}

interface ErrorState<E> {
    status: 'error';
    error: E;
}

export type AsyncState<T, E = Error> = SuccessState<T> | LoadingState | ErrorState<E>;
