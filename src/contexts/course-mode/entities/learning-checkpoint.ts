export interface LearningCheckpoint {
    id: string;
    title: string;
    description: string;
    completedTimestamp: string | null; // iso string
}
