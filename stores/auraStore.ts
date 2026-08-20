import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { FeedbackSignal, Outfit, FeedbackEvent } from '@/types/outfit';
import type { UserProfile } from '@/types/user';
import type { WardrobeItem } from '@/types/wardrobe';
import { authService } from '@/services/auth/authService';
import { wardrobeRepository } from '@/services/data/wardrobeRepository';
import { outfitRepository } from '@/services/data/outfitRepository';

export type OnboardingDraft = Pick<NonNullable<UserProfile['preferences']>, 'styleKeywords' | 'commonOccasions' | 'preferredColors'>;

interface AuraState {
  hydrated: boolean;
  authChecked: boolean;
  user: UserProfile | null;
  onboardingComplete: boolean;
  wardrobe: WardrobeItem[];
  outfits: Outfit[];
  feedback: FeedbackEvent[];
  syncError: string | null;
  finishHydration: () => void;
  signIn: (email: string, displayName?: string) => void;
  signInRemote: (email: string, password: string) => Promise<void>;
  signUpRemote: (email: string, password: string) => Promise<void>;
  restoreSession: () => Promise<void>;
  syncWardrobe: () => Promise<void>;
  signOut: () => void;
  completeOnboarding: (draft: OnboardingDraft) => void;
  addItem: (item: WardrobeItem) => void;
  removeItem: (itemId: string) => void;
  addOutfit: (outfit: Outfit) => void;
  reactToOutfit: (outfitId: string, signal: FeedbackSignal) => void;
}

export const useAuraStore = create<AuraState>()(persist((set, get) => ({
  hydrated: false, authChecked: false, user: null, onboardingComplete: false, wardrobe: [], outfits: [], feedback: [], syncError: null,
  finishHydration: () => set({ hydrated: true }),
  signIn: (email, displayName) => {
    const now = new Date().toISOString();
    set({ user: { id: `local-${email.trim().toLowerCase()}`, email: email.trim().toLowerCase(), displayName: displayName || email.split('@')[0], createdAt: now, updatedAt: now } });
  },
  signInRemote: async (email, password) => { const user = await authService.signIn(email, password); set({ user, syncError: null }); await get().syncWardrobe(); },
  signUpRemote: async (email, password) => { const user = await authService.signUp(email, password); set({ user, syncError: null }); },
  restoreSession: async () => { try { const user = await authService.restore(); if (user) { set({ user }); await get().syncWardrobe(); } } catch { set({ syncError: 'We could not restore your cloud session. Please sign in again.' }); } finally { set({ authChecked: true }); } },
  syncWardrobe: async () => { if (!wardrobeRepository.isRemote) return; try { const wardrobe = await wardrobeRepository.list(); set({ wardrobe, syncError: null }); } catch { set({ syncError: 'Changes are saved on this device and will retry when you reconnect.' }); } },
  signOut: () => { void authService.signOut(); set({ user: null, onboardingComplete: false, wardrobe: [], outfits: [], feedback: [] }); },
  completeOnboarding: (draft) => set((state) => state.user ? { onboardingComplete: true, user: { ...state.user, preferences: { ...state.user.preferences, ...draft }, updatedAt: new Date().toISOString() } } : {}),
  addItem: (item) => { set((state) => ({ wardrobe: [item, ...state.wardrobe] })); void wardrobeRepository.save(item).catch(() => set({ syncError: 'Item saved on this device. Cloud sync will retry later.' })); },
  removeItem: (itemId) => { const item = get().wardrobe.find((entry) => entry.id === itemId); set((state) => ({ wardrobe: state.wardrobe.filter((entry) => entry.id !== itemId) })); if (item) void wardrobeRepository.remove(item).catch(() => set({ syncError: 'Item removed locally but cloud deletion needs retrying.' })); },
  addOutfit: (outfit) => { set((state) => ({ outfits: [outfit, ...state.outfits] })); void outfitRepository.save(outfit).catch(() => set({ syncError: 'Outfit saved on this device. Cloud sync will retry later.' })); },
  reactToOutfit: (outfitId, signal) => {
    const user = get().user;
    if (!user) return;
    const now = new Date().toISOString();
    set((state) => ({
      outfits: state.outfits.map((outfit) => outfit.id === outfitId ? { ...outfit, isFavorite: signal === 'like' || signal === 'save' ? true : outfit.isFavorite, updatedAt: now } : outfit),
      feedback: [{ id: `feedback-${Date.now()}`, userId: user.id, outfitId, signal, createdAt: now }, ...state.feedback],
    }));
    const event = get().feedback[0];
    if (event) void outfitRepository.feedback(event).catch(() => set({ syncError: 'Your feedback is saved on this device and will retry later.' }));
  },
}), { name: 'aura-mvp', storage: createJSONStorage(() => AsyncStorage), onRehydrateStorage: () => (state) => state?.finishHydration() }));
