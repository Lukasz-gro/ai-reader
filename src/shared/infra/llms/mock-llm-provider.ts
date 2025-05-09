import { LLMMessage, LLMProvider, LLMRole } from "../../application/ports/out/llm-provider";

export class MockLLMProvider implements LLMProvider {
    query(conversation: LLMMessage[]): Promise<LLMMessage> {
        const newMessage: LLMMessage = {
            id: 'some-id',
            role: LLMRole.ASSISTANT,
            previousId: conversation[-1]?.id ?? null,
            content: 'Hello World',
        }
        return Promise.resolve(newMessage)
    }
}