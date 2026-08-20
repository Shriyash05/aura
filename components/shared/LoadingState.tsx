import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Palette, Spacing, FontSize } from '@/constants/theme';

interface LoadingStateProps {
  message?: string;
}

/**
 * LoadingState — consistent loading indicator.
 *
 * Use for full-screen or section loading.
 */
export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Palette.accent} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing[12],
    gap: Spacing[4],
  },
  message: {
    fontSize: FontSize.sm,
    color: Palette.textSecondary,
  },
});
