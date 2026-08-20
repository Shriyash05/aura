/**
 * AURA Wardrobe — Outfit Types
 *
 * Forward-compatible with Phase 7 Mix & Match and Phase 9 AI Stylist.
 */

import type { OutfitSlot, WardrobeItem } from './wardrobe';

// ────────────────────────────────────────────────────────────────────────────
// OUTFIT
// ────────────────────────────────────────────────────────────────────────────

export interface Outfit {
  id: string;
  userId: string;

  name?: string; // e.g. "Goa Sunset", "Date Night"
  occasion?: string;
  notes?: string;

  // Ordered list of slots and the items filling them
  slots: OutfitSlotItem[];

  // Collections this outfit belongs to
  collections?: string[];

  // Status
  isFavorite: boolean;
  isWorn: boolean;
  lastWornAt?: string;
  wearCount: number;

  // AI metadata
  aiGenerated: boolean;
  aiScore?: number; // 0–1 compatibility score (AI opinion, not objective truth)

  createdAt: string;
  updatedAt: string;
}

export interface OutfitSlotItem {
  slot: OutfitSlot;
  wardrobeItemId: string;

  // For display — resolved at query time
  wardrobeItem?: WardrobeItem;

  // For Mix & Match UI
  isLocked: boolean;
}

// ────────────────────────────────────────────────────────────────────────────
// OUTFIT BUILDER STATE (Phase 7 Mix & Match)
// ────────────────────────────────────────────────────────────────────────────

export interface OutfitBuilderState {
  slots: Partial<Record<OutfitSlot, OutfitBuilderSlot>>;
  mode: 'manual' | 'ai' | 'hybrid';
}

export interface OutfitBuilderSlot {
  item?: WardrobeItem;
  isLocked: boolean;
  isLoading: boolean;
}

// ────────────────────────────────────────────────────────────────────────────
// FEEDBACK
// ────────────────────────────────────────────────────────────────────────────

export type FeedbackSignal =
  | 'like'
  | 'dislike'
  | 'save'
  | 'wear'
  | 'skip'
  | 'replace'
  | 'shuffle'
  | 'lock';

export interface FeedbackEvent {
  id: string;
  userId: string;
  outfitId?: string;
  itemId?: string;
  signal: FeedbackSignal;
  context?: Record<string, unknown>;
  createdAt: string;
}

// ────────────────────────────────────────────────────────────────────────────
// COLLECTIONS
// ────────────────────────────────────────────────────────────────────────────

export interface OutfitCollection {
  id: string;
  userId: string;
  name: string; // e.g. "Goa", "College", "Office", "Dates"
  outfitIds: string[];
  coverImageUrl?: string;
  createdAt: string;
}
