export const validationResultSchema = {
    oneOf: [
      {
        type: 'object',
        properties: { ok: { const: true } },
        required:  ['ok'],
        additionalProperties: false,
      },
      {
        type: 'object',
        properties: {
          ok:      { const: false },
          feedback:{ type: 'string' },
        },
        required: ['ok'],
        additionalProperties: false,
      },
    ],
} as const;