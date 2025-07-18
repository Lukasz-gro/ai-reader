import { AsyncResult } from '@/shared/entities/result';

export interface RegisterUser {
    execute(email: string, password: string): AsyncResult<void, Error>;
}
