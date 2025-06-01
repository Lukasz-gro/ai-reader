import { SerializedOpenEndedQuestion } from '@/contexts/quiz-mode/infra/serialization/quiz-serializer';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface OpenEndedQuestionViewProps {
    question: SerializedOpenEndedQuestion;
    onAnswer: (answer: string) => void;
    isAnswered?: boolean;
    isCorrect?: boolean;
    feedback?: string;
}

export const OpenEndedQuestionView: React.FC<OpenEndedQuestionViewProps> = ({
    question,
    onAnswer,
    isAnswered = false,
    isCorrect = false,
    feedback,
}) => {
    const [answer, setAnswer] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!answer.trim() || isAnswered) return;
        onAnswer(answer);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='w-full max-w-2xl mx-auto p-6 bg-p-90 rounded-lg shadow-lg border border-p-80'
        >
            <h3 className='text-xl font-semibold mb-6 text-p-10'>{question.content}</h3>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='relative'>
                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        disabled={isAnswered}
                        placeholder='Type your answer here...'
                        className={`w-full p-4 rounded-lg border-2 transition-all duration-200 resize-none min-h-[120px]
                            ${isAnswered 
            ? 'bg-p-90 text-p-10 border-p-70 opacity-50' 
            : 'bg-p-90 text-p-10 border-p-70 focus:border-sd-50 focus:shadow-md focus:shadow-sd-50/30'
        }`}
                    />
                </div>
                {!isAnswered && (
                    <motion.button
                        type='submit'
                        disabled={!answer.trim()}
                        className={`w-full p-4 rounded-lg transition-all duration-200
                            ${answer.trim() 
                        ? 'bg-sd-50 text-p-10 hover:bg-sd-50/80' 
                        : 'bg-p-70 text-p-50 cursor-not-allowed'
                    }`}
                        whileHover={answer.trim() ? { scale: 1.02 } : {}}
                        whileTap={answer.trim() ? { scale: 0.98 } : {}}
                    >
                        Submit Answer
                    </motion.button>
                )}
            </form>
            {isAnswered && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`mt-4 p-3 rounded-lg ${
                        isCorrect ? 'bg-sd-50 text-p-10' : 'bg-a-50 text-p-10'
                    }`}
                >
                    {feedback || (isCorrect ? 'Correct!' : 'Incorrect. Try again!')}
                </motion.div>
            )}
        </motion.div>
    );
}; 
