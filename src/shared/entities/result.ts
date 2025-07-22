export type ResultOk<T> = { ok: true; value: T }
export type ResultError<E> = { ok: false; error: E }

export type Result<T, E> = ResultOk<T> | ResultError<E>;

export function ok<T>(value: T): Result<T, never> {
    return { ok: true, value: value };
}

export function nok<E>(error: E): Result<never, E> {
    return { ok: false, error: error };
}

export function isOk<T, E>(res: Result<T, E>): res is ResultOk<T> {
    return res.ok;
}

export function isNok<T, E>(res: Result<T, E>): res is ResultError<E> {
    return !res.ok;
}

export type AsyncResult<T, E> = Promise<Result<T, E>>;

export function foldResult<T, E, R> (
    r: Result<T, E>,
    onOk:  (v: T) => R,
    onErr: (e: E) => R
): R {
    return isOk(r) ? onOk(r.value) : onErr(r.error);
}

export async function tryResult<T>(thunk: () => Promise<T>): AsyncResult<T, Error> {
    try {
        const value = await thunk();
        return ok(value);
    } catch (e) {
        return nok(e instanceof Error ? e : new Error(JSON.stringify(e)));
    }
}
