import { IdProvider } from "../../../../../shared/application/ports/out/id-provider";
import { LLMProvider } from "../../../../../shared/application/ports/out/llm-provider";
import { CourseRepo } from "../out/course-repo";
import { Course } from "../../../entities/course";
import { LLMConversation } from "../../../../../shared/entities/llm-conversation";

export interface StartCourseConversation {
    execute(
        course: Course,
        llmProvider: LLMProvider,
        idProvider: IdProvider,
        courseRepo: CourseRepo,
    ): Promise<LLMConversation>;
}
