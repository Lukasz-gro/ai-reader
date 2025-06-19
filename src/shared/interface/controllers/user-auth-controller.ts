import { User } from "@/shared/entities/user";

export class UserAuthController {
    async login(email: string, password: string): Promise<User> {
        return {
            userId: '1',
            email,
            password,
        };
    }
}

