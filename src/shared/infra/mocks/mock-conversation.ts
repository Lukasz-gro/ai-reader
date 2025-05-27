import { v4 as uuidv4 } from 'uuid';
import { Message } from '@/shared/application/ports/out/llm-provider';
import { Random } from '@/shared/infra/mocks/random';
import { RandomMessage } from '@/shared/infra/mocks/mock-message';
import { Conversation, Mode } from '@/shared/entities/conversation';

export class MockConversation {
    private id: string | null = null;
    private messages: Message[] | null = null;
    private mode: Mode | null = null;

    withId(id: string) {
        this.id = id;
        return this;
    }
    withMessages(messages: Message[]) {
        this.messages = messages;
        return this;
    }
    withMode(mode: Mode) {
        this.mode = mode;
        return this;
    }

    build(): Conversation {
        return {
            id: this.id ?? RandomConversation.id(),
            messages: this.messages ?? RandomConversation.messages(),
            mode: this.mode ?? RandomConversation.mode(),
        };
    }
}

export class RandomConversation {
    static id(): string {
        return uuidv4();
    }

    static messages(): Message[] {
        const count = Random.int();
        return RandomMessage.generateSequence(count);
    }

    static mode(): Mode {
        return Random.pick(['course', 'explain', 'quiz']);
    }
}
