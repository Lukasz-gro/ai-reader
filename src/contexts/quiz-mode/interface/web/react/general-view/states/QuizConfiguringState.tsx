import React from 'react';
import { QuizConfigurationForm } from '../QuizConfigurationForm';
import { QuizCreationParams } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';

interface QuizConfiguringStateProps {
    onCreateQuiz: (params: QuizCreationParams) => Promise<void>;
    onCancel: () => void;
    isCreating: boolean;
}

export const QuizConfiguringState: React.FC<QuizConfiguringStateProps> = ({
    onCreateQuiz,
    onCancel,
    isCreating,
}) => {
    return (
        <div className={'flex justify-center p-4'}>
            <QuizConfigurationForm
                onCreateQuiz={onCreateQuiz}
                onCancel={onCancel}
                isCreating={isCreating}
            />
        </div>
    );
}; 
