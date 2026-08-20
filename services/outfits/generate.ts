import type { Outfit, OutfitSlotItem } from '@/types/outfit';
import type { WardrobeItem } from '@/types/wardrobe';

const slotFor = (item: WardrobeItem): OutfitSlotItem['slot'] => {
  if (item.category === 'tops' || item.category === 'traditional') return 'top';
  if (item.category === 'bottoms') return 'bottom';
  if (item.category === 'one-piece') return 'dress';
  if (item.category === 'outerwear') return 'outerwear';
  if (item.category === 'footwear') return 'footwear';
  return 'accessory';
};

export function generateOutfit(userId: string, items: WardrobeItem[], occasion?: string): Outfit | null {
  const active = items.filter((item) => !item.isArchived);
  const dress = active.find((item) => item.category === 'one-piece');
  const tops = active.filter((item) => item.category === 'tops' || item.category === 'traditional');
  const bottoms = active.filter((item) => item.category === 'bottoms');
  const shoes = active.find((item) => item.category === 'footwear');
  const outerwear = active.find((item) => item.category === 'outerwear');
  const main = dress ? [dress] : [tops[0], bottoms[0]].filter(Boolean) as WardrobeItem[];
  if (!main.length || (!dress && (!tops.length || !bottoms.length))) return null;
  const selected = [...main, ...(outerwear ? [outerwear] : []), ...(shoes ? [shoes] : [])];
  const slots: OutfitSlotItem[] = selected.map((item) => ({ slot: slotFor(item), wardrobeItemId: item.id, wardrobeItem: item, isLocked: false }));
  const now = new Date().toISOString();
  return { id: `outfit-${Date.now()}`, userId, name: occasion ? `${occasion} edit` : 'Your Aura look', occasion, slots, isFavorite: false, isWorn: false, wearCount: 0, aiGenerated: false, aiScore: 0.72, createdAt: now, updatedAt: now };
}
