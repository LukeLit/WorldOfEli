# Vercel Setup

This repo is linked to Vercel and configured for Git-based deployments.

## Current Project Link

- Vercel project: `world-of-eli`
- GitHub repo: `LukeLit/WorldOfEli`
- Production branch: `main`
- Git deployment setting: enabled

## Local Setup

1. Install dependencies:

   ```bash
   pnpm install --ignore-scripts
   ```

2. Create local environment file:

   ```bash
   cp .env.example .env.local
   ```

   PowerShell alternative:

   ```powershell
   Copy-Item .env.example .env.local
   ```

3. Run locally:

   ```bash
   pnpm dev
   ```

## Vercel Commands

Link project (already done):

```bash
vercel link --yes --project world-of-eli
```

Pull Vercel environment variables to local:

```bash
vercel env pull .env.local
```

Create a production deployment from local (optional):

```bash
vercel --prod --yes
```

## Push-To-Deploy Flow

1. Push branch to GitHub.
2. Vercel creates a Preview deployment for non-`main` branches.
3. Push/merge to `main` to create a Production deployment.

## Environment Notes

- Keep secrets in `.env.local` and Vercel env settings only.
- Commit only `.env.example`.
- Never commit real API keys.
