import { Conversation, Message, Mode, Role } from '@/shared/entities/conversation';
import { Project } from '@/shared/entities/project';
import { v4 as uuidv4 } from 'uuid';

export async function handleNewUserMessage(conversation: Conversation, message: string) {
    console.warn('addUserMessageToChat is mocked - not implemented yet');
    const userMessage: Message = {
        id: uuidv4(),
        role: Role.USER,
        previousId: conversation.messages[-1]?.id ?? null,
        content: message,
    };

    conversation.messages.push(userMessage);
    return {
        ...conversation,
    };
}

export async function addAssistantMessageToChat(conversation: Conversation, message: string, id: string) {
    console.warn('addAssistantMessageToChat is mocked - not implemented yet');
    return conversation;
}

export function streamLLMResponse(conversation: Conversation) {
    console.warn('streamLLMResponse is mocked - not implemented yet');
    return (async function* () {
        yield 'Mock response';
    })();
}

export async function createNewProjectConversation(project: Project, mode: Mode): Promise<Conversation> {
    return {
        id: 'mock-conversation',
        messages: [{
            id: 'mock-message',
            role: Role.ASSISTANT,
            content: `Mock ${mode} conversation for project: ${project.title}`,
            previousId: null
        }],
        mode
    };
}
