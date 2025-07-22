import { ProjectPreview } from '@/shared/entities/project';
import { QuizPreview } from '@/shared/entities/quiz-preview';

export type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: ProjectPreview[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'PROJECT_SELECTED'; payload: string }
  | { type: 'PROJECT_CREATED'; payload: ProjectPreview }
  | { type: 'QUIZ_ADDED'; payload: { projectId: string; quiz: QuizPreview } };
