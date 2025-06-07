import { FunctionCallingArguments, Message, Role, StructuredLLMProvider } from "@/shared/application/ports/out/llm-provider";
import OpenAI from 'openai';

export class OpenAIStructuredProvider implements StructuredLLMProvider {
    client: OpenAI;
    
    constructor(private readonly apiKey: string) {
        this.client = new OpenAI({ apiKey: this.apiKey });
    }

    async functionCalling<T = unknown>(conversation: Message[], returnSchema: Record<string, any>, functionCallingArguments: FunctionCallingArguments): Promise<T> {
        const parameters = {
            type: 'object',
            properties: { result: returnSchema },
            required: ['result'],
          } as const;

        const completion = await this.client.chat.completions.create({
            model: 'gpt-4.1',
            response_format: { type: 'json_object' },
            messages: [
                {
                    role: 'system',
                    content:
                    'You are a strict JSON-only API. ' +
                    'Return **only** JSON matching the function schema. ' +
                    'Do NOT quote entire objects or arrays.' +
                    this.getSystemNote(conversation)
                },
                { 
                    role: 'user', 
                    content: this.getUserPrompt(conversation) 
                },
            ],
            tools: [
                {
                    type: 'function',
                    function: {
                        name: functionCallingArguments.functionName,
                        description: functionCallingArguments.functionDescription,
                        parameters,
                    },
                },
            ],
            tool_choice: { type: 'function', function: { name: functionCallingArguments.functionName } },
        });

        const msg = completion.choices[0].message;
        const call = msg.tool_calls?.[0];
        if (!call) {
            throw new Error(`Model replied without calling the ${functionCallingArguments.functionName} tool`);
        }
        const { result } = JSON.parse(call.function.arguments);
        return result;
    }

    private getSystemNote(conversation: Message[]): string {
        return conversation.filter(msg => msg.role === Role.SYSTEM).map(msg => msg.content).join()
    }

    private getUserPrompt(conversation: Message[]): string {
        return conversation.filter(msg => msg.role === Role.USER).map(msg => msg.content).join()
    }
}