import React, { useState } from 'react';
import { MultipleChoiceQuestionView } from '../questions/MultipleChoiceQuestionView';
import { OpenEndedQuestionView } from '../questions/OpenEndedQuestionView';
import { SerializedQuiz } from '@/contexts/quiz-mode/infra/serialization/quiz-serializer';

interface QuizViewProps {
    quiz: SerializedQuiz;
}

export const QuizView: React.FC<QuizViewProps> = ({ quiz }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false);

    const currentQuestion = quiz.questions[currentQuestionIndex];

    const handleAnswer = (answer: unknown) => {
        setIsCurrentQuestionAnswered(true);
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setIsCurrentQuestionAnswered(false);
        }
    };

    const renderQuestion = () => {
        if (currentQuestion.type === 'multiple_choice') {
            return (
                <MultipleChoiceQuestionView
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    isAnswered={isCurrentQuestionAnswered}
                />
            );
        } else {
            return (
                <OpenEndedQuestionView
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    isAnswered={isCurrentQuestionAnswered}
                />
            );
        }
    };

    return (
        <div className="flex flex-col h-full">
            {renderQuestion()}
            {isCurrentQuestionAnswered && (
                <button
                    onClick={handleNext}
                    className="mt-4 px-6 py-2 bg-a-50 hover:bg-a-50/80 text-p-10 rounded-lg transition-colors cursor-pointer"
                >
                    {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
            )}
        </div>
    );
};
