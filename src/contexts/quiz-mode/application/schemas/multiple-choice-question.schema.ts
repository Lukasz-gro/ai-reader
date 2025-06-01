import { z } from 'zod';
import { MultipleChoiceQuestion } from '../../entities/multiple-choice-question';

export const ChoiceSchema = z.object({
    id: z.string(),
    label: z.string()
});

export const MultipleChoiceQuestionSchema = z.object({
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
) as unknown as z.ZodType<MultipleChoiceQuestion>;

export type MultipleChoiceQuestionInput = z.infer<typeof MultipleChoiceQuestionSchema>; 