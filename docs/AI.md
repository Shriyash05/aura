# AI architecture

AI requests are server-side only. The mobile client must never contain a model
provider secret. It sends a private, time-limited image URL to an authenticated
backend endpoint, which selects a provider/model by task and validates the
structured response before persistence.

`supabase/functions/analyse-wardrobe-image` is an OpenAI-backed Edge Function
with authenticated, user-scoped signed image access and constrained output.
The current app also includes a deterministic, schema-validated fallback analyser so
the add-to-wardrobe flow works without credentials. It is not presented as AI.
Outfit generation uses actual wardrobe items plus category, colour, formality,
and prior feedback rules. An AI refinement step may be added server-side later.

Record provider, model, task, latency, token use, estimated cost and outcome in
`ai_requests`; do not record secrets or raw private image contents.
