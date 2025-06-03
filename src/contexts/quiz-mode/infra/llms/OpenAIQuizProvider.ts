import { zodToJsonSchema } from 'zod-to-json-schema';
import { QuizProvider } from '../../application/ports/out/quiz-provider';
import { QuizQuestion } from '../../entities/quiz-question';
import OpenAI from 'openai';
import { z, ZodSchema } from 'zod';

export class OpenAIQuizProvider implements QuizProvider {
    client: OpenAI;
    
    constructor(private readonly apiKey: string) {
        this.client = new OpenAI({ apiKey: this.apiKey });
    }

    async generateQuestions<T extends QuizQuestion>(content: string, schema: ZodSchema<T>, numOfQuestions = 2): Promise<T[]> {
        const jsonSchema = zodToJsonSchema(schema, 'QuizQuestion');
        const functionParameters = {
            type: 'object',
            properties: {
                questions: {
                    type: 'array',
                    items: jsonSchema,
                    minItems: numOfQuestions,
                    maxItems: numOfQuestions
                }
            },
            required: ['questions']
        };

        const completion = await this.client.chat.completions.create({
            model: 'gpt-4.1',
            messages: [
                {
                    role: 'system',
                    content:
                    'You are a precise JSON-only API. '
                    + 'Return **only** JSON that matches the parameters of the function you will call. '
                    + 'You help students learn the subject they are interested in. '
                    + 'Each question must have: '
                    + '- id: a unique string identifier '
                    + '- type: must be "multiple_choice" '
                    + '- content: the question text '
                    + '- choices: an array of objects with id and label fields '
                    + '- correctChoiceId: must match one of the choice IDs',
                },
                { role: 'user', content: `Create a quiz from the provided material: ${content}` },
            ],
            tools: [
                {
                    type: 'function',
                    function: {
                        name: 'answer',
                        description:
                    `Return an object with a 'questions' array containing ${numOfQuestions} quiz-question objects that match the schema.`,
                        parameters: functionParameters,
                    },
                },
            ],
            tool_choice: { type: 'function', function: { name: 'answer' } },
        });
        
        const msg = completion.choices[0].message;
        const call = msg.tool_calls?.[0];
        if (!call) {
            throw new Error('Model replied without calling the `answer` tool');
        }
        const args = JSON.parse(call.function.arguments);
        return z.array(schema).parse(args.questions);
    }
}
