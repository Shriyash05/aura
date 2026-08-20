# Development

1. Copy `.env.example` to `.env` and set Supabase public values when a project
   is available. Do not add provider keys to `.env` for the mobile app.
2. Install dependencies with `npm install --legacy-peer-deps --ignore-scripts`
   in this repository; the lockfile currently contains an Expo Router peer
   mismatch that npm otherwise rejects.
3. Run `npm run typecheck`, `npm run lint`, and `npm test`.
4. Start with `npm start`, then open an Android or iOS target from Expo.

Before a production build: provision the migration, configure private Storage,
deploy the Edge Function, and set its provider secret with `supabase secrets`.
