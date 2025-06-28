import { User } from '@/shared/entities/user';
import { GetAuthenticatedUser } from '../ports/in/get-authenticated-user';
import { AuthProvider } from '../ports/out/auth-provider';

export class GetAuthenticatedUserUseCase implements GetAuthenticatedUser {
    constructor(private readonly authProvider: AuthProvider) {}

    async execute(): Promise<User | null> {
        return await this.authProvider.getAuthenticatedUser();
    }
} 
