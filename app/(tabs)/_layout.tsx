import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { GlassTabBar } from '@/components/navigation/GlassTabBar';

/**
 * Tab layout — Phase 1 navigation shell.
 * Five primary P0 tabs: Home, Wardrobe, Add, Outfits, Profile.
 * Create tab is visually prominent per PRD §56.
 */
export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <GlassTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="wardrobe" options={{ title: 'Wardrobe' }} />
      <Tabs.Screen name="create" options={{ title: 'Add' }} />
      <Tabs.Screen name="style" options={{ title: 'Outfits' }} />
      <Tabs.Screen name="shop" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
