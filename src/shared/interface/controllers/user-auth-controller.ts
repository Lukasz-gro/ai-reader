import { User } from '@/shared/entities/user';
import { LoginUser } from '@/shared/application/ports/in/login-user';
import { LogoutUser } from '@/shared/application/ports/in/logout-user';
import { RegisterUser } from '@/shared/application/ports/in/register-user';
import { GetAuthenticatedUser } from '@/shared/application/ports/in/get-authenticated-user';
import { AsyncResult } from '@/shared/entities/result';

export class UserAuthController {
    constructor(
        private readonly loginUser: LoginUser,
        private readonly logoutUser: LogoutUser,
        private readonly registerUser: RegisterUser,
        private readonly getAuthenticatedUser: GetAuthenticatedUser
    ) {}

    async login(email: string, password: string): AsyncResult<User, Error> {
        return this.loginUser.execute(email, password);
    }

    async logout(): AsyncResult<void, Error> {
        return this.logoutUser.execute();
    }

    async register(email: string, password: string): AsyncResult<void, Error> {
        return this.registerUser.execute(email, password);
    }

    async getCurrentUser(): AsyncResult<User | null, Error> {
        return this.getAuthenticatedUser.execute();
    }
}
