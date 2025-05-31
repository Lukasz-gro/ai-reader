import { MultipleChoiceQuestion } from '@/contexts/course-mode/entities/multiple-choice-question';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface MultipleChoiceQuestionViewProps {
    question: MultipleChoiceQuestion;
    onAnswer: (answerId: string) => void;
    isAnswered?: boolean;
    isCorrect?: boolean;
}

export const MultipleChoiceQuestionView: React.FC<MultipleChoiceQuestionViewProps> = ({
    question,
    onAnswer,
    isAnswered = false,
    isCorrect = false,
}) => {
    const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

    const handleChoiceSelect = (choiceId: string) => {
        if (isAnswered) return;
        setSelectedChoiceId(choiceId);
        onAnswer(choiceId);
    };

    const getChoiceStyle = (choiceId: string) => {
        if (!isAnswered) {
            return selectedChoiceId === choiceId
                ? 'bg-sd-50 text-p-10 border-sd-50'
                : 'bg-p-90 text-p-10 border-p-70 hover:bg-p-80';
        }

        if (choiceId === question.correctChoiceId) {
            return 'bg-sd-50 text-p-10 border-sd-50';
        }

        if (choiceId === selectedChoiceId && !isCorrect) {
            return 'bg-a-50 text-p-10 border-a-50';
        }

        return 'bg-p-90 text-p-10 border-p-70 opacity-50';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='w-full max-w-2xl mx-auto p-6 bg-p-90 rounded-lg shadow-lg border border-p-80'
        >
            <h3 className='text-xl font-semibold mb-6 text-p-10'>{question.content}</h3>
            <div className='space-y-3'>
                {question.choices.map((choice) => (
                    <motion.button
                        key={choice.id}
                        onClick={() => handleChoiceSelect(choice.id)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${getChoiceStyle(choice.id)}`}
                        whileHover={!isAnswered ? { scale: 1.02 } : {}}
                        whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    >
                        {choice.label}
                    </motion.button>
                ))}
            </div>
            {isAnswered && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`mt-4 p-3 rounded-lg ${
                        isCorrect ? 'bg-sd-50 text-p-10' : 'bg-a-50 text-p-10'
                    }`}
                >
                    {isCorrect ? 'Correct!' : 'Incorrect. Try again!'}
                </motion.div>
            )}
        </motion.div>
    );
}; 
