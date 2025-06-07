export const multipleChoiceQuestionSchemaJson = {
    $id: 'MultipleChoiceQuestion',
    type: 'object',
    properties: {
        id:   { type: 'string' },
        type: { type: 'string', enum: ['multiple_choice'] },
        content: { type: 'string' },

        choices: {
            type: 'array',
            minItems: 4,
            items: {
                type: 'object',
                properties: {
                    id:    { type: 'string' },
                    label: { type: 'string' },
                },
                required: ['id', 'label'],
                additionalProperties: false,
            },
        },
        correctChoiceId: { type: 'string' },
    },

    required: ['id', 'type', 'content', 'choices', 'correctChoiceId'],
    additionalProperties: false,
} as const;
