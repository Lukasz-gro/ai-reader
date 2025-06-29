import React from 'react';
import { motion } from 'framer-motion';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';

export interface UserAnswer {
    questionId: string;
    questionType: 'multiple_choice' | 'open_ended';
    isCorrect: boolean;
}

interface QuizSummaryProps {
    quiz: Quiz;
    userAnswers: UserAnswer[];
    onRestartQuiz: () => void;
    onNewQuiz: () => void;
}

export const QuizSummary: React.FC<QuizSummaryProps> = ({
    quiz,
    userAnswers,
    onRestartQuiz,
    onNewQuiz,
}) => {
    const calculateStats = () => {
        const totalQuestions = userAnswers.length;
        const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);

        const mcqAnswers = userAnswers.filter(answer => answer.questionType === 'multiple_choice');
        const mcqCorrect = mcqAnswers.filter(answer => answer.isCorrect).length;

        const openEndedAnswers = userAnswers.filter(answer => answer.questionType === 'open_ended');
        const openEndedCorrect = openEndedAnswers.filter(answer => answer.isCorrect).length;

        return {
            total: totalQuestions,
            correct: correctAnswers,
            percentage,
            mcq: {
                total: mcqAnswers.length,
                correct: mcqCorrect,
                percentage: mcqAnswers.length > 0 ? Math.round((mcqCorrect / mcqAnswers.length) * 100) : 0
            },
            openEnded: {
                total: openEndedAnswers.length,
                correct: openEndedCorrect,
                percentage: openEndedAnswers.length > 0 ? Math.round((openEndedCorrect / openEndedAnswers.length) * 100) : 0
            }
        };
    };

    const stats = calculateStats();

    const getPerformanceColor = (percentage: number) => {
        if (percentage >= 80) return 'text-sd-50';
        if (percentage >= 60) return 'text-yellow-500';
        return 'text-a-50';
    };

    const getPerformanceBg = (percentage: number) => {
        if (percentage >= 80) return 'bg-sd-50/10 border-sd-50/30';
        if (percentage >= 60) return 'bg-yellow-500/10 border-yellow-500/30';
        return 'bg-a-50/10 border-a-50/30';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='w-full max-w-2xl mx-auto p-6'
        >
            <div className='text-center mb-8'>
                <h2 className='text-2xl font-semibold text-p-10 mb-2'>Quiz Complete!</h2>
                <p className='text-p-50'>{quiz.name}</p>
            </div>

            <div className={`rounded-lg border-2 p-6 mb-6 ${getPerformanceBg(stats.percentage)}`}>
                <div className='text-center'>
                    <div className={`text-4xl font-bold mb-2 ${getPerformanceColor(stats.percentage)}`}>
                        {stats.percentage}%
                    </div>
                    <div className='text-p-10 text-lg mb-2'>
                        {stats.correct} out of {stats.total} correct
                    </div>
                    <div className='text-p-50 text-sm'>
                        {stats.percentage >= 80 ? 'Excellent work!' : 
                            stats.percentage >= 60 ? 'Good job!' : 'Keep practicing!'}
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
                {/* Multiple Choice Stats */}
                {stats.mcq.total > 0 && (
                    <div className='bg-p-90 border border-p-80 rounded-lg p-4'>
                        <div className='text-center'>
                            <div className='text-p-50 text-sm font-medium mb-2'>Multiple Choice</div>
                            <div className={`text-2xl font-bold mb-1 ${getPerformanceColor(stats.mcq.percentage)}`}>
                                {stats.mcq.percentage}%
                            </div>
                            <div className='text-p-10 text-sm'>
                                {stats.mcq.correct}/{stats.mcq.total} correct
                            </div>
                        </div>
                    </div>
                )}

                {stats.openEnded.total > 0 && (
                    <div className='bg-p-90 border border-p-80 rounded-lg p-4'>
                        <div className='text-center'>
                            <div className='text-p-50 text-sm font-medium mb-2'>Open-Ended</div>
                            <div className={`text-2xl font-bold mb-1 ${getPerformanceColor(stats.openEnded.percentage)}`}>
                                {stats.openEnded.percentage}%
                            </div>
                            <div className='text-p-10 text-sm'>
                                {stats.openEnded.correct}/{stats.openEnded.total} correct
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className='flex gap-4 justify-center'>
                <motion.button
                    onClick={onRestartQuiz}
                    className='px-6 py-3 bg-sd-50 hover:bg-sd-50/80 text-p-10 rounded-lg transition-colors font-medium'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Retake Quiz
                </motion.button>
                
                <motion.button
                    onClick={onNewQuiz}
                    className='px-6 py-3 bg-p-80 hover:bg-p-70 text-p-10 rounded-lg transition-colors font-medium'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    New Quiz
                </motion.button>
            </div>
        </motion.div>
    );
}; 
