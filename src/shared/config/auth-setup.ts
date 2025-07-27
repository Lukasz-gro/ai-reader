import { httpClient } from '@/shared/infra/http/fetch-http-client';
import { HttpCookieAuthProvider } from '@/shared/infra/auth/http-cookie-auth-provider';
import { LoginUserUseCase } from '@/shared/application/use-cases/login-user';
import { LogoutUserUseCase } from '@/shared/application/use-cases/logout-user';
import { RegisterUserUseCase } from '@/shared/application/use-cases/register-user';
import { GetAuthenticatedUserUseCase } from '@/shared/application/use-cases/get-authenticated-user';
import { UserAuthController } from '@/shared/interface/controllers/user-auth-controller';
import { HttpClient } from '@/shared/application/ports/out/http-client';

export const createAuthController = (httpClient: HttpClient): UserAuthController => {
    const authProvider = new HttpCookieAuthProvider(httpClient);
    
    const loginUserUseCase = new LoginUserUseCase(authProvider);
    const logoutUserUseCase = new LogoutUserUseCase(authProvider);
    const registerUserUseCase = new RegisterUserUseCase(authProvider);
    const getAuthenticatedUserUseCase = new GetAuthenticatedUserUseCase(authProvider);
    
    return new UserAuthController(
        loginUserUseCase,
        logoutUserUseCase,
        registerUserUseCase,
        getAuthenticatedUserUseCase
    );
};

export const authController = createAuthController(httpClient);
