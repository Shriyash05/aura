import type { UserProfile } from '@/types/user';
import { supabase } from '@/lib/supabase/client';
import { AuthError } from '@/utils/errors';
const profile = (id: string, email?: string, displayName?: string): UserProfile => { const now = new Date().toISOString(); return { id, email: email ?? '', displayName, createdAt: now, updatedAt: now }; };
export const authService = {
  isRemote: Boolean(supabase),
  async restore(): Promise<UserProfile | null> { if (!supabase) return null; const { data, error } = await supabase.auth.getSession(); if (error) throw new AuthError('We could not restore your session. Please sign in again.'); const user = data.session?.user; return user ? profile(user.id, user.email, user.user_metadata.display_name) : null; },
  async signIn(email: string, password: string): Promise<UserProfile> { if (!supabase) throw new AuthError('Remote authentication is not configured.'); const { data, error } = await supabase.auth.signInWithPassword({ email, password }); if (error || !data.user) throw new AuthError(error?.message === 'Invalid login credentials' ? 'Email or password is incorrect.' : 'Unable to sign in. Please try again.'); return profile(data.user.id, data.user.email, data.user.user_metadata.display_name); },
  async signUp(email: string, password: string): Promise<UserProfile> { if (!supabase) throw new AuthError('Remote authentication is not configured.'); const { data, error } = await supabase.auth.signUp({ email, password }); if (error || !data.user) throw new AuthError(error?.message ?? 'Unable to create your account.'); return profile(data.user.id, data.user.email); },
  async signOut(): Promise<void> { if (!supabase) return; const { error } = await supabase.auth.signOut(); if (error) throw new AuthError('Unable to sign out. Please try again.'); },
};
