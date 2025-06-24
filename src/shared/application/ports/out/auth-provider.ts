import { User } from "@/shared/entities/user";

export interface AuthProvider {
    getAuthenticatedUser(): Promise<User | null>;
    login(email: string, password: string): Promise<User>;
    logout(): Promise<void>;
}
