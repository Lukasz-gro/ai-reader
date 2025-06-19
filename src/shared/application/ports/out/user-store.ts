import { User } from "@/shared/entities/user";

export type AuthStore = {
  getAuthenticatedUser(): User | null;
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
};
