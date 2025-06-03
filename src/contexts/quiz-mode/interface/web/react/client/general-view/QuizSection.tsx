import { Project } from '@/shared/entities/project';
import { useState } from 'react';
import { createNewQuiz } from '../../server/quiz-actions';
import { QuizView } from './QuizView';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';

export const QuizSection: React.FC<{
    activeProject: Project,
}> = ({ activeProject }) => {
    const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

    if (!activeQuiz) {
        return <div className={'flex justify-center'}>
            <button 
                onClick={() => createNewQuiz(activeProject).then(setActiveQuiz)}
                className='px-6 py-2 mt-4 bg-a-50 hover:bg-a-50/80 text-p-10 rounded-lg transition-colors cursor-pointer'>
                <p className={'text-lg capitalize'}>
                        Create new quiz
                </p>
            </button>
        </div>;
    }

    return <div className={'flex flex-col h-full'}>
        <QuizView quiz={activeQuiz}/>
    </div>;
};
