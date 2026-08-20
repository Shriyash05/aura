import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Palette, Spacing, FontSize, FontWeight, Radius, Glass,
} from '@/constants/theme';
import { ScreenHeader } from '@/components/shared/ScreenHeader';
import { useAuraStore } from '@/stores/auraStore';
import { router } from 'expo-router';

/**
 * Profile Screen — Phase 1 Shell
 *
 * PRD §61: Account, sizes, preferences, style profile,
 * budget, location, privacy, learning consent,
 * connected services, data deletion, logout.
 *
 * Phase 2+: Auth & real profile data.
 * Phase 3+: Onboarding flow.
 */

const PROFILE_SECTIONS = [
  {
    id: 'account',
    title: 'Account',
    items: [
      { id: 'display-name', label: 'Display name', value: '—' },
      { id: 'email', label: 'Email', value: '—' },
    ],
  },
  {
    id: 'preferences',
    title: 'Preferences',
    items: [
      { id: 'sizes', label: 'My sizes', value: 'Not set' },
      { id: 'budget', label: 'Monthly budget', value: 'Not set' },
      { id: 'location', label: 'Location', value: 'Not set' },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy & Learning',
    items: [
      { id: 'learning', label: 'Help improve AURA', value: 'Off' },
      { id: 'analytics', label: 'Analytics', value: 'Off' },
      { id: 'data', label: 'Delete all data', value: '' },
    ],
  },
] as const;

export default function ProfileScreen() {
  const { user, signOut, wardrobe, feedback } = useAuraStore();
  const logout = () => {
    signOut();
    router.replace('/(auth)/sign-in');
  };
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Profile" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar placeholder */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>{user?.displayName?.slice(0, 1).toUpperCase() ?? 'A'}</Text>
          </View>
          <Text style={styles.userName}>{user?.displayName ?? 'Your profile'}</Text>
          <Text style={styles.userEmail}>{user?.email ?? 'Your wardrobe, your way'}</Text>
        </View>

        {/* Section list */}
        {PROFILE_SECTIONS.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, idx) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.sectionRow,
                    idx < section.items.length - 1 && styles.sectionRowBorder,
                  ]}
                  activeOpacity={0.6}
                  accessibilityLabel={item.label}
                >
                  <Text style={styles.rowLabel}>{item.label}</Text>
                  <Text style={styles.rowValue}>{item.value}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.stats}>
          <Text style={styles.statsText}>{wardrobe.length} items · {feedback.length} style signals</Text>
        </View>
        <TouchableOpacity style={styles.signInButton} activeOpacity={0.8} onPress={logout}>
          <Text style={styles.signInButtonText}>Sign out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>AURA Wardrobe v0.1.0</Text>
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
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[8],
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: Spacing[6],
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Glass.background.medium,
    borderWidth: 1,
    borderColor: Glass.border.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing[3],
  },
  avatarInitial: {
    fontSize: FontSize['2xl'],
    color: Palette.accent,
    fontWeight: FontWeight.semiBold,
  },
  userName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semiBold,
    color: Palette.textPrimary,
  },
  userEmail: {
    fontSize: FontSize.sm,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  section: {
    marginBottom: Spacing[4],
  },
  sectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semiBold,
    color: Palette.textTertiary,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: Spacing[2],
    paddingHorizontal: Spacing[1],
  },
  sectionCard: {
    backgroundColor: Glass.background.light,
    borderWidth: 1,
    borderColor: Glass.border.subtle,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3] + 2,
  },
  sectionRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Glass.border.subtle,
  },
  rowLabel: {
    fontSize: FontSize.base,
    color: Palette.textPrimary,
  },
  rowValue: {
    fontSize: FontSize.sm,
    color: Palette.textSecondary,
  },
  signInButton: {
    backgroundColor: Palette.accent,
    borderRadius: Radius.full,
    paddingVertical: Spacing[4],
    alignItems: 'center',
    marginTop: Spacing[4],
    marginBottom: Spacing[4],
  },
  signInButtonText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
    color: Palette.white,
    letterSpacing: 0.3,
  },
  version: {
    textAlign: 'center',
    fontSize: FontSize.xs,
    color: Palette.textTertiary,
    marginTop: Spacing[2],
  },
  stats: {
    alignItems: 'center',
    marginTop: Spacing[2],
  },
  statsText: {
    color: Palette.textSecondary,
    fontSize: FontSize.sm,
  },
});
