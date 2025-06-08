import React from 'react';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { QuizView } from '../QuizView';

interface QuizTakingStateProps {
    quiz: Quiz;
    onRestartQuiz: () => void;
}

export const QuizTakingState: React.FC<QuizTakingStateProps> = ({
    quiz,
    onRestartQuiz,
}) => {
    return (
        <div className={'flex flex-col h-full'}>
            <div className={'flex justify-between items-center p-4 border-b border-p-80'}>
                <h2 className={'text-xl font-semibold text-p-10'}>{quiz.name}</h2>
                <button
                    onClick={onRestartQuiz}
                    className='px-4 py-2 text-sm bg-p-80 hover:bg-p-70 text-p-10 rounded-lg transition-colors'
                >
                    New Quiz
                </button>
            </div>
            <div className={'flex-1 overflow-y-auto'}>
                <QuizView quiz={quiz} />
            </div>
        </div>
    );
}; 
