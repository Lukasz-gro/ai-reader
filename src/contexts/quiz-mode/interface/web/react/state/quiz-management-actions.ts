import { QuizDescription } from '@/contexts/quiz-mode/entities/quiz';
import { QuizCreationParams } from '@/contexts/quiz-mode/application/ports/out/QuizApi';
import { QuizViewMode } from './quiz-state';

export type QuizManagementAction =
  | { type: 'SET_VIEW'; payload: QuizViewMode }
  
  | { type: 'FETCH_QUIZZES_START' }
  | { type: 'FETCH_QUIZZES_SUCCESS'; payload: QuizDescription[] }
  | { type: 'FETCH_QUIZZES_ERROR'; payload: string }
  
  | { type: 'SUBMIT_QUIZ_CREATION'; payload: QuizCreationParams }
  | { type: 'QUIZ_CREATION_SUCCESS'; payload: QuizDescription }
  | { type: 'QUIZ_CREATION_ERROR'; payload: string }
  | { type: 'RESET_QUIZ_MANAGEMENT' };
  