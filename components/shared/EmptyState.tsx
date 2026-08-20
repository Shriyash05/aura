import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Palette, Spacing, FontSize, FontWeight, Radius, Glass,
} from '@/constants/theme';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * EmptyState — consistent zero-data placeholder.
 *
 * Used when a list or section has no content.
 * Phase 1: Provides structural placeholder for all screens.
 */
export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {actionLabel && onAction ? (
        <TouchableOpacity
          style={styles.button}
          onPress={onAction}
          activeOpacity={0.8}
          accessibilityLabel={actionLabel}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing[8],
    paddingVertical: Spacing[12],
  },
  icon: {
    fontSize: 56,
    marginBottom: Spacing[5],
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semiBold,
    color: Palette.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing[3],
  },
  description: {
    fontSize: FontSize.sm,
    color: Palette.textSecondary,
    textAlign: 'center',
    lineHeight: FontSize.sm * 1.6,
    marginBottom: Spacing[6],
  },
  button: {
    backgroundColor: Palette.accent,
    paddingHorizontal: Spacing[6],
    paddingVertical: Spacing[3],
    borderRadius: Radius.full,
  },
  buttonText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
    color: Palette.white,
    letterSpacing: 0.2,
  },
});
