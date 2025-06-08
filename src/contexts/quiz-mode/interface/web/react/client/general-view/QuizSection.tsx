import { Project } from '@/shared/entities/project';
import { useState } from 'react';
import { createCustomizedQuiz } from '../../server/quiz-actions';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { QuizCreationParams } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';
import { 
    QuizInitialState, 
    QuizConfiguringState, 
    QuizTakingState 
} from './states';
import { QuizSectionState } from './types';

export const QuizSection: React.FC<{
    activeProject: Project,
}> = ({ activeProject }) => {
    const [sectionState, setSectionState] = useState<QuizSectionState>('initial');
    const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
    const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);

    const handleCreateQuizClick = () => {
        setSectionState('configuring');
    };

    const handleCancelConfiguration = () => {
        setSectionState('initial');
    };

    const handleCreateQuiz = async (params: QuizCreationParams) => {
        setIsCreatingQuiz(true);
        try {
            const quiz = await createCustomizedQuiz(activeProject, params);
            setActiveQuiz(quiz);
            setSectionState('taking-quiz');
        } catch (error) {
            console.error('Failed to create quiz:', error);
        } finally {
            setIsCreatingQuiz(false);
        }
    };

    const handleRestartQuiz = () => {
        setActiveQuiz(null);
        setSectionState('initial');
    };

    switch (sectionState) {
        case 'initial':
            return <QuizInitialState onCreateQuizClick={handleCreateQuizClick} />;

        case 'configuring':
            return (
                <QuizConfiguringState
                    onCreateQuiz={handleCreateQuiz}
                    onCancel={handleCancelConfiguration}
                    isCreating={isCreatingQuiz}
                />
            );

        case 'taking-quiz':
            if (!activeQuiz) {
                return <QuizInitialState onCreateQuizClick={handleCreateQuizClick} />;
            }
            return (
                <QuizTakingState
                    quiz={activeQuiz}
                    onRestartQuiz={handleRestartQuiz}
                />
            );

        default:
            return <QuizInitialState onCreateQuizClick={handleCreateQuizClick} />;
    }
};
