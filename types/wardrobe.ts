/**
 * AURA Wardrobe — Wardrobe Item Types
 *
 * Forward-compatible schema for Phase 4+ Digital Wardrobe.
 * Designed to accommodate Indian fashion categories.
 */

// ────────────────────────────────────────────────────────────────────────────
// CLOTHING CATEGORIES
// ────────────────────────────────────────────────────────────────────────────

export type WardrobeCategory =
  | 'tops'
  | 'bottoms'
  | 'one-piece'
  | 'traditional'
  | 'outerwear'
  | 'footwear'
  | 'accessories';

export type WardrobeSubcategory =
  // Tops
  | 't-shirt'
  | 'shirt'
  | 'polo'
  | 'tank-top'
  | 'hoodie'
  | 'sweatshirt'
  | 'jacket'
  | 'overshirt'
  | 'kurta'
  | 'kurti'
  // Bottoms
  | 'jeans'
  | 'trousers'
  | 'chinos'
  | 'cargo-pants'
  | 'shorts'
  | 'joggers'
  | 'skirt'
  | 'salwar'
  | 'dhoti'
  // One piece
  | 'dress'
  | 'jumpsuit'
  | 'co-ords'
  | 'ethnic-set'
  // Traditional
  | 'saree'
  | 'lehenga'
  | 'sherwani'
  | 'nehru-jacket'
  | 'kurta-set'
  | 'salwar-suit'
  // Outerwear
  | 'blazer'
  | 'coat'
  | 'windbreaker'
  | 'denim-jacket'
  // Footwear
  | 'sneakers'
  | 'loafers'
  | 'formal-shoes'
  | 'boots'
  | 'sandals'
  | 'slides'
  | 'heels'
  | 'flats'
  | 'ethnic-footwear'
  // Accessories
  | 'watch'
  | 'sunglasses'
  | 'belt'
  | 'bag'
  | 'jewellery'
  | 'cap'
  | 'hat'
  | 'scarf'
  | 'tie';

export type Formality = 'casual' | 'smart-casual' | 'business-casual' | 'formal' | 'ethnic' | 'party' | 'activewear';

export type Season = 'summer' | 'winter' | 'monsoon' | 'spring' | 'all-season';

export type Fit = 'slim' | 'regular' | 'relaxed' | 'oversized' | 'tailored';

// ────────────────────────────────────────────────────────────────────────────
// WARDROBE ITEM
// ────────────────────────────────────────────────────────────────────────────

export interface WardrobeItem {
  id: string;
  userId: string;

  // Identity
  name?: string; // User-given name
  brand?: string;
  notes?: string;

  // Classification
  category: WardrobeCategory;
  subcategory?: WardrobeSubcategory;

  // Visual attributes
  primaryColor: string;
  secondaryColors?: string[];
  pattern?: string; // 'solid' | 'stripes' | 'checks' | 'floral' | etc.
  material?: string;
  fit?: Fit;

  // Style metadata
  formality?: Formality;
  occasions?: string[];
  seasons?: Season[];
  styleTags?: string[];

  // AI-extracted attributes (confidence 0–1)
  aiAttributes?: AIAttributes;

  // Images
  imageUrl?: string; // Primary display image
  thumbnailUrl?: string;
  originalImageUrl?: string; // Private original

  // Lifecycle
  isFavorite: boolean;
  isArchived: boolean;
  addedAt: string;
  lastWornAt?: string;
  wearCount: number;
  purchasePrice?: number;
  purchaseCurrency?: string;
  retailer?: string;
}

export interface AIAttributes {
  category?: { value: WardrobeCategory; confidence: number };
  subcategory?: { value: WardrobeSubcategory; confidence: number };
  primaryColor?: { value: string; confidence: number };
  pattern?: { value: string; confidence: number };
  material?: { value: string; confidence: number };
  fit?: { value: Fit; confidence: number };
  formality?: { value: Formality; confidence: number };
  // Items where confidence < 0.7 should be flagged for user review
}

// ────────────────────────────────────────────────────────────────────────────
// OUTFIT SLOT TYPES (for Phase 7 Mix & Match)
// ────────────────────────────────────────────────────────────────────────────

export type OutfitSlot =
  | 'top'
  | 'bottom'
  | 'dress'
  | 'outerwear'
  | 'footwear'
  | 'accessory'
  | 'bag'
  | 'jewellery'
  | 'headwear';
