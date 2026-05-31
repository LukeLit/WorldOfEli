# World Of Eli

World Of Eli is a kid-friendly game development hub.

The landing page is the directory for:

- playable build link
- concept art
- design docs
- session journal

## Project Structure

- `app/` - Next.js app routes and UI
- `assets/concepts/` - concept art files
- `docs/` - setup notes and session guides
- `journal/` - per-session build notes

## Local Development

1. Install dependencies:

   ```bash
   pnpm install --ignore-scripts
   ```

2. Create local env:

   ```bash
   cp .env.example .env.local
   ```

   PowerShell alternative:

   ```powershell
   Copy-Item .env.example .env.local
   ```

3. Start dev server:

   ```bash
   pnpm dev
   ```

## Environment

Template values are in `.env.example`.

- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_PLAY_URL`
- `NEXT_PUBLIC_CONTACT_NOTE`

Keep real secrets in `.env.local` and in Vercel environment variables.

## Deployments

This repository is linked to Vercel project `world-of-eli`.

- Pushes to non-`main` branches create Preview deployments.
- Pushes to `main` create Production deployments.

See `docs/setup-vercel.md` for CLI steps and verification.

## Session Guides

- `docs/session-flow.md` - live call structure for you + Eli + Viktor
- `docs/recording-checklist.md` - setup and review checklist for recordings
