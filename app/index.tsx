import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useAuraStore } from '@/stores/auraStore';

export default function Index() {
  const { hydrated, authChecked, user, onboardingComplete, restoreSession } = useAuraStore();
  useEffect(() => { if (hydrated) void restoreSession(); }, [hydrated, restoreSession]);
  if (!hydrated || !authChecked) return <View />;
  if (!user) return <Redirect href="/(auth)/sign-in" />;
  return <Redirect href={onboardingComplete ? '/(tabs)' : '/onboarding'} />;
}
