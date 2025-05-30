import { LLMProvider } from '@/shared/application/ports/out/llm-provider';
import { ProjectRepo } from '../out/project-repo';
import { Conversation, Mode } from '@/shared/entities/conversation';
import { Project } from '@/shared/entities/project';

export interface StartProjectConversation {
    execute(
        project: Project,
        conversationMode: Mode,
        llmProvider: LLMProvider,
        courseRepo: ProjectRepo,
    ): Promise<Conversation>;
}
