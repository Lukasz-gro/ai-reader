import { Conversation } from '@/shared/entities/conversation';
import { Role } from '@/shared/application/ports/out/llm-provider';

export interface AddMessageToChat {
    execute(
        conversation: Conversation,
        message: string,
        role: Role,
        id?: string,
    ): Promise<Conversation>;
}
