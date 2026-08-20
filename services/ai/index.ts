/**
 * AURA Wardrobe — AI Provider Factory
 *
 * Creates the appropriate provider based on configuration.
 * Application code should only use this factory — never import providers directly.
 *
 * SECURITY: This module only manages provider selection.
 * Actual API keys live server-side (Supabase Edge Functions).
 * The mobile app communicates with AURA's backend, which holds secrets.
 */

import type { AIProvider, AIProviderName } from '@/types/ai';

// Stub implementations — real providers connect to server-side Edge Functions
import { GeminiProvider } from './gemini';
import { OpenAIProvider } from './openai';

// Provider registry
const providers: Partial<Record<AIProviderName, AIProvider>> = {};

/**
 * Get an AI provider by name.
 * Returns undefined if the provider is not configured.
 */
export function getProvider(name: AIProviderName): AIProvider | undefined {
  if (!providers[name]) {
    switch (name) {
      case 'gemini':
        providers.gemini = new GeminiProvider();
        break;
      case 'openai':
        providers.openai = new OpenAIProvider();
        break;
      // Phase 6+: Add Anthropic, OpenRouter, Groq
      default:
        return undefined;
    }
  }
  return providers[name];
}

/**
 * Get the default provider for a given capability.
 * Falls back gracefully if preferred provider is unavailable.
 */
export function getDefaultProvider(
  capability: 'text' | 'vision'
): AIProvider | undefined {
  // Preference order — configurable per capability
  const textOrder: AIProviderName[] = ['gemini', 'openai'];
  const visionOrder: AIProviderName[] = ['gemini', 'openai'];

  const order = capability === 'vision' ? visionOrder : textOrder;

  for (const name of order) {
    const provider = getProvider(name);
    if (provider?.capabilities[capability]) {
      return provider;
    }
  }

  return undefined;
}
