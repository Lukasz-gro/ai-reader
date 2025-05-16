import { Conversation } from '@/shared/entities/conversation';

export interface AddUserMessageToChat {
    execute(
        conversation: Conversation,
        message: string
    ): Promise<Conversation>;
}
