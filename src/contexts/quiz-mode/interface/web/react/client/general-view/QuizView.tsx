import React, { useState } from 'react';
import { MultipleChoiceQuestionView } from '../questions/MultipleChoiceQuestionView';
import { OpenEndedQuestionView } from '../questions/OpenEndedQuestionView';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { Answer } from '@/contexts/quiz-mode/entities/question';
import { validateUserAnswer } from '../../server/quiz-actions';

interface QuizViewProps {
    quiz: Quiz;
}

interface UnansweredState {
    answered: false,
}

interface AnsweredState {
    answered: true,
    isCorrect: boolean,
    feedback: string | null
}

export type QuestionState = UnansweredState | AnsweredState;

export const QuizView: React.FC<QuizViewProps> = ({ quiz }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestionState, setCurrentQuestionState] = useState<QuestionState>({ answered: false });
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [validatingQuestion, setValidatingQuestion] = useState(false);

    const currentQuestion = quiz.questions[currentQuestionIndex];

    const handleAnswer = (answer: Answer) => {
        setValidatingQuestion(true);
        validateUserAnswer(currentQuestion, answer)
            .then(res => {
                setCurrentQuestionState({
                    answered: true,
                    isCorrect: res.ok,
                    feedback: (!res.ok && res.feedback) ? res.feedback : null
                });
                setValidatingQuestion(false);
            });
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setCurrentQuestionState({ answered: false });
        }
    };

    const renderQuestion = () => {
        if (currentQuestion.type === 'multiple_choice') {
            return (
                <MultipleChoiceQuestionView
                    key={currentQuestionIndex}
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    questionState={currentQuestionState}
                />
            );
        } else {
            return (
                <OpenEndedQuestionView
                    key={currentQuestionIndex}
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    isAnswered={currentQuestionState.answered}
                    isCorrect={currentQuestionState.answered ? currentQuestionState.isCorrect : false}
                    feedback={currentQuestionState.answered ? currentQuestionState.feedback : null}
                />
            );
        }
    };

    return (
        <div className='flex flex-col h-full'>
            {renderQuestion()}
            {currentQuestionState.answered && (
                <button
                    onClick={handleNext}
                    className='mt-4 px-6 py-2 bg-a-50 hover:bg-a-50/80 text-p-10 rounded-lg transition-colors cursor-pointer'
                >
                    {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
            )}
        </div>
    );
};
