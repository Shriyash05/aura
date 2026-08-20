import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Palette, Spacing, FontSize, FontWeight } from '@/constants/theme';
import { ScreenHeader } from '@/components/shared/ScreenHeader';
import { EmptyState } from '@/components/shared/EmptyState';

/**
 * Shop Screen — Phase 1 Shell
 *
 * PRD §60: Recommended for you, fill wardrobe gaps,
 * works with your wardrobe, budget collections,
 * saved products, relevant new arrivals.
 *
 * Phase 16+: Full smart shopping implementation.
 */
export default function ShopScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Shop" subtitle="Wardrobe-aware" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <EmptyState
          icon="🛍️"
          title="Smart shopping coming soon"
          description="AURA will analyse your wardrobe and recommend exactly what you actually need — not just what looks good alone."
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.black,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[8],
  },
});
