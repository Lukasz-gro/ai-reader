import { Conversation } from '@/shared/entities/conversation';
import { LLMProvider } from '@/shared/application/ports/out/llm-provider';

export interface AddUserMessageToChat {
    execute(
        conversation: Conversation,
        message: string
    ): Promise<Conversation>;
}
