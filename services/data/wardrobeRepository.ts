import type { WardrobeItem } from '@/types/wardrobe';
import { supabase } from '@/lib/supabase/client';
import { NetworkError } from '@/utils/errors';
type WardrobeRow = { id: string; user_id: string; attributes: WardrobeItem; image_path: string; created_at: string };
const fromRow = (row: WardrobeRow): WardrobeItem => ({ ...row.attributes, id: row.id, userId: row.user_id, addedAt: row.created_at });
export const wardrobeRepository = {
  isRemote: Boolean(supabase),
  async list(): Promise<WardrobeItem[]> { if (!supabase) return []; const { data, error } = await supabase.from('wardrobe_items').select('*').order('created_at', { ascending: false }); if (error) throw new NetworkError('Your wardrobe could not be synced.'); return (data as WardrobeRow[]).map(fromRow); },
  async save(item: WardrobeItem): Promise<WardrobeItem> { if (!supabase) return item; const { data, error } = await supabase.from('wardrobe_items').upsert({ id: item.id, user_id: item.userId, attributes: item, image_path: item.originalImageUrl ?? item.imageUrl ?? '' }).select().single(); if (error) throw new NetworkError('Your item was saved locally but could not sync.'); return fromRow(data as WardrobeRow); },
  async remove(item: WardrobeItem): Promise<void> { if (!supabase) return; const { error } = await supabase.from('wardrobe_items').delete().eq('id', item.id); if (error) throw new NetworkError('Your item could not be deleted from the cloud.'); if (item.originalImageUrl) await supabase.storage.from('wardrobe-images').remove([item.originalImageUrl]); },
};
