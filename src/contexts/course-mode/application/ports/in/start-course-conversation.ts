import { LLMProvider } from '@/shared/application/ports/out/llm-provider';
import { CourseRepo } from '../out/course-repo';
import { Course } from '../../../entities/course';
import { Conversation } from '@/shared/entities/conversation';

export interface StartCourseConversation {
    execute(
        course: Course,
        llmProvider: LLMProvider,
        courseRepo: CourseRepo,
    ): Promise<Conversation>;
}
