// Supabase Edge Function. Set OPENAI_API_KEY with `supabase secrets set`; never expose it to the app.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const allowedCategories = ['tops', 'bottoms', 'one-piece', 'traditional', 'outerwear', 'footwear', 'accessories'];
Deno.serve(async (request) => {
  const auth = request.headers.get('Authorization');
  if (!auth) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: auth } } });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { imagePath } = await request.json();
  if (typeof imagePath !== 'string' || !imagePath.startsWith(`${user.id}/`)) return Response.json({ error: 'Invalid image path' }, { status: 400 });
  // Create a short-lived URL. The provider receives only this image, not a permanent public URL.
  const { data: signed, error: signingError } = await supabase.storage.from('wardrobe-images').createSignedUrl(imagePath, 60);
  if (signingError || !signed) return Response.json({ error: 'Image unavailable' }, { status: 400 });
  const response = await fetch('https://api.openai.com/v1/responses', { method: 'POST', headers: { Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'gpt-4.1-mini', input: [{ role: 'user', content: [{ type: 'input_text', text: 'Return JSON only with category, primaryColor, secondaryColors, pattern, material, fit, formality, occasions, seasons, styleTags, confidence for this clothing item.' }, { type: 'input_image', image_url: signed.signedUrl }] }], text: { format: { type: 'json_object' } } }) });
  if (!response.ok) return Response.json({ error: 'Analysis temporarily unavailable' }, { status: 502 });
  const body = await response.json(); const output = JSON.parse(body.output_text ?? '{}');
  if (!allowedCategories.includes(output.category)) output.category = 'tops';
  output.confidence = Math.max(0, Math.min(1, Number(output.confidence) || 0.5));
  await supabase.from('ai_requests').insert({ user_id: user.id, provider: 'openai', model: 'gpt-4.1-mini', task: 'WARDROBE_ANALYSIS', success: true });
  return Response.json(output);
});
