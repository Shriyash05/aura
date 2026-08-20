/**
 * AURA Wardrobe — OpenAI Provider Stub
 *
 * Real implementation Phase 6+.
 * SECURITY: OpenAI API key is NEVER in the mobile app bundle.
 */

import type {
  AIProvider,
  AIPrompt,
  AIResponse,
  ImageInput,
  AIProviderCapabilities,
} from '@/types/ai';

export class OpenAIProvider implements AIProvider {
  readonly name = 'openai' as const;

  readonly capabilities: AIProviderCapabilities = {
    text: true,
    vision: true,
    streaming: true,
  };

  async generateText(prompt: AIPrompt): Promise<AIResponse> {
    throw new Error('OpenAIProvider: not yet implemented — Phase 6+');
  }

  async generateVision(image: ImageInput, prompt: AIPrompt): Promise<AIResponse> {
    throw new Error('OpenAIProvider: vision not yet implemented — Phase 6+');
  }

  async *streamText(prompt: AIPrompt): AsyncGenerator<string> {
    throw new Error('OpenAIProvider: streaming not yet implemented — Phase 6+');
  }
}
