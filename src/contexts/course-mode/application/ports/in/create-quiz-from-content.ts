import { Quiz } from '../../../entities/quiz';
import { LLMProvider } from '../../../../../shared/application/ports/out/llm-provider';

// this LLM provider right now would have problem with generating the quiz because of the signature,
// should we add new interface for the LLM provider?
export interface CreateQuizFromContent {
    execute(
        content: string,
        llmProvider: LLMProvider
    ): Promise<Quiz>;
}
