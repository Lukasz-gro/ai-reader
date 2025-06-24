import { User } from "@/shared/entities/user";

export interface GetAuthenticatedUser {
    execute(): User | null;
} 