import { User } from '@/shared/entities/user';
import { AsyncState } from '@/shared/infra/types/AsyncState';

export type AuthSuccessSource = 'login' | 'register' | 'refresh' | 'logout';

interface UserData {
    user: User | null;
    source: AuthSuccessSource;
}

export type AuthState = AsyncState<UserData, string>;
