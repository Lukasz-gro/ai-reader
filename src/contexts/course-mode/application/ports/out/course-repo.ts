import { Course } from "../../../entities/course";

export interface CourseRepo {
    upsert(course: Course): Promise<void>;
}
