import { LLMProvider, Message, Role } from '@/shared/application/ports/out/llm-provider';
import OpenAI from 'openai';
import { LLMQueryError } from '@/shared/entities/llm-query-error';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions/completions';
import { LLMHttpError } from '@/shared/entities/llm-http-error';
import { v4 as uuidv4 } from 'uuid';

export class OpenAIProvider implements LLMProvider {
    client: OpenAI;

    constructor(private readonly apiKey: string) {
        this.client = new OpenAI({ apiKey: this.apiKey });
    }

    query = async (conversation: Message[]): Promise<Message> => {
        try {
            const completionString = await this.generateCompletion(conversation);
            return {
                id: uuidv4(),
                previousId: conversation.at(-1)?.id ?? null,
                role: Role.ASSISTANT,
                content: completionString,
            };
        } catch (error) {
            this.handleCompletionError(error);
        }
    };

    private generateCompletion = async (conversation: Message[]): Promise<string> => {
        const completion = await this.client.chat.completions.create({
            model: 'gpt-4.1',
            messages: conversation.map(this.messageToOpenAI),
        });
        const completionString = completion.choices[0]?.message?.content;
        if (!completionString || completionString === '') {
            throw new LLMQueryError('Did not receive response from OpenAI');
        }
        return completionString;
    };

    private messageToOpenAI(message: Message): ChatCompletionMessageParam {
        switch (message.role) {
            case Role.SYSTEM:
                return {
                    role: 'system',
                    content: message.content,
                };
            case Role.ASSISTANT:
                return {
                    role: 'assistant',
                    content: message.content,
                };
            case Role.USER:
                return {
                    role: 'user',
                    content: message.content,
                };
            default:
                throw new Error('Should not be here');
        }
    }

    private handleCompletionError(error: unknown): never {
        if (error instanceof OpenAI.APIError) {
            throw new LLMHttpError(
                `Error generating OpenAI completion: ${error.message}`,
                error.status,
            );
        } else if (error instanceof Error) {
            throw new LLMQueryError(`Error generating OpenAI completion: ${error.message}`);
        } else {
            throw new LLMQueryError(`Unexpected error generating OpenAI completion: ${String(error)}`);
        }
    }
}
