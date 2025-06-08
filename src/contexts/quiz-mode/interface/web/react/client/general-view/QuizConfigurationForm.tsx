import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { QuizCreationParams, DifficultyLevel } from '@/contexts/quiz-mode/application/ports/in/create-quiz-from-material';

export type { QuizCreationParams, DifficultyLevel };

interface QuizConfigurationFormProps {
    onCreateQuiz: (params: QuizCreationParams) => void;
    onCancel: () => void;
    isCreating?: boolean;
}

export const QuizConfigurationForm: React.FC<QuizConfigurationFormProps> = ({
    onCreateQuiz,
    onCancel,
    isCreating = false,
}) => {
    const [numberOfQuestions, setNumberOfQuestions] = useState(10);
    const [difficulty, setDifficulty] = useState<DifficultyLevel>('intermediate');
    const [includeMultipleChoice, setIncludeMultipleChoice] = useState(true);
    const [includeOpenEnded, setIncludeOpenEnded] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!includeMultipleChoice && !includeOpenEnded) return;
        
        onCreateQuiz({
            numberOfQuestions,
            difficulty,
            includeMultipleChoice,
            includeOpenEnded,
        });
    };

    const isFormValid = includeMultipleChoice || includeOpenEnded;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='w-full max-w-2xl mx-auto p-6 bg-p-90 rounded-lg shadow-lg border border-p-80'
        >
            <h2 className='text-2xl font-semibold mb-6 text-p-10'>Configure Your Quiz</h2>
            
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='space-y-3'>
                    <label htmlFor='questions-range' className='block text-p-10 font-medium'>
                        Number of Questions: {numberOfQuestions}
                    </label>
                    <input
                        id='questions-range'
                        type='range'
                        min='5'
                        max='30'
                        value={numberOfQuestions}
                        onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                        className='w-full h-2 bg-p-70 rounded-lg appearance-none cursor-pointer slider'
                        disabled={isCreating}
                    />
                    <div className='flex justify-between text-sm text-p-50'>
                        <span>5</span>
                        <span>30</span>
                    </div>
                </div>

                <fieldset className='space-y-3'>
                    <legend className='block text-p-10 font-medium'>Difficulty Level</legend>
                    <div className='flex gap-4'>
                        {(['beginner', 'intermediate', 'expert'] as const).map((level) => (
                            <label key={level} className='flex items-center cursor-pointer'>
                                <input
                                    type='radio'
                                    name='difficulty'
                                    value={level}
                                    checked={difficulty === level}
                                    onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                                    className='sr-only'
                                    disabled={isCreating}
                                />
                                <div className={`w-4 h-4 rounded-full border-2 mr-2 transition-all duration-200 ${
                                    difficulty === level
                                        ? 'bg-sd-50 border-sd-50'
                                        : 'border-p-70 hover:border-sd-50'
                                }`}>
                                    {difficulty === level && (
                                        <div className='w-2 h-2 bg-p-10 rounded-full mx-auto mt-[1px]' />
                                    )}
                                </div>
                                <span className={`capitalize ${
                                    difficulty === level ? 'text-p-10' : 'text-p-50'
                                }`}>
                                    {level}
                                </span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                <fieldset className='space-y-3'>
                    <legend className='block text-p-10 font-medium'>Question Types</legend>
                    <div className='space-y-2'>
                        <label htmlFor='multiple-choice-checkbox' className='flex items-center cursor-pointer'>
                            <input
                                id='multiple-choice-checkbox'
                                type='checkbox'
                                checked={includeMultipleChoice}
                                onChange={(e) => setIncludeMultipleChoice(e.target.checked)}
                                className='sr-only'
                                disabled={isCreating}
                            />
                            <div className={`w-5 h-5 rounded border-2 mr-3 transition-all duration-200 flex items-center justify-center ${
                                includeMultipleChoice
                                    ? 'bg-sd-50 border-sd-50'
                                    : 'border-p-70 hover:border-sd-50'
                            }`}>
                                {includeMultipleChoice && (
                                    <svg className='w-3 h-3 text-p-10' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                                    </svg>
                                )}
                            </div>
                            <span className='text-p-10'>Multiple Choice Questions</span>
                        </label>
                        
                        <label htmlFor='open-ended-checkbox' className='flex items-center cursor-pointer'>
                            <input
                                id='open-ended-checkbox'
                                type='checkbox'
                                checked={includeOpenEnded}
                                onChange={(e) => setIncludeOpenEnded(e.target.checked)}
                                className='sr-only'
                                disabled={isCreating}
                            />
                            <div className={`w-5 h-5 rounded border-2 mr-3 transition-all duration-200 flex items-center justify-center ${
                                includeOpenEnded
                                    ? 'bg-sd-50 border-sd-50'
                                    : 'border-p-70 hover:border-sd-50'
                            }`}>
                                {includeOpenEnded && (
                                    <svg className='w-3 h-3 text-p-10' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                                    </svg>
                                )}
                            </div>
                            <span className='text-p-10'>Open-Ended Questions</span>
                        </label>
                    </div>
                    {!isFormValid && (
                        <p className='text-sm text-a-50'>Please select at least one question type</p>
                    )}
                </fieldset>

                <div className='flex gap-4 pt-4'>
                    <motion.button
                        type='submit'
                        disabled={!isFormValid || isCreating}
                        className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                            isFormValid && !isCreating
                                ? 'bg-sd-50 hover:bg-sd-50/80 text-p-10'
                                : 'bg-p-70 text-p-50 cursor-not-allowed'
                        }`}
                        whileHover={isFormValid && !isCreating ? { scale: 1.02 } : {}}
                        whileTap={isFormValid && !isCreating ? { scale: 0.98 } : {}}
                    >
                        {isCreating ? 'Creating Quiz...' : 'Create Quiz'}
                    </motion.button>
                    
                    <button
                        type='button'
                        onClick={onCancel}
                        disabled={isCreating}
                        className='px-6 py-3 bg-p-80 hover:bg-p-70 text-p-10 rounded-lg transition-colors font-medium disabled:opacity-50'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    );
}; 
