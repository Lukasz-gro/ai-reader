'use server';

import { courseController } from '@/contexts/course-mode/interface/controllers/course-mode-controller';
import { Conversation, Mode } from '@/shared/entities/conversation';
import { Project } from '@/shared/entities/project';

export async function addUserMessageToChat(conversation: Conversation, message: string) {
    return await courseController.onNewUserMessage(conversation, message);
}

export async function addAssistantMessageToChat(conversation: Conversation, message: string, id: string) {
    return await courseController.onNewAssistantMessage(conversation, message, id);
}

export async function streamLLMResponse(conversation: Conversation) {
    return courseController.onStreamLLMResponse(conversation);
}

export async function createNewProjectConversation(project: Project, mode: Mode) {
    return await courseController.onCreateNewProjectConversation(project, mode);
}
