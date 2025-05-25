'use server';

import { Course } from '@/contexts/course-mode/entities/course';
import { courseController } from '@/contexts/course-mode/interface/controllers/course-mode-controller';
import { Conversation } from '@/shared/entities/conversation';

export async function addUserMessageToChat(conversation: Conversation, message: string) {
    return await courseController.onNewUserMessage(conversation, message);
}

export async function addAssistantMessageToChat(conversation: Conversation, message: string, id: string) {
    return await courseController.onNewAssistantMessage(conversation, message, id);
}

export async function streamLLMResponse(conversation: Conversation) {
    return courseController.onStreamLLMResponse(conversation);
}

export async function createNewCourseConversation(course: Course) {
    return await courseController.onCreateNewCourseConversation(course);
}
