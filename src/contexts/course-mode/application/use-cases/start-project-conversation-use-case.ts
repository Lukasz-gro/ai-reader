import { LLMProvider, Message, Role } from '@/shared/application/ports/out/llm-provider';
import { StartProjectConversation } from '../ports/in/start-project-conversation';
import { ProjectRepo } from '../ports/out/project-repo';
import { LearningCheckpoint } from '../../entities/learning-checkpoint';
import { Material } from '@/shared/entities/material';
import { Conversation, Mode } from '@/shared/entities/conversation';
import { v4 as uuidv4 } from 'uuid';
import { Project } from '@/shared/entities/project';

export class StartProjectConversationUseCase implements StartProjectConversation {
    async execute(
        project: Project,
        mode: Mode,
        llmProvider: LLMProvider,
        projectRepo: ProjectRepo,
    ) {
        const newConversation = generateProjectConversation(project, mode);
        // TODO move somewhere else, show spinner while awaiting initial response / show streaming response
        const llmResponse = await llmProvider.query(newConversation.messages);
        const newMessage: Message = {
            id: uuidv4(),
            previousId: newConversation.messages.at(-1)!.id,
            role: Role.ASSISTANT,
            content: llmResponse,
        };
        newConversation.messages.push(newMessage);

        project.conversations.push(newConversation);
        void projectRepo.upsert(project);
        return newConversation;
    }
}

function generateProjectConversation(
    project: Project,
    mode: Mode,
): Conversation {
    const firstMessage = generateFirstMessage(project);
    return {
        id: uuidv4(),
        messages: [firstMessage],
        mode: mode
    };
}

function generateFirstMessage(project: Project) {
    const firstMessage: Message = {
        id: uuidv4(),
        role: Role.SYSTEM,
        previousId: null,
        content: getProjectSystemPrompt(project),
    };

    return firstMessage;
}

function getProjectSystemPrompt(project: Project) {
    const projectTitle = project.title;
    const projectProgress = generateUserProgressString(project.roadmap.checkpoints);
    const projectContext = generateProjectContextString(project.materials);

    return  `You are a teacher responsible for teaching the user about ${projectTitle}. 
    Based on the following materials, think of a learning plan and ask the user whether to proceed with it. 
    ${projectContext}
    ${projectProgress}
    `;
}

function generateUserProgressString(checkpoints: LearningCheckpoint[]): string {
    const incomplete = checkpoints.filter(checkpoint => !checkpoint.completedTimestamp);
    const incompleteString = incomplete
        .map(checkpoint => `${checkpoint.title} - ${checkpoint.description}`)
        .join('\n');

    return `The user has the following material to learn:\n${incompleteString}`;
}

function generateProjectContextString(materials: Material[]) {
    const materialsString = materials
        .map(material => `${material.title}\n${material.content}`)
        .join('\n');

    return `The project materials are:\n${materialsString}`;
}
