import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { Project } from '@/shared/entities/project';
import { useState } from 'react';
import { createNewQuiz } from '../../server/quiz-actions';
import { QuizView } from './QuizView';

export const QuizSection: React.FC<{
    activeProject: Project,
}> = ({ activeProject }) => {
    const [activeQuiz, setActiveQuiz] = useState<Quiz|null>(null);

    if (!activeQuiz) {
        // TODO: Move to separate component
        return <div className={'flex flex-col h-full'}>
            <button 
                onClick={() => createNewQuiz(activeProject).then(setActiveQuiz)}
                className='px-6 py-2 mt-4 bg-a-50 hover:bg-a-50/80 text-p-10 rounded-lg transition-colors cursor-pointer'>
                Create new quiz
            </button>
        </div>;
    }

    return <div className={'flex flex-col h-full'}>
        <QuizView quiz={activeQuiz}/>
    </div>;
};
