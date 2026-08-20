import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Palette, Spacing, FontSize, FontWeight, Radius,
} from '@/constants/theme';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

/**
 * ErrorState — consistent error display.
 *
 * Use for failed network requests, permission denials, etc.
 * Never expose raw internal error messages to the user.
 */
export function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry ? (
        <TouchableOpacity
          style={styles.button}
          onPress={onRetry}
          activeOpacity={0.8}
          accessibilityLabel="Retry"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Try again</Text>
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
    fontSize: 48,
    color: Palette.error,
    marginBottom: Spacing[4],
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semiBold,
    color: Palette.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing[2],
  },
  message: {
    fontSize: FontSize.sm,
    color: Palette.textSecondary,
    textAlign: 'center',
    lineHeight: FontSize.sm * 1.6,
    marginBottom: Spacing[6],
  },
  button: {
    backgroundColor: Palette.errorMuted,
    borderWidth: 1,
    borderColor: Palette.error,
    paddingHorizontal: Spacing[6],
    paddingVertical: Spacing[3],
    borderRadius: Radius.full,
  },
  buttonText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
    color: Palette.error,
  },
});
