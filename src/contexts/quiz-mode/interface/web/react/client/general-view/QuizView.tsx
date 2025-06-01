import React, { useState } from 'react';
import { MultipleChoiceQuestionView } from '../questions/MultipleChoiceQuestionView';
import { OpenEndedQuestionView } from '../questions/OpenEndedQuestionView';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizViewProps {
    quiz: Quiz;
}

export const QuizView: React.FC<QuizViewProps> = ({ quiz }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false);

    const currentQuestion = quiz.questions[currentQuestionIndex];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        if ('choices' in currentQuestion) {
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
        <div className='w-full max-w-4xl mx-auto p-6'>
            <div className='mb-6'>
                <h2 className='text-2xl font-bold text-p-10'>{quiz.name}</h2>
                <p className='text-p-20'>
                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </p>
            </div>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                >
                    {renderQuestion()}
                </motion.div>
            </AnimatePresence>

            {isCurrentQuestionAnswered && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mt-6 flex justify-end'
                >
                    <button
                        onClick={handleNext}
                        className='px-6 py-2 bg-p-10 text-p-90 rounded-lg hover:bg-p-20 transition-colors'
                    >
                        {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                </motion.div>
            )}
        </div>
    );
};
