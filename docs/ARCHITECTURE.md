# Aura Wardrobe architecture

Aura is an Expo Router mobile application for iOS and Android. The client is a
feature-first React Native application with a small set of domain services.

## Implemented

- **Navigation:** Expo Router with five primary tabs: Home, Wardrobe, Add,
  Outfits, and Profile.
- **State:** a persisted Zustand store backed by AsyncStorage. It makes the
  essential product loop usable before a Supabase project is provisioned.
- **Authentication:** Supabase Auth is used when public project credentials are
  configured, with persisted session restoration. Without them, the app remains
  in explicitly labelled local-development mode.
- **Data:** UI calls the Zustand cache, which calls repository modules. When
  configured, wardrobe/outfit/feedback writes sync to Supabase; failed writes
  leave the local cache responsive and show a retry-needed message.
- **Images:** Expo Image Picker selects camera or library images. Image URIs
  remain device-local in fallback mode. Production uploads must use private
  Supabase Storage and signed URLs.
- **AI:** `services/ai` keeps provider adapters isolated. `services/wardrobe`
  owns schema-validated local analysis until a server-side vision endpoint is
  available. Provider API keys never enter the mobile app.
- **Outfits:** `services/outfits` deterministically selects compatible items
  from the user’s own active wardrobe, then stores interactions as feedback
  events for ranking.

## Partial / requires credentials

Provision the SQL in `supabase/migrations`, configure public Supabase values,
and deploy `analyse-wardrobe-image`. Private Storage policies and the Edge
Function source are implemented, but uploads and remote vision are not invoked
by the screen until a project is configured and deployed.

## Boundaries

`app/` renders screens and coordinates user input. `stores/` contains persisted
client state. `services/` contains business logic. `types/` contains shared
schemas. No UI component calls an AI provider directly.
