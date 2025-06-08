import { Project } from '@/shared/entities/project';
import { useState } from 'react';
import { createCustomizedQuiz } from '../../server/quiz-actions';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { QuizCreationParams } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';
import { 
    QuizInitialState, 
    QuizConfiguringState, 
    QuizTakingState,
    QuizCompletedState
} from './states';
import { QuizSectionState } from './types';
import { UserAnswer } from './QuizSummary';

export const QuizSection: React.FC<{
    activeProject: Project,
}> = ({ activeProject }) => {
    const [sectionState, setSectionState] = useState<QuizSectionState>('initial');
    const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
    const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [lastQuizParams, setLastQuizParams] = useState<QuizCreationParams | null>(null);

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
            setLastQuizParams(params);
            setUserAnswers([]);
            setSectionState('taking-quiz');
        } catch (error) {
            console.error('Failed to create quiz:', error);
        } finally {
            setIsCreatingQuiz(false);
        }
    };

    const handleQuizComplete = (answers: UserAnswer[]) => {
        setUserAnswers(answers);
        setSectionState('quiz-completed');
    };

    const handleRestartQuiz = async () => {
        if (lastQuizParams && activeQuiz) {
            setIsCreatingQuiz(true);
            try {
                const quiz = await createCustomizedQuiz(activeProject, lastQuizParams);
                setActiveQuiz(quiz);
                setUserAnswers([]);
                setSectionState('taking-quiz');
            } catch (error) {
                console.error('Failed to restart quiz:', error);
            } finally {
                setIsCreatingQuiz(false);
            }
        }
    };

    const handleNewQuiz = () => {
        setActiveQuiz(null);
        setUserAnswers([]);
        setLastQuizParams(null);
        setSectionState('configuring');
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
                    onRestartQuiz={handleNewQuiz}
                    onQuizComplete={handleQuizComplete}
                />
            );

        case 'quiz-completed':
            if (!activeQuiz) {
                return <QuizInitialState onCreateQuizClick={handleCreateQuizClick} />;
            }
            return (
                <QuizCompletedState
                    quiz={activeQuiz}
                    userAnswers={userAnswers}
                    onRestartQuiz={handleRestartQuiz}
                    onNewQuiz={handleNewQuiz}
                />
            );

        default:
            return <QuizInitialState onCreateQuizClick={handleCreateQuizClick} />;
    }
};
