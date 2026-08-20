import React from 'react';
import { View, StyleSheet, type ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { Glass, Radius, Shadow } from '@/constants/theme';

interface GlassCardProps extends ViewProps {
  intensity?: number;
  elevated?: boolean;
  children: React.ReactNode;
}

/**
 * GlassCard — Liquid Glass surface primitive.
 *
 * Use this for prominent UI surfaces that deserve glass treatment.
 * Do not apply to every surface — use sparingly per AGENTS.md.
 *
 * Phase 8: Full Liquid Glass polish with highlights and reflections.
 */
export function GlassCard({
  intensity = 20,
  elevated = false,
  style,
  children,
  ...rest
}: GlassCardProps) {
  return (
    <View
      style={[
        styles.container,
        elevated && Shadow.md,
        style,
      ]}
      {...rest}
    >
      <BlurView
        intensity={intensity}
        tint="dark"
        style={StyleSheet.absoluteFill}
      />
      {/* Top highlight */}
      <View style={styles.highlight} />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Glass.border.subtle,
    position: 'relative',
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Glass.highlight.top,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});
