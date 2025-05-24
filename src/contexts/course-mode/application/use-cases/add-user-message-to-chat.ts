import { AddUserMessageToChat } from '../ports/in/add-user-message-to-chat';
import { Conversation } from '@/shared/entities/conversation';
import { Message, Role } from '@/shared/application/ports/out/llm-provider';
import { v4 as uuidv4 } from 'uuid';

export class AddUserMessageToChatUseCase implements AddUserMessageToChat {
    async execute(
        conversation: Conversation,
        message: string
    ): Promise<Conversation> {
        const newMessage = this.newUserMessageFrom(message);
        return this.appendMessage(conversation, newMessage);
    }

    private appendMessage(conversation: Conversation, message: Message): Conversation {
        const previousMessage = this.lastMessage(conversation);
        const appendedMessage: Message = { ...message, previousId: previousMessage?.id ?? null }
        return {...conversation, messages: [...conversation.messages, appendedMessage] }
    }

    private lastMessage(conversation: Conversation): Message | null {
        return (conversation.messages.length == 0) ? null : conversation.messages[conversation.messages.length - 1];
    }

    private newUserMessageFrom(message: string): Message {
        return {
            id: uuidv4(),
            role: Role.USER,
            content: message,
            previousId: null
        };
    }
}
