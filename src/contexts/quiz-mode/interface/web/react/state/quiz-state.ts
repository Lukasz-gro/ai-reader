import { AsyncState } from '@/shared/infra/types/AsyncState';
import { QuizDescription } from '@/contexts/quiz-mode/entities/quiz';

export type QuizViewMode = 'list' | 'creation' | 'creating' | 'starting';

export interface QuizManagementState {
    currentView: QuizViewMode;
    quizzes: AsyncState<QuizDescription[], string>;
}
