import { User } from '@/shared/entities/user';
import { GetAuthenticatedUser } from '../ports/in/get-authenticated-user';
import { AuthProvider } from '../ports/out/auth-provider';
import { AsyncResult } from '@/shared/entities/result';

export class GetAuthenticatedUserUseCase implements GetAuthenticatedUser {
    constructor(private readonly authProvider: AuthProvider) {}

    execute(): AsyncResult<User | null, Error> {
        return this.authProvider.getAuthenticatedUser();
    }
} 
