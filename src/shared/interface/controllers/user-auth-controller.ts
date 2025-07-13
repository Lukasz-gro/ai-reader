import { User } from '@/shared/entities/user';
import { LoginUser } from '@/shared/application/ports/in/login-user';
import { LogoutUser } from '@/shared/application/ports/in/logout-user';
import { RegisterUser } from '@/shared/application/ports/in/register-user';
import { GetAuthenticatedUser } from '@/shared/application/ports/in/get-authenticated-user';

export class UserAuthController {
    constructor(
        private readonly loginUser: LoginUser,
        private readonly logoutUser: LogoutUser,
        private readonly registerUser: RegisterUser,
        private readonly getAuthenticatedUser: GetAuthenticatedUser
    ) {}

    async login(email: string, password: string): Promise<User> {
        return await this.loginUser.execute(email, password);
    }

    async logout(): Promise<void> {
        await this.logoutUser.execute();
    }

    async register(email: string, password: string): Promise<void> {
        await this.registerUser.execute(email, password);
    }

    async getCurrentUser(): Promise<User | null> {
        return await this.getAuthenticatedUser.execute();
    }
}

