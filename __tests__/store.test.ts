import { useAuraStore } from '../stores/auraStore';
describe('local state safety', () => {
  beforeEach(() => useAuraStore.setState({ user: null, wardrobe: [], outfits: [], feedback: [], onboardingComplete: false }));
  it('clears private cached data on sign out', () => {
    useAuraStore.getState().signIn('owner@example.com');
    useAuraStore.getState().signOut();
    expect(useAuraStore.getState().user).toBeNull();
    expect(useAuraStore.getState().wardrobe).toEqual([]);
  });
  it('does not persist feedback without an authenticated user', () => {
    useAuraStore.getState().reactToOutfit('outfit-1', 'like');
    expect(useAuraStore.getState().feedback).toEqual([]);
  });
});
