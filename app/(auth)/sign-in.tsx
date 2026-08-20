import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Palette, Radius, Spacing, FontSize, FontWeight } from '@/constants/theme';
import { useAuraStore } from '@/stores/auraStore';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export default function SignInScreen() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [loading, setLoading] = useState(false); const signIn = useAuraStore((state) => state.signIn); const signInRemote = useAuraStore((state) => state.signInRemote); const signUpRemote = useAuraStore((state) => state.signUpRemote);
  const submit = async (create = false) => {
    if (!/^\S+@\S+\.\S+$/.test(email)) { Alert.alert('Enter a valid email', 'Use an email address to continue.'); return; }
    if (!isSupabaseConfigured) { signIn(email); router.replace('/onboarding'); return; }
    if (password.length < 8) { Alert.alert('Use a stronger password', 'Your password must have at least 8 characters.'); return; }
    setLoading(true); try { if (create) await signUpRemote(email, password); else await signInRemote(email, password); router.replace('/onboarding'); } catch (error) { Alert.alert(create ? 'Could not create account' : 'Could not sign in', error instanceof Error ? error.message : 'Please try again.'); } finally { setLoading(false); }
  };
  return <SafeAreaView style={styles.container}><View style={styles.content}>
    <Text style={styles.brand}>AURA</Text><Text style={styles.title}>Your wardrobe,{"\n"}understood.</Text>
    <Text style={styles.copy}>Sign in to build a private digital wardrobe and get looks from what you already own.</Text>
    <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoComplete="email" placeholder="Email address" placeholderTextColor={Palette.textTertiary} style={styles.input} accessibilityLabel="Email address" />
    {isSupabaseConfigured && <TextInput value={password} onChangeText={setPassword} secureTextEntry autoComplete="password" placeholder="Password" placeholderTextColor={Palette.textTertiary} style={[styles.input, styles.password]} accessibilityLabel="Password" />}
    <TouchableOpacity style={styles.button} onPress={() => void submit(false)} disabled={loading} accessibilityRole="button"><Text style={styles.buttonText}>{loading ? 'Please wait…' : isSupabaseConfigured ? 'Sign in' : 'Continue'}</Text></TouchableOpacity>
    {isSupabaseConfigured && <TouchableOpacity onPress={() => void submit(true)} disabled={loading}><Text style={styles.secondaryAction}>New here? Create an account</Text></TouchableOpacity>}
    <Text style={styles.note}>{isSupabaseConfigured ? 'Secure authentication is provided by Supabase.' : 'Local MVP mode is active until Supabase credentials are configured.'}</Text>
  </View></SafeAreaView>;
}
const styles = StyleSheet.create({ container:{flex:1,backgroundColor:Palette.black},content:{flex:1,justifyContent:'center',padding:Spacing[6]},brand:{color:Palette.accent,fontSize:FontSize.lg,fontWeight:FontWeight.bold,letterSpacing:4,marginBottom:Spacing[5]},title:{color:Palette.textPrimary,fontSize:FontSize['3xl'],fontWeight:FontWeight.bold,letterSpacing:-1},copy:{color:Palette.textSecondary,fontSize:FontSize.md,lineHeight:25,marginTop:Spacing[4],marginBottom:Spacing[8]},input:{color:Palette.textPrimary,fontSize:FontSize.base,borderWidth:1,borderColor:Palette.glassBorder,borderRadius:Radius.md,padding:Spacing[4],backgroundColor:Palette.surface1},password:{marginTop:Spacing[3]},button:{backgroundColor:Palette.accent,borderRadius:Radius.full,padding:Spacing[4],alignItems:'center',marginTop:Spacing[3]},buttonText:{color:Palette.white,fontWeight:FontWeight.semiBold,fontSize:FontSize.base},secondaryAction:{color:Palette.accent,textAlign:'center',fontSize:FontSize.sm,marginTop:Spacing[4]},note:{color:Palette.textTertiary,textAlign:'center',fontSize:FontSize.xs,marginTop:Spacing[5]} });
