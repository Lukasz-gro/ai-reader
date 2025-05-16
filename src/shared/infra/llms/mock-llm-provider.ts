import { Message, LLMProvider, Role } from '../../application/ports/out/llm-provider';

export class MockLLMProvider implements LLMProvider {
    query(conversation: Message[]): Promise<Message> {
        const newMessage: Message = {
            id: 'some-id',
            role: Role.ASSISTANT,
            previousId: conversation[-1]?.id ?? null,
            content: 'Hello World',
        };
        return Promise.resolve(newMessage);
    }
}