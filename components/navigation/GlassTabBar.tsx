import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  Palette,
  Glass,
  FontSize,
  FontWeight,
  Spacing,
  Radius,
  Layout,
} from '@/constants/theme';

/**
 * GlassTabBar — Liquid Glass bottom navigation.
 *
 * Five P0 tabs: Home, Wardrobe, Add, Outfits, Profile.
 * Create tab is visually prominent (larger, accented).
 * Uses expo-blur for glass background on supported devices.
 *
 * Architecture: Phase 1 visual foundation.
 * Phase 8: Full Liquid Glass polish.
 */

const TAB_ICONS: Record<string, { icon: string; label: string }> = {
  index: { icon: '⊙', label: 'Home' },
  wardrobe: { icon: '▦', label: 'Wardrobe' },
  create: { icon: '+', label: 'Add' },
  style: { icon: '◈', label: 'Outfits' },
  profile: { icon: '○', label: 'Profile' },
};

export function GlassTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const paddingBottom = Math.max(insets.bottom, Spacing[3]);

  return (
    <View style={[styles.wrapper, { paddingBottom }]}>
      <BlurView
        intensity={60}
        tint="dark"
        style={StyleSheet.absoluteFill}
      />
      {/* Glass border highlight at top */}
      <View style={styles.topBorder} />

      <View style={styles.tabRow}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const isCreate = route.name === 'create';
          const tabInfo = TAB_ICONS[route.name] ?? { icon: '◌', label: route.name };

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          if (isCreate) {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.createTab}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={options.title ?? tabInfo.label}
                accessibilityState={{ selected: isFocused }}
              >
                <View style={styles.createButton}>
                  <Text style={styles.createIcon}>{tabInfo.icon}</Text>
                </View>
                <Text style={styles.createLabel}>{tabInfo.label}</Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={options.title ?? tabInfo.label}
              accessibilityState={{ selected: isFocused }}
            >
              <Text style={[styles.tabIcon, isFocused && styles.tabIconFocused]}>
                {tabInfo.icon}
              </Text>
              <Text style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}>
                {tabInfo.label}
              </Text>
              {isFocused && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: 'rgba(10, 10, 15, 0.85)',
  },
  topBorder: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Glass.border.subtle,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing[2],
    paddingTop: Spacing[2],
    height: Layout.tabBarHeight,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing[1],
    position: 'relative',
  },
  tabIcon: {
    fontSize: 20,
    color: Palette.textTertiary,
    marginBottom: 2,
  },
  tabIconFocused: {
    color: Palette.accent,
  },
  tabLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    color: Palette.textTertiary,
    letterSpacing: 0.2,
  },
  tabLabelFocused: {
    color: Palette.accent,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 20,
    height: 2,
    backgroundColor: Palette.accent,
    borderRadius: Radius.full,
  },
  // Create tab — prominent
  createTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing[1],
  },
  createButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Palette.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    shadowColor: Palette.accent,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  createIcon: {
    fontSize: FontSize.xl,
    color: Palette.white,
    fontWeight: FontWeight.bold,
  },
  createLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    color: Palette.accent,
    letterSpacing: 0.2,
  },
});
