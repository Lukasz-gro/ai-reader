import { z } from 'zod';
import { MultipleChoiceQuestion } from '../../entities/multiple-choice-question';
import { QuizQuestion } from '../../entities/quiz-question';

export const ChoiceSchema = z.object({
    id: z.string(),
    label: z.string()
});

export const MultipleChoiceQuestionInputSchema = z.object({
    id: z.string(),
    type: z.literal('multiple_choice'),
    content: z.string(),
    choices: z.array(ChoiceSchema).min(2),
    correctChoiceId: z.string()
}).refine(
    (data) => data.choices.some(choice => choice.id === data.correctChoiceId),
    {
        message: "correctChoiceId must match one of the choice IDs",
        path: ["correctChoiceId"]
    }
);

export const MultipleChoiceQuestionSchema = MultipleChoiceQuestionInputSchema.transform(
    (data) => new MultipleChoiceQuestion(
        data.id,
        data.content,
        data.choices,
        data.correctChoiceId
    )
) as unknown as z.ZodType<QuizQuestion>;

export type MultipleChoiceQuestionInput = z.infer<typeof MultipleChoiceQuestionInputSchema>; 