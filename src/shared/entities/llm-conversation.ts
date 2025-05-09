import { LLMMessage } from "../application/ports/out/llm-provider";

export interface LLMConversation {
    id: string;
    messages: LLMMessage[];
}
