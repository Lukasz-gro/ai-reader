import { User } from '@/shared/entities/user';
import { AuthSuccessSource } from './auth-state';
import { AsyncResult, foldResult } from '@/shared/entities/result';
import React from 'react';

export type AuthAction =
  | { type: 'REQUEST' }
  | { type: 'SUCCESS'; payload: User | null, source: AuthSuccessSource }
  | { type: 'FAILED'; payload: string }

export function runAuthAction<T> (
    task: () => AsyncResult<T, Error>,
    dispatch: React.Dispatch<AuthAction>,
    source: AuthSuccessSource,
    mapValue: (v: T) => User | null          // lets you shape the payload
) {
    dispatch({ type: 'REQUEST' });
    task().then(res =>
        foldResult(
            res,
            v => dispatch({ type: 'SUCCESS', payload: mapValue(v), source }),
            e => dispatch({ type: 'FAILED',  payload: e.message })
        )
    );
}
