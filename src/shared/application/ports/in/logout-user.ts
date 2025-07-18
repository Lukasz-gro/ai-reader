import { AsyncResult } from '@/shared/entities/result';

export interface LogoutUser {
    execute(): AsyncResult<void, Error>;
} 
