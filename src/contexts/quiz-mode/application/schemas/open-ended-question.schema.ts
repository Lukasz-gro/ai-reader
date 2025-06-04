export const openEndedQuestionSchemaJson = {
    $id: 'OpenEndedQuestion',
    type: 'object',
    properties: {
        id:   { type: 'string' },
        type: { type: 'string', enum: ['open_ended'] },
        content: { type: 'string' },
    },

    required: ['id', 'type', 'content'],
    additionalProperties: false,
} as const;