/**
 * AURA Wardrobe — Liquid Glass Design Token System
 *
 * Core principle: Performance and readability over visual effects.
 * Use glass surfaces sparingly on meaningful surfaces only.
 * Not everything needs to be glass.
 */

// ────────────────────────────────────────────────────────────────────────────
// COLOR PALETTE
// ────────────────────────────────────────────────────────────────────────────

export const Palette = {
  // Deep charcoal-black base — premium dark mode
  black: '#0A0A0F',
  black90: '#111118',
  black80: '#16161F',
  black70: '#1C1C27',

  // Neutral surfaces
  surface1: '#1A1A24',
  surface2: '#222230',
  surface3: '#2A2A3C',

  // Primary accent — a refined, fashion-forward violet-purple
  accent: '#7C6FF7',
  accentLight: '#9D94FA',
  accentDark: '#5B52D6',
  accentMuted: 'rgba(124, 111, 247, 0.15)',

  // Secondary accent — rose gold for warmth
  rose: '#E8A598',
  roseLight: '#F0C4BA',
  roseMuted: 'rgba(232, 165, 152, 0.15)',

  // Typography
  textPrimary: '#F0F0F8',
  textSecondary: '#A0A0B8',
  textTertiary: '#606078',
  textDisabled: '#404058',

  // System feedback
  success: '#4ADE80',
  successMuted: 'rgba(74, 222, 128, 0.15)',
  warning: '#FBBF24',
  warningMuted: 'rgba(251, 191, 36, 0.15)',
  error: '#F87171',
  errorMuted: 'rgba(248, 113, 113, 0.15)',

  // Glass surfaces (translucent)
  glass: 'rgba(255, 255, 255, 0.08)',
  glassMedium: 'rgba(255, 255, 255, 0.12)',
  glassStrong: 'rgba(255, 255, 255, 0.18)',
  glassBorder: 'rgba(255, 255, 255, 0.12)',
  glassBorderLight: 'rgba(255, 255, 255, 0.06)',

  // Dark glass (for overlays on content)
  darkGlass: 'rgba(10, 10, 15, 0.7)',
  darkGlassMedium: 'rgba(10, 10, 15, 0.5)',

  // Pure
  white: '#FFFFFF',
  transparent: 'transparent',
} as const;

// ────────────────────────────────────────────────────────────────────────────
// GLASS TOKENS
// Centralized liquid glass design primitives
// ────────────────────────────────────────────────────────────────────────────

export const Glass = {
  // Blur intensity levels
  blur: {
    subtle: 10,
    medium: 20,
    strong: 40,
    intense: 60,
  },

  // Background fill for glass surfaces
  background: {
    subtle: 'rgba(255, 255, 255, 0.05)',
    light: 'rgba(255, 255, 255, 0.08)',
    medium: 'rgba(255, 255, 255, 0.12)',
    strong: 'rgba(255, 255, 255, 0.18)',
  },

  // Border
  border: {
    subtle: 'rgba(255, 255, 255, 0.06)',
    light: 'rgba(255, 255, 255, 0.10)',
    medium: 'rgba(255, 255, 255, 0.15)',
    accent: 'rgba(124, 111, 247, 0.30)',
  },

  // Highlight (top edge shimmer)
  highlight: {
    top: 'rgba(255, 255, 255, 0.12)',
    bottom: 'rgba(255, 255, 255, 0.0)',
  },
} as const;

// ────────────────────────────────────────────────────────────────────────────
// TYPOGRAPHY
// ────────────────────────────────────────────────────────────────────────────

export const FontFamily = {
  // Use system fonts for Phase 1 performance
  // Will add custom fonts (e.g., Inter) in Phase 8
  regular: undefined, // System default
  medium: undefined,
  semiBold: undefined,
  bold: undefined,
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 34,
  '4xl': 40,
} as const;

export const LineHeight = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  black: '900' as const,
};

// ────────────────────────────────────────────────────────────────────────────
// SPACING
// ────────────────────────────────────────────────────────────────────────────

export const Spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

// ────────────────────────────────────────────────────────────────────────────
// BORDER RADIUS
// ────────────────────────────────────────────────────────────────────────────

export const Radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  '2xl': 36,
  full: 999,
} as const;

// ────────────────────────────────────────────────────────────────────────────
// SHADOWS
// Subtle elevation for glass surfaces
// ────────────────────────────────────────────────────────────────────────────

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12,
  },
  accent: {
    shadowColor: '#7C6FF7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// ────────────────────────────────────────────────────────────────────────────
// ANIMATION
// ────────────────────────────────────────────────────────────────────────────

export const Animation = {
  // Spring configs for Reanimated
  spring: {
    gentle: { damping: 20, stiffness: 150, mass: 0.8 },
    snappy: { damping: 15, stiffness: 200, mass: 0.6 },
    bouncy: { damping: 10, stiffness: 180, mass: 0.7 },
  },
  // Timing durations (ms)
  duration: {
    fast: 150,
    normal: 250,
    slow: 400,
    verySlow: 600,
  },
} as const;

// ────────────────────────────────────────────────────────────────────────────
// LAYOUT
// ────────────────────────────────────────────────────────────────────────────

export const Layout = {
  // Tab bar
  tabBarHeight: 80,
  tabBarPaddingBottom: 20,

  // Safe horizontal padding
  screenPadding: Spacing[5],
  screenPaddingLg: Spacing[6],

  // Cards
  cardMinHeight: 160,
  clothingCardSize: 120,
  clothingCardSizeLg: 160,
  outfitCardHeight: 280,

  // Carousel
  carouselItemSize: 110,
  carouselItemSpacing: Spacing[3],

  // Touch targets (minimum 44pt for accessibility)
  minTouchTarget: 44,
} as const;

// ────────────────────────────────────────────────────────────────────────────
// COMBINED THEME EXPORT
// ────────────────────────────────────────────────────────────────────────────

export const Theme = {
  colors: Palette,
  glass: Glass,
  font: {
    family: FontFamily,
    size: FontSize,
    lineHeight: LineHeight,
    weight: FontWeight,
  },
  spacing: Spacing,
  radius: Radius,
  shadow: Shadow,
  animation: Animation,
  layout: Layout,
} as const;

export type ThemeType = typeof Theme;
