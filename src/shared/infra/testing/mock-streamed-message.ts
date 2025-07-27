import { MockMessage, RandomMessage } from '@/shared/infra/testing/mock-message';
import { Conversation, Message, Role } from '@/shared/entities/conversation';
import { Random } from '@/shared/infra/testing/random';

export class MockStreamedMessage {
    async *streamMessage(conversation: Conversation): AsyncGenerator<string, void, unknown> {
        const messages = conversation.messages;
        const lastMessage = messages[messages.length - 1];
        const newMessage = new MockMessage()
            .withRole(Role.ASSISTANT)
            .withPreviousId(lastMessage.id)
            .build();

        const content = Array.isArray(newMessage.content) ? newMessage.content.join(' ') : newMessage.content;
        const streamedChunks = this.chunkWords(content);
        for (const chunk of streamedChunks) {
            yield chunk;
            await new Promise(res => setTimeout(res, Random.int(400, 1000)));
        }
    }

    query(conversation: Message[]): Promise<string> {
        void conversation;
        return new Promise(
            resolve => setTimeout(
                ()=> resolve(RandomMessage.content()),
                1000
            )
        );
    }

    chunkWords(text: string, size = 4): string[] {
        const words = text.trim().split(/\s+/);
        const chunks: string[] = [];

        for (let i = 0; i < words.length; i += size) {
            chunks.push(words.slice(i, i + size).join(' ') + ' ');
        }
        return chunks;
    }
}
