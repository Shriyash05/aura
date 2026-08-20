import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Palette, Radius, Spacing, FontSize, FontWeight } from '@/constants/theme';
import { ScreenHeader } from '@/components/shared/ScreenHeader';
import { useAuraStore } from '@/stores/auraStore';
import { analyseLocally } from '@/services/wardrobe/analysis';

export default function AddItemScreen() {
  const [uri, setUri] = useState<string>();
  const [loading, setLoading] = useState(false);
  const user = useAuraStore((s) => s.user);
  const addItem = useAuraStore((s) => s.addItem);
  const choose = async (camera: boolean) => {
    const result = camera
      ? await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.75 })
      : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.75 });
    if (!result.canceled) setUri(result.assets[0].uri);
  };
  const save = () => {
    if (!uri || !user) return;
    setLoading(true);
    const analysis = analyseLocally(uri.split('/').pop());
    const now = new Date().toISOString();
    addItem({ id: `item-${Date.now()}`, userId: user.id, name: analysis.subcategory?.replace('-', ' ') ?? 'New wardrobe item', category: analysis.category, subcategory: analysis.subcategory, primaryColor: analysis.primaryColor, secondaryColors: analysis.secondaryColors, pattern: analysis.pattern, material: analysis.material, fit: analysis.fit, formality: analysis.formality, occasions: analysis.occasions, seasons: analysis.seasons, styleTags: analysis.styleTags, aiAttributes: analysis.aiAttributes, imageUrl: uri, thumbnailUrl: uri, originalImageUrl: uri, isFavorite: false, isArchived: false, addedAt: now, wearCount: 0 });
    setLoading(false);
    Alert.alert('Added to your wardrobe', 'You can review the attributes from your wardrobe.');
    router.replace('/(tabs)/wardrobe');
  };
  return <SafeAreaView style={styles.container} edges={['top']}><ScreenHeader title="Add to wardrobe" subtitle="A private photo, organised for you" /><View style={styles.content}>{uri ? <Image source={{ uri }} style={styles.preview} /> : <View style={styles.placeholder}><Text style={styles.placeholderIcon}>✦</Text><Text style={styles.placeholderTitle}>Add a clothing photo</Text><Text style={styles.placeholderCopy}>Use a clear photo of one item on a plain background when possible.</Text></View>}<View style={styles.actions}><TouchableOpacity style={styles.secondary} onPress={() => choose(true)}><Text style={styles.secondaryText}>Take photo</Text></TouchableOpacity><TouchableOpacity style={styles.secondary} onPress={() => choose(false)}><Text style={styles.secondaryText}>Choose from library</Text></TouchableOpacity></View>{uri && <TouchableOpacity style={styles.primary} onPress={save} disabled={loading}><Text style={styles.primaryText}>{loading ? 'Analysing item…' : 'Add item'}</Text></TouchableOpacity>}<Text style={styles.privacy}>Photos stay private. Analysis is local in this MVP build until the secure server-side vision service is configured.</Text></View></SafeAreaView>;
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: Palette.black }, content: { flex: 1, padding: Spacing[5] }, placeholder: { height: 300, borderWidth: 1, borderStyle: 'dashed', borderColor: Palette.glassBorder, borderRadius: Radius.lg, alignItems: 'center', justifyContent: 'center', padding: Spacing[6], backgroundColor: Palette.surface1 }, placeholderIcon: { fontSize: 44, color: Palette.accent }, placeholderTitle: { color: Palette.textPrimary, fontSize: FontSize.lg, fontWeight: FontWeight.semiBold, marginTop: Spacing[3] }, placeholderCopy: { color: Palette.textSecondary, textAlign: 'center', fontSize: FontSize.sm, lineHeight: 20, marginTop: Spacing[2] }, preview: { height: 300, width: '100%', borderRadius: Radius.lg, resizeMode: 'cover', backgroundColor: Palette.surface1 }, actions: { flexDirection: 'row', gap: Spacing[3], marginTop: Spacing[4] }, secondary: { flex: 1, alignItems: 'center', borderWidth: 1, borderColor: Palette.glassBorder, borderRadius: Radius.full, padding: Spacing[3] }, secondaryText: { color: Palette.textPrimary, fontWeight: FontWeight.semiBold }, primary: { backgroundColor: Palette.accent, borderRadius: Radius.full, padding: Spacing[4], alignItems: 'center', marginTop: Spacing[3] }, primaryText: { color: Palette.white, fontSize: FontSize.base, fontWeight: FontWeight.semiBold }, privacy: { color: Palette.textTertiary, fontSize: FontSize.xs, textAlign: 'center', lineHeight: 17, marginTop: Spacing[5] } });
