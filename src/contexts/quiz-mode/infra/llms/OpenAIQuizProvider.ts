import { QuizProvider } from '../../application/ports/out/quiz-provider';
import OpenAI from 'openai';

export class OpenAIQuizProvider implements QuizProvider {
    client: OpenAI;
    
    constructor(private readonly apiKey: string) {
        this.client = new OpenAI({ apiKey: this.apiKey });
    }

    async generateQuestions(content: string, schema: Record<string, any>, numOfQuestions = 2): Promise<unknown[]> {
        const functionParameters = {
            type: 'object',
            properties: {
                questions: {
                    type: 'array',
                    items: schema,
                    minItems: numOfQuestions,
                    maxItems: numOfQuestions
                }
            },
            required: ['questions']
        };

        const completion = await this.client.chat.completions.create({
            model: 'gpt-4.1',
            response_format: { type: 'json_object' },
            messages: [
                {
                    role: 'system',
                    content:
                    'You are a strict JSON-only API. '
                    + 'Return **only** JSON that satisfies the `answer` schema. '
                    + 'Do NOT wrap objects or arrays in quotation marks.'
                    + 'You help students learn the subject they are interested in. '
                },
                { 
                    role: 'user', 
                    content: `Create a quiz from the provided material:\n\n ${content}` 
                },
            ],
            tools: [
                {
                    type: 'function',
                    function: {
                        name: 'answer',
                        description: `Object with exactly ${numOfQuestions} questions.`,
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
        const { questions } = JSON.parse(call.function.arguments);
        return questions;
    }
}
