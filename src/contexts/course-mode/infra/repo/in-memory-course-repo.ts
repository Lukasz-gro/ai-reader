import { CourseRepo } from "../../application/ports/out/course-repo";
import { Course } from "../../entities/course";

export class InMemoryCourseRepo implements CourseRepo {
    private courses: Course[] = [];

    upsert(course: Course): Promise<void> {
        const target = this.courses.find((c) => c.id === c.id);
        if (!target) {
            this.courses.push(course);
        } else {
            this.courses = this.courses.map((c) => c.id === target.id ? course : c);
        }
        return Promise.resolve();
    }

    clear(): Promise<void> {
        this.courses = [];
        return Promise.resolve();
    }

    getAll(): Promise<Course[]> {
        return Promise.resolve(this.courses);
    }
}