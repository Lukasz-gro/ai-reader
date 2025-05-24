import { Message, LLMProvider, Role } from '../../application/ports/out/llm-provider';
import { v4 as uuidv4 } from 'uuid';
import { RandomMessage } from '@/shared/infra/mocks/mock-message';

export class MockLLMProvider implements LLMProvider {
    query(conversation: Message[]): Promise<Message> {
        const lastMessage = conversation[conversation.length - 1];
        const newMessage: Message = {
            id: uuidv4(),
            role: Role.ASSISTANT,
            previousId: lastMessage?.id ?? null,
            content: RandomMessage.content(),
        };
        return new Promise(
            resolve => setTimeout(
                ()=> resolve(newMessage),
                300
            )
        );
    }
}
