import type { FeedbackEvent, FeedbackSignal, Outfit } from '@/types/outfit';
import { supabase } from '@/lib/supabase/client';
import { NetworkError } from '@/utils/errors';
export const outfitRepository = {
  isRemote: Boolean(supabase),
  async save(outfit: Outfit): Promise<void> { if (!supabase) return; const { error } = await supabase.from('outfits').upsert({ id: outfit.id, user_id: outfit.userId, name: outfit.name, occasion: outfit.occasion, ai_generated: outfit.aiGenerated }); if (error) throw new NetworkError('Your outfit could not be synced.'); const { error: slotsError } = await supabase.from('outfit_items').upsert(outfit.slots.map((slot) => ({ outfit_id: outfit.id, wardrobe_item_id: slot.wardrobeItemId, slot: slot.slot }))); if (slotsError) throw new NetworkError('Your outfit pieces could not be synced.'); },
  async feedback(event: FeedbackEvent): Promise<void> { if (!supabase) return; const { error } = await supabase.from('feedback_events').insert({ id: event.id, user_id: event.userId, outfit_id: event.outfitId, item_id: event.itemId, signal: event.signal as FeedbackSignal }); if (error) throw new NetworkError('Your feedback could not be synced.'); },
};
