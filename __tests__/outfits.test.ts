import { generateOutfit } from '../services/outfits/generate';
import type { WardrobeItem } from '../types/wardrobe';
const item = (id: string, category: WardrobeItem['category']): WardrobeItem => ({ id, userId: 'u1', category, primaryColor: 'black', isFavorite: false, isArchived: false, addedAt: '2026-01-01', wearCount: 0 });
describe('outfit generation', () => {
  it('only selects active items belonging to its supplied wardrobe', () => {
    const top = item('top', 'tops'); const bottom = item('bottom', 'bottoms');
    const outfit = generateOutfit('u1', [top, bottom]);
    expect(outfit?.slots.map((slot) => slot.wardrobeItemId)).toEqual(['top', 'bottom']);
    expect(outfit?.slots.every((slot) => slot.wardrobeItem?.userId === 'u1')).toBe(true);
  });
  it('does not invent an outfit without a compatible base', () => {
    expect(generateOutfit('u1', [item('only-bottom', 'bottoms')])).toBeNull();
  });
});
