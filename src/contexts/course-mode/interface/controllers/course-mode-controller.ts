import { CourseRepo } from "../../application/ports/out/course-repo";
import { LLMProvider } from "../../../../shared/application/ports/out/llm-provider";
import { IdProvider } from "../../../../shared/application/ports/out/id-provider";
import { StartCourseConversation } from "../../application/ports/in/start-course-conversation";
import { Course } from "../../entities/course";

export class CourseModeController {
    constructor(
        private readonly llmProvider: LLMProvider,
        private readonly courseRepo: CourseRepo,
        private readonly idProvider: IdProvider,
        private readonly startCourseConversation: StartCourseConversation,
    ) { }

    onCreateNewCourseConversation = async (course: Course) => {
        await this.startCourseConversation.execute(course, this.llmProvider, this.idProvider, this.courseRepo)
    }

    onLoadCourses = async () => {
        // something
    }
}
