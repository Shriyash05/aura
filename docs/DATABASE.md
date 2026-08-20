# Database

The implemented Supabase schema is in `supabase/migrations/0001_mvp.sql`. It uses
`auth.users` as the source of identity and stores user-owned wardrobe items,
private image references, outfits, outfit items, feedback events, style
profiles, and AI audit records. Every user-owned table has Row Level Security.
The `wardrobe-images` bucket is private and its Storage policies require a path
prefixed with the authenticated user ID.

The development fallback persists equivalent client data only on the device.
It is for product iteration, not multi-device production use.
