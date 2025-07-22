import { Project } from '@/shared/entities/project';
import { useState, useEffect } from 'react';
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
import { useProjectActions } from '@/shared/interface/web/react/project/hooks/useProjectActions';

export const QuizSection: React.FC<{
    activeProject: Project,
}> = ({ activeProject }) => {
    const [sectionState, setSectionState] = useState<QuizSectionState>('initial');
    const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const { createQuizForProject } = useProjectActions();

    const handleCreateQuizClick = () => {
        setSectionState('configuring');
    };

    const handleCancelConfiguration = () => {
        setSectionState('initial');
    };

    const handleCreateQuiz = async (params: QuizCreationParams) => {
        await createQuizForProject(activeProject.id, params);
        setSectionState('initial');
    };

    const handleQuizComplete = (answers: UserAnswer[]) => {
        setUserAnswers(answers);
        setSectionState('quiz-completed');
    };

    const handleRestartQuiz = async () => {
        // This will be handled by the useQuizSession hook later
    };

    const handleNewQuiz = () => {
        setActiveQuiz(null);
        setUserAnswers([]);
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
                    isCreating={false} // This will be handled by a new hook for the quiz list
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
