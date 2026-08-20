import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Palette, Spacing, FontSize, FontWeight, Glass, Radius,
} from '@/constants/theme';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
  showAvatar?: boolean;
  onSearchPress?: () => void;
  onAvatarPress?: () => void;
}

/**
 * ScreenHeader — consistent top bar for all screens.
 *
 * Used across all primary tabs.
 * Does not use navigation header bar to allow custom styling.
 */
export function ScreenHeader({
  title,
  subtitle,
  showSearch,
  showAvatar,
  onSearchPress,
  onAvatarPress,
}: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.right}>
        {showSearch && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onSearchPress}
            accessibilityLabel="Search"
            activeOpacity={0.7}
          >
            <Text style={styles.iconText}>⌕</Text>
          </TouchableOpacity>
        )}
        {showAvatar && (
          <TouchableOpacity
            style={styles.avatar}
            onPress={onAvatarPress}
            accessibilityLabel="Profile"
            activeOpacity={0.7}
          >
            <Text style={styles.avatarText}>A</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[4],
    paddingBottom: Spacing[3],
  },
  left: {
    flex: 1,
  },
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    color: Palette.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Palette.textSecondary,
    marginTop: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Glass.background.light,
    borderWidth: 1,
    borderColor: Glass.border.subtle,
    borderRadius: Radius.sm,
  },
  iconText: {
    fontSize: FontSize.lg,
    color: Palette.textSecondary,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Glass.background.medium,
    borderWidth: 1,
    borderColor: Glass.border.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
    color: Palette.accent,
  },
});
