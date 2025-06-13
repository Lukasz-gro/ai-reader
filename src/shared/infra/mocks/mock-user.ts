import { v4 as uuidv4 } from 'uuid';
import { User, UserRole } from '@/shared/entities/user';
import { Random } from '@/shared/infra/mocks/random';

export class MockUser {
    private id: string | null = null;
    private username: string | null = null;
    private email: string | null = null;
    private passwordHash: string | null = null;
    private roles: UserRole[] | null = null;
    private createdAt: Date | null = null;

    withId(id: string) {
        this.id = id;
        return this;
    }

    withUsername(username: string) {
        this.username = username;
        return this;
    }

    withEmail(email: string) {
        this.email = email;
        return this;
    }

    withPasswordHash(passwordHash: string) {
        this.passwordHash = passwordHash;
        return this;
    }

    withRoles(roles: UserRole[]) {
        this.roles = roles;
        return this;
    }

    withCreatedAt(createdAt: Date) {
        this.createdAt = createdAt;
        return this;
    }

    build(): User {
        return {
            id: this.id ?? RandomUser.id(),
            username: this.username ?? RandomUser.username(),
            email: this.email ?? RandomUser.email(),
            passwordHash: this.passwordHash ?? RandomUser.passwordHash(),
            roles: this.roles ?? RandomUser.roles(),
            createdAt: this.createdAt ?? RandomUser.createdAt(),
        };
    }
}

export class RandomUser {
    static id(): string {
        return uuidv4();
    }

    static username(): string {
        const usernames = ['testuser', 'alice', 'bob', 'charlie', 'diana', 'eve'];
        return Random.pick(usernames);
    }

    static email(): string {
        const domains = ['example.com', 'test.org', 'demo.net'];
        const username = this.username().toLowerCase();
        const domain = Random.pick(domains);
        return `${username}@${domain}`;
    }

    static passwordHash(): string {
        return `hashed_${Random.pick(['password123', 'secret456', 'admin789'])}`;
    }

    static roles(): UserRole[] {
        return Random.pick([
            [UserRole.USER],
            [UserRole.ADMIN],
            [UserRole.USER, UserRole.ADMIN]
        ]);
    }

    static createdAt(): Date {
        const now = new Date();
        const daysAgo = Random.int(1, 365);
        return new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
    }
} 
