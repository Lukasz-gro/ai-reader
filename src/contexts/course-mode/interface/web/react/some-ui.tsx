import React from 'react';
import { CourseModeController } from '../../controllers/course-mode-controller';
import { Course } from '../../../entities/course';

export const SomeCourseUI: React.FC<{course: Course, controller: CourseModeController}> = ({ course, controller }) => {
    void course;
    void controller;

    return (
        <div>
            {/*<NewCourseConversationButton onClick={() => controller.onCreateNewCourseConversation(course)} />*/}
        </div>
    );
};
