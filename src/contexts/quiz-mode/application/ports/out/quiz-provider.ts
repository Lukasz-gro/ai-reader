export interface QuizProvider {
    generateQuestions(content: string, schema: Record<string, any>, numOfQuestions?: number): Promise<unknown[]>; 
}
