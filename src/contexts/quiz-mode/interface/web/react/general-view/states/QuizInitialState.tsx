import React from 'react';

interface QuizInitialStateProps {
    onCreateQuizClick: () => void;
}

export const QuizInitialState: React.FC<QuizInitialStateProps> = ({ 
    onCreateQuizClick 
}) => {
    return (
        <div className={'flex justify-center'}>
            <button 
                onClick={onCreateQuizClick}
                className='px-6 py-2 mt-4 bg-a-50 hover:bg-a-50/80 text-p-10 rounded-lg transition-colors cursor-pointer'
            >
                <p className={'text-lg capitalize'}>
                    Create new quiz
                </p>
            </button>
        </div>
    );
}; 
