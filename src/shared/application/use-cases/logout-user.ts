import { AsyncResult } from '@/shared/entities/result';
import { LogoutUser } from '../ports/in/logout-user';
import { AuthProvider } from '../ports/out/auth-provider';

export class LogoutUserUseCase implements LogoutUser {
    constructor(private readonly authProvider: AuthProvider) {}

    async execute(): AsyncResult<void, Error> {
        return this.authProvider.logout();
    }
} 
