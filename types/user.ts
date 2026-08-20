/**
 * AURA Wardrobe — Core User Types
 */

export interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  location?: string;
  city?: string;

  // Style preferences (set during onboarding)
  preferences?: UserPreferences;

  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
  sizes?: ClothingSizes;
  preferredFits?: string[];
  preferredColors?: string[];
  dislikedColors?: string[];
  preferredBrands?: string[];
  monthlyBudget?: number;
  currency?: string; // Default: 'INR'
  commonOccasions?: string[];
  lifestyle?: string[];
  styleKeywords?: string[];

  // Learning consent
  consentGlobalLearning?: boolean;
  consentAnalytics?: boolean;
}

export interface ClothingSizes {
  top?: string; // 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | ...
  bottom?: string;
  shoe?: string; // '38' | '39' | '40' | ...
  dress?: string;
}
