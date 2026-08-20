import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Palette, Radius, Spacing, FontSize, FontWeight } from '@/constants/theme';
import { ScreenHeader } from '@/components/shared/ScreenHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { useAuraStore } from '@/stores/auraStore';

export default function OutfitsScreen() {
  const { outfits, reactToOutfit } = useAuraStore();
  return <SafeAreaView style={styles.container} edges={['top']}><ScreenHeader title="Outfits" subtitle="Looks from your wardrobe"/><ScrollView contentContainerStyle={styles.content}>{outfits.length === 0 ? <EmptyState icon="◈" title="No looks yet" description="Generate an outfit from Home once you have a few pieces in your wardrobe."/> : outfits.map((outfit) => <View key={outfit.id} style={styles.card}><View style={styles.images}>{outfit.slots.slice(0, 3).map((slot) => <Image key={slot.wardrobeItemId} source={{ uri: slot.wardrobeItem?.thumbnailUrl }} style={styles.image}/>)}</View><Text style={styles.name}>{outfit.name}</Text><Text style={styles.meta}>{outfit.slots.length} wardrobe pieces · {outfit.aiScore ? Math.round(outfit.aiScore * 100) : 70}% compatibility</Text><View style={styles.actions}>{([['like', '♡'], ['dislike', '×'], ['save', '⌑'], ['skip', '→']] as const).map(([signal, icon]) => <TouchableOpacity key={signal} style={styles.action} onPress={() => reactToOutfit(outfit.id, signal)} accessibilityLabel={signal}><Text style={styles.actionText}>{icon}</Text></TouchableOpacity>)}</View></View>)}</ScrollView></SafeAreaView>;
}
const styles=StyleSheet.create({container:{flex:1,backgroundColor:Palette.black},content:{padding:Spacing[5],paddingBottom:120,gap:Spacing[4]},card:{backgroundColor:Palette.surface1,borderRadius:Radius.lg,overflow:'hidden',paddingBottom:Spacing[4]},images:{height:180,flexDirection:'row',gap:2,backgroundColor:Palette.surface2},image:{flex:1,height:'100%',backgroundColor:Palette.surface2},name:{color:Palette.textPrimary,fontSize:FontSize.lg,fontWeight:FontWeight.semiBold,paddingHorizontal:Spacing[4],paddingTop:Spacing[4]},meta:{color:Palette.textSecondary,fontSize:FontSize.sm,paddingHorizontal:Spacing[4],marginTop:4},actions:{flexDirection:'row',gap:Spacing[2],paddingHorizontal:Spacing[4],marginTop:Spacing[4]},action:{width:44,height:40,borderRadius:Radius.sm,backgroundColor:Palette.surface2,alignItems:'center',justifyContent:'center'},actionText:{color:Palette.textPrimary,fontSize:FontSize.lg}});
