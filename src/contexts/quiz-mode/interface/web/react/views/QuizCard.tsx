import { QuizDescription } from "@/contexts/quiz-mode/entities/quiz";

export interface QuizCardProps {
    readonly quizDescription: QuizDescription;
}

export function QuizCard({ quizDescription }: QuizCardProps) {
    
    return <div>{quizDescription.id} + {quizDescription.name}</div>;
}