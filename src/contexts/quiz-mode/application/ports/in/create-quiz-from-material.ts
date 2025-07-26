// Quiz creation types - no longer need the interface since we use API
export type DifficultyLevel = 'beginner' | 'intermediate' | 'expert';

export interface QuizCreationParams {
    numberOfQuestions: number;
    difficulty: DifficultyLevel;
    includeMultipleChoice: boolean;
    includeOpenEnded: boolean;
    extractionPrompt?: string;
    topicFocus?: string[];
    additionalContext?: Record<string, unknown>;
}
