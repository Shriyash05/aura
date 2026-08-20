import type { AIAttributes, Fit, Formality, WardrobeCategory, WardrobeSubcategory } from '@/types/wardrobe';

export interface ClothingAnalysis {
  category: WardrobeCategory;
  subcategory?: WardrobeSubcategory;
  primaryColor: string;
  secondaryColors: string[];
  pattern: string;
  material?: string;
  fit?: Fit;
  formality: Formality;
  occasions: string[];
  seasons: Array<'summer' | 'winter' | 'monsoon' | 'spring' | 'all-season'>;
  styleTags: string[];
  confidence: number;
  aiAttributes: AIAttributes;
}

const DEFAULT_ANALYSIS: ClothingAnalysis = {
  category: 'tops', primaryColor: 'neutral', secondaryColors: [], pattern: 'solid',
  formality: 'casual', occasions: ['casual'], seasons: ['all-season'], styleTags: ['everyday'],
  confidence: 0.55, aiAttributes: {},
};

/** Validates an analysis boundary; remote AI output must pass this before storage. */
export function validateClothingAnalysis(input: Partial<ClothingAnalysis>): ClothingAnalysis {
  const categories: WardrobeCategory[] = ['tops', 'bottoms', 'one-piece', 'traditional', 'outerwear', 'footwear', 'accessories'];
  const category = categories.includes(input.category as WardrobeCategory) ? input.category as WardrobeCategory : DEFAULT_ANALYSIS.category;
  const confidence = typeof input.confidence === 'number' ? Math.max(0, Math.min(1, input.confidence)) : DEFAULT_ANALYSIS.confidence;
  return {
    ...DEFAULT_ANALYSIS,
    ...input,
    category,
    primaryColor: input.primaryColor?.trim() || DEFAULT_ANALYSIS.primaryColor,
    secondaryColors: Array.isArray(input.secondaryColors) ? input.secondaryColors.filter(Boolean).slice(0, 4) : [],
    occasions: Array.isArray(input.occasions) ? input.occasions.filter(Boolean).slice(0, 5) : DEFAULT_ANALYSIS.occasions,
    seasons: Array.isArray(input.seasons) ? input.seasons.slice(0, 5) : DEFAULT_ANALYSIS.seasons,
    styleTags: Array.isArray(input.styleTags) ? input.styleTags.filter(Boolean).slice(0, 6) : DEFAULT_ANALYSIS.styleTags,
    confidence,
    aiAttributes: input.aiAttributes ?? {},
  };
}

/** Local fallback while server-side Vision is unavailable. Never calls an AI provider. */
export function analyseLocally(fileName?: string): ClothingAnalysis {
  const text = (fileName ?? '').toLowerCase();
  const color = ['black', 'white', 'blue', 'navy', 'green', 'red', 'brown', 'beige', 'pink', 'grey'].find((value) => text.includes(value)) ?? 'neutral';
  const match = [
    ['jean', 'bottoms', 'jeans'], ['trouser', 'bottoms', 'trousers'], ['pant', 'bottoms', 'trousers'],
    ['shoe', 'footwear', 'sneakers'], ['sneaker', 'footwear', 'sneakers'], ['dress', 'one-piece', 'dress'],
    ['jacket', 'outerwear', 'jacket'], ['blazer', 'outerwear', 'blazer'], ['shirt', 'tops', 'shirt'],
    ['tee', 'tops', 't-shirt'], ['tshirt', 'tops', 't-shirt'], ['kurta', 'traditional', 'kurta'],
  ].find(([keyword]) => text.includes(keyword));
  const category = (match?.[1] ?? 'tops') as WardrobeCategory;
  const subcategory = match?.[2] as WardrobeSubcategory | undefined;
  return validateClothingAnalysis({
    category, subcategory, primaryColor: color, confidence: match ? 0.7 : 0.48,
    formality: subcategory === 'blazer' ? 'business-casual' : 'casual',
    aiAttributes: {
      category: { value: category, confidence: match ? 0.7 : 0.48 },
      ...(subcategory ? { subcategory: { value: subcategory, confidence: 0.65 } } : {}),
      primaryColor: { value: color, confidence: color === 'neutral' ? 0.35 : 0.6 },
    },
  });
}
