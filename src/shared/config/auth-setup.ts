import { AxiosHttpClient } from '@/shared/infra/http/axios-http-client';
import { HttpCookieAuthProvider } from '@/shared/infra/auth/http-cookie-auth-provider';
import { LoginUserUseCase } from '@/shared/application/use-cases/login-user';
import { LogoutUserUseCase } from '@/shared/application/use-cases/logout-user';
import { GetAuthenticatedUserUseCase } from '@/shared/application/use-cases/get-authenticated-user';
import { UserAuthController } from '@/shared/interface/controllers/user-auth-controller';

export const createAuthController = (): UserAuthController => {
    const httpClient = new AxiosHttpClient();
    const authProvider = new HttpCookieAuthProvider(httpClient);
    
    const loginUserUseCase = new LoginUserUseCase(authProvider);
    const logoutUserUseCase = new LogoutUserUseCase(authProvider);
    const getAuthenticatedUserUseCase = new GetAuthenticatedUserUseCase(authProvider);
    
    return new UserAuthController(
        loginUserUseCase,
        logoutUserUseCase,
        getAuthenticatedUserUseCase
    );
};

export const authController = createAuthController(); 