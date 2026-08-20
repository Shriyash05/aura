/**
 * AURA Wardrobe — AI Provider Abstraction
 *
 * Architecture rule: Application code must not depend directly on one provider.
 * All AI calls go through this interface.
 *
 * Providers: Gemini, OpenAI, Anthropic, OpenRouter, Groq
 *
 * SECURITY: Provider secrets must NEVER be in the mobile app.
 * All secret-bearing calls go through server-side execution
 * (Supabase Edge Functions).
 */

// ────────────────────────────────────────────────────────────────────────────
// PROVIDER INTERFACE
// ────────────────────────────────────────────────────────────────────────────

export type AIProviderName =
  | 'gemini'
  | 'openai'
  | 'anthropic'
  | 'openrouter'
  | 'groq';

export interface AIPrompt {
  system?: string;
  messages: AIMessage[];
  temperature?: number;
  maxTokens?: number;
}

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string | AIContentPart[];
}

export interface AIContentPart {
  type: 'text' | 'image';
  text?: string;
  imageUrl?: string; // Signed URL — never a raw user image path
  imageBase64?: string; // Only for server-side use
}

export interface AIResponse {
  content: string;
  provider: AIProviderName;
  model: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
  confidence?: number;
}

export interface ImageInput {
  signedUrl: string;
}

// ────────────────────────────────────────────────────────────────────────────
// PROVIDER CAPABILITY FLAGS
// Not all providers support all modalities
// ────────────────────────────────────────────────────────────────────────────

export interface AIProviderCapabilities {
  text: boolean;
  vision: boolean;
  streaming: boolean;
}

/**
 * AIProvider interface.
 * Every provider adapter must implement this.
 */
export interface AIProvider {
  name: AIProviderName;
  capabilities: AIProviderCapabilities;

  generateText(prompt: AIPrompt): Promise<AIResponse>;
  generateVision(image: ImageInput, prompt: AIPrompt): Promise<AIResponse>;
  streamText?(prompt: AIPrompt): AsyncGenerator<string>;
}

// ────────────────────────────────────────────────────────────────────────────
// AURA AI SERVICE INTERFACES
// Separated by domain — per ARCHITECTURE.md §7
// ────────────────────────────────────────────────────────────────────────────

/** Vision: identify clothing attributes from an image */
export interface VisionService {
  recognizeClothing(imageInput: ImageInput): Promise<ClothingRecognitionResult>;
}

/** Style: provide outfit compatibility opinions */
export interface StyleService {
  rateOutfitCompatibility(outfitContext: OutfitContext): Promise<StyleOpinion>;
  suggestImprovements(outfitContext: OutfitContext): Promise<string[]>;
}

/** Outfit: generate outfit suggestions from wardrobe */
export interface OutfitService {
  generateOutfit(request: OutfitRequest): Promise<OutfitSuggestion>;
  completeOutfit(partialRequest: PartialOutfitRequest): Promise<OutfitSuggestion>;
}

/** Personalization: manage user style representation */
export interface PersonalizationService {
  updateFromFeedback(userId: string, event: FeedbackContext): Promise<void>;
  getStyleProfile(userId: string): Promise<StyleProfile>;
}

// ────────────────────────────────────────────────────────────────────────────
// DOMAIN TYPES FOR AI SERVICES
// ────────────────────────────────────────────────────────────────────────────

export interface ClothingRecognitionResult {
  category?: { value: string; confidence: number };
  subcategory?: { value: string; confidence: number };
  primaryColor?: { value: string; confidence: number };
  pattern?: { value: string; confidence: number };
  material?: { value: string; confidence: number };
  fit?: { value: string; confidence: number };
  formality?: { value: string; confidence: number };
  occasions?: string[];
  seasons?: string[];
  // Low confidence fields flagged for user review
  requiresUserReview: string[];
}

export interface OutfitContext {
  items: Array<{ slot: string; itemId: string }>;
  occasion?: string;
  weather?: string;
  location?: string;
}

export interface StyleOpinion {
  score: number; // 0–1 (AI opinion, not objective truth)
  summary: string;
  strengths: string[];
  suggestions: string[];
}

export interface OutfitRequest {
  userId: string;
  occasion?: string;
  weather?: string;
  location?: string;
  naturalLanguagePrompt?: string;
}

export interface PartialOutfitRequest extends OutfitRequest {
  lockedSlots: Array<{ slot: string; itemId: string }>;
}

export interface OutfitSuggestion {
  slots: Array<{ slot: string; wardrobeItemId: string; reasoning?: string }>;
  summary: string;
  confidence: number;
}

export interface FeedbackContext {
  signal: string;
  outfitId?: string;
  itemId?: string;
}

export interface StyleProfile {
  userId: string;
  preferredColors: string[];
  preferredFits: string[];
  preferredOccasions: string[];
  dislikedPatterns: string[];
  updatedAt: string;
}
