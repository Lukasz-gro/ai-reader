import { LLMProvider, Message, Role } from '@/shared/application/ports/out/llm-provider';
import { StartCourseConversation } from '../ports/in/start-course-conversation';
import { Course } from '../../entities/course';
import { CourseRepo } from '../ports/out/course-repo';
import { LearningCheckpoint } from '../../entities/learning-checkpoint';
import { Material } from '@/shared/entities/material';
import { Conversation } from '@/shared/entities/conversation';
import { v4 as uuidv4 } from 'uuid';

export class StartCourseConversationConcrete implements StartCourseConversation {
    async execute(
        course: Course,
        llmProvider: LLMProvider,
        courseRepo: CourseRepo,
    ) {
        const newConversation = generateCourseConversation(course);
        // TODO move somewhere else, show spinner while awaiting initial response / show streaming response
        const llmResponse = await llmProvider.query(newConversation.messages);
        const newMessage: Message = {
            id: uuidv4(),
            previousId: newConversation.messages.at(-1)!.id,
            role: Role.ASSISTANT,
            content: llmResponse,
        };
        newConversation.messages.push(newMessage);

        course.conversations.push(newConversation);
        void courseRepo.upsert(course);
        return newConversation;
    }
}

function generateCourseConversation(
    course: Course,
): Conversation {
    const firstMessage = generateFirstMessage(course);
    return {
        id: uuidv4(),
        messages: [firstMessage],
    };
}

function generateFirstMessage(course: Course) {
    const firstMessage: Message = {
        id: uuidv4(),
        role: Role.SYSTEM,
        previousId: null,
        content: getCourseSystemPrompt(course),
    };

    return firstMessage;
}

function getCourseSystemPrompt(course: Course) {
    const projectTitle = course.project.title;
    const courseProgress = generateUserProgressString(course.roadmap.checkpoints);
    const courseContext = generateCourseContextString(course.project.materials);

    return  `You are a teacher responsible for teaching the user about ${projectTitle}. 
    Based on the following materials, think of a learning plan and ask the user whether to proceed with it. 
    ${courseContext}
    ${courseProgress}
    `;
}

function generateUserProgressString(checkpoints: LearningCheckpoint[]): string {
    const incomplete = checkpoints.filter(checkpoint => !checkpoint.completedTimestamp);
    const incompleteString = incomplete
        .map(checkpoint => `${checkpoint.title} - ${checkpoint.description}`)
        .join('\n');

    return `The user has the following material to learn:\n${incompleteString}`;
}

function generateCourseContextString(materials: Material[]) {
    const materialsString = materials
        .map(material => `${material.title}\n${material.content}`)
        .join('\n');

    return `The course materials are:\n${materialsString}`;
}
