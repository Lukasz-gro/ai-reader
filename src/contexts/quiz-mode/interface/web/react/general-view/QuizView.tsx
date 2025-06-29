import React, { useState } from 'react';
import { MultipleChoiceQuestionView } from '../questions/MultipleChoiceQuestionView';
import { OpenEndedQuestionView } from '../questions/OpenEndedQuestionView';
import { Quiz } from '@/contexts/quiz-mode/entities/quiz';
import { Answer } from '@/contexts/quiz-mode/entities/question';
import { validateUserAnswer } from '../../server/quiz-actions';
import { UserAnswer } from './QuizSummary';

interface QuizViewProps {
    quiz: Quiz;
    onQuizComplete?: (userAnswers: UserAnswer[]) => void;
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

export const QuizView: React.FC<QuizViewProps> = ({ quiz, onQuizComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestionState, setCurrentQuestionState] = useState<QuestionState>({ answered: false });
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [validatingQuestion, setValidatingQuestion] = useState(false);

    const currentQuestion = quiz.questions[currentQuestionIndex];

    const handleAnswer = (answer: Answer) => {
        setValidatingQuestion(true);
        validateUserAnswer(currentQuestion, answer)
            .then(res => {
                const newUserAnswer: UserAnswer = {
                    questionId: currentQuestion.id,
                    questionType: currentQuestion.type,
                    isCorrect: res.ok
                };

                setUserAnswers(prev => [...prev, newUserAnswer]);
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
        } else {
            onQuizComplete?.(userAnswers);
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
            <div className='flex justify-between items-center mt-8 mb-6 px-4'>
                <div className='text-p-50 text-sm font-medium'>
                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </div>
                <div className='text-p-50 text-xs'>
                    {Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}% complete
                </div>
            </div>

            <div className='mb-6 px-4'>
                <div className='w-full bg-p-80 rounded-full h-2'>
                    <div 
                        className='bg-sd-50 h-2 rounded-full transition-all duration-300 ease-out'
                        style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {renderQuestion()}
            {currentQuestionState.answered && (
                <div className='flex justify-center mt-6'>
                    <button
                        onClick={handleNext}
                        className='px-6 py-2 bg-a-50 hover:bg-a-50/80 text-p-10 rounded-lg transition-colors cursor-pointer text-sm font-medium'
                    >
                        {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                </div>
            )}
        </div>
    );
};
