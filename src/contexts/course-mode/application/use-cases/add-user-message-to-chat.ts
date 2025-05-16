import { AddUserMessageToChat } from '../ports/in/add-user-message-to-chat';
import { Conversation } from '@/shared/entities/conversation';
import { Message, Role } from '@/shared/application/ports/out/llm-provider';
import { v4 as uuidv4 } from 'uuid';

export class AddUserMessageToChatUseCase implements AddUserMessageToChat {
    async execute(conversation: Conversation, message: string): Promise<Conversation> {
        const previousMessage = (conversation.messages.length > 0) ? conversation.messages[conversation.messages.length - 1] : null;

        const userMessage: Message = {
            id: uuidv4(),
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
