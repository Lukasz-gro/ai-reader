import { IdProvider } from '@/shared/application/ports/out/id-provider';
import { Conversation } from '@/shared/entities/conversation';

export interface AddUserMessageToChat {
    execute(
        conversation: Conversation,
        idProvider: IdProvider,
        message: string
    ): Promise<Conversation>;
}
