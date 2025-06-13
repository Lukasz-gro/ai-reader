import { UserRepo } from '@/shared/application/ports/out/user-repo';
import { User } from '@/shared/entities/user';

export class InMemoryUserRepo implements UserRepo {
    private users: User[] = [];

    async findById(id: string): Promise<User | null> {
        const user = this.users.find(u => u.id === id);
        return user || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.users.find(u => u.email === email);
        return user || null;
    }

    async upsert(user: User): Promise<User> {
        const existingIndex = this.users.findIndex(u => u.id === user.id);
        
        if (existingIndex !== -1) {
            this.users[existingIndex] = user;
        } else {
            this.users.push(user);
        }
        
        return user;
    }
} 
