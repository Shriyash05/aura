/**
 * AURA Wardrobe — Gemini Provider Stub
 *
 * This is a stub for Phase 1.
 * Real implementation connects to a Supabase Edge Function
 * that holds the Gemini API key server-side.
 *
 * SECURITY: Gemini API key is NEVER in the mobile app bundle.
 */

import type {
  AIProvider,
  AIPrompt,
  AIResponse,
  ImageInput,
  AIProviderCapabilities,
} from '@/types/ai';

export class GeminiProvider implements AIProvider {
  readonly name = 'gemini' as const;

  readonly capabilities: AIProviderCapabilities = {
    text: true,
    vision: true,
    streaming: true,
  };

  async generateText(prompt: AIPrompt): Promise<AIResponse> {
    // Phase 6+: Call AURA backend Edge Function
    // The Edge Function uses process.env.GEMINI_API_KEY (server-side)
    throw new Error('GeminiProvider: not yet implemented — Phase 6+');
  }

  async generateVision(image: ImageInput, prompt: AIPrompt): Promise<AIResponse> {
    throw new Error('GeminiProvider: vision not yet implemented — Phase 6+');
  }

  async *streamText(prompt: AIPrompt): AsyncGenerator<string> {
    throw new Error('GeminiProvider: streaming not yet implemented — Phase 6+');
  }
}
