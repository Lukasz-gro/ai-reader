import React from 'react';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { QuizSummary, UserAnswer } from '../QuizSummary';

interface QuizCompletedStateProps {
    quiz: Quiz;
    userAnswers: UserAnswer[];
    onRestartQuiz: () => void;
    onNewQuiz: () => void;
}

export const QuizCompletedState: React.FC<QuizCompletedStateProps> = ({
    quiz,
    userAnswers,
    onRestartQuiz,
    onNewQuiz,
}) => {
    return (
        <div className={'flex justify-center p-4'}>
            <QuizSummary
                quiz={quiz}
                userAnswers={userAnswers}
                onRestartQuiz={onRestartQuiz}
                onNewQuiz={onNewQuiz}
            />
        </div>
    );
}; 
