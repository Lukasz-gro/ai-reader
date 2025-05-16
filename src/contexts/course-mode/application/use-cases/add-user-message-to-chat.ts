import { IdProvider } from '@/shared/application/ports/out/id-provider';
import { AddUserMessageToChat } from '../ports/in/add-user-message-to-chat';
import { Conversation } from '@/shared/entities/conversation';
import { Message, Role } from '@/shared/application/ports/out/llm-provider';

export class AddUserMessageToChatUseCase implements AddUserMessageToChat {
    async execute(conversation: Conversation, idProvider: IdProvider, message: string): Promise<Conversation> {
        const previousMessage = (conversation.messages.length > 0) ? conversation.messages[conversation.messages.length - 1] : null;

        const userMessage: Message = {
            id: idProvider.getId(),
            role: Role.USER,
            content: message,
            previousId: previousMessage?.id ?? null
        };
        
        return {
            ...conversation,
            messages: [...conversation.messages, userMessage]
        };
    }
}
