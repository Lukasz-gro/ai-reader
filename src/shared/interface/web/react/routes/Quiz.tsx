import React from 'react';
import { QuizSection } from '@/contexts/quiz-mode/interface/web/react/views/QuizSection';
import { ProjectPane } from '@/shared/interface/web/react/project/ui-components/ProjectPane';

export const Quiz: React.FC = () => {
    return (
        <div className='flex flex-1'>
            <ProjectPane />
            <QuizSection />
        </div>
    );
}; 
