import { LLMProvider } from '@/shared/application/ports/out/llm-provider';
import { Quiz } from '../../entities/quiz';
import { CreateQuizFromContent } from '../ports/in/create-quiz-from-content';

export class CreateQuizFromContentUseCase implements CreateQuizFromContent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    execute(content: string, llmProvider: LLMProvider): Promise<Quiz> {
        throw new Error('Method not implemented.');
    }
}
