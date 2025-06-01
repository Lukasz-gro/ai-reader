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
        const arraySchema = z.array(schema);

        const jsonSchema = zodToJsonSchema(arraySchema, 'QuizQuestions');

        const completion = await this.client.chat.completions.create({
            model: 'gpt-4.1',
            messages: [
                {
                    role: 'system',
                    content:
                    'You are a precise JSON-only API. '
                    + 'Return **only** JSON that matches the parameters of the function you will call. '
                    + 'You help students learn the subject they are interested in.',
                },
                { role: 'user', content },
            ],
            tools: [
                {
                    type: 'function',
                    function: {
                        name: 'answer',
                        description:
                    `Return an **array** of quiz-question objects that match the schema. The array should have ${numOfQuestions} elements.`,
                        parameters: jsonSchema,
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

        return arraySchema.parse(args);
    }
}
