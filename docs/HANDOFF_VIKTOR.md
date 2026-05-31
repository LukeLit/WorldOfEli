# World Of Eli — Viktor Handoff

Last updated: 2026-05-31

## Purpose

This handoff explains the current `WorldOfEli` project state, how to run sessions with Eli, where assets now live, and what Viktor should do next.

## Live Links

- Production site: `https://woe.metalgames.xyz`
- Vercel fallback domain: `https://world-of-eli.vercel.app`
- Slack invite: `https://join.slack.com/t/worldofeli/shared_invite/zt-3zw5nghjk-oZsfLGslpQ68JtfgNjvSgg`
- Slack art channel (`#art`): `https://worldofeli.slack.com/archives/C0B842ALLQY`
- FigJam board: `https://www.figma.com/board/OpO30xLt5cdUpM9r4x48kV/Untitled?node-id=0-1&t=sXaltxoug56MkQ9b-1`

## Architecture Snapshot

- Framework: Next.js App Router + TypeScript
- Deployment: Vercel project `world-of-eli`, auto deploy from `main`
- Current status: starter platform is live and ready for first playable prototype

## Core Routes

- `/` — Mission Select homepage
- `/play` — touch/keyboard/fullscreen game container shell
- `/lp` — lesson plan with autosaving checklists and notes
- `/dave` — parent setup checklist with autosaving fields
- `/concepts` — concept art launchpad with `#art` + FigJam links
- `/docs`, `/journal` — planning and session record routes

## Important Workflow Decision

Google Drive upload flow is no longer primary.  
Primary upload path is now Slack channel `#art`.

Use this as the source of truth for incoming images/screenshots:

1. Dave uploads directly to `#art`
2. Eli and adults can view/comment in thread
3. Viktor can reference channel history for context

## Session Operating Model (Recommended)

### 1) Pre-session (5-10 min)

- Open `/lp`
- Open Slack `#art`
- Open FigJam board
- Confirm recording setup
- Verify Slack devices/notifications from `/dave`

### 2) Live session (60 min target)

- Use `/lp` discovery and scope checklists during call
- Keep scope to one tiny playable loop:
  - one action
  - one goal
  - one restart
- Use `/play` for interaction/input testing and fullscreen game mode

### 3) Asset handling

- All art/screenshots uploaded to `#art`
- If Eli doodles in FigJam, post captures/exports in `#art` too
- Keep naming consistent when posting files (session-oriented names)

### 4) Post-session

- Fill in `/lp` tracking fields
- Add summary notes to `/journal`
- Mark unresolved setup tasks in `/dave`

## `/play` Technical Notes

Current `/play` includes:

- Pointer/touch gesture detection:
  - tap
  - swipe (directional)
  - pinch scale metric
- Keyboard controls:
  - movement: arrows / WASD
  - actions: Space/J (A), K (B)
- On-screen touch buttons for direction + A/B
- Fullscreen toggle scoped to game container
- Live gesture debug log

This route is intentionally a scaffold for plugging in game runtime tech (Canvas/WebGL/Phaser/Three/custom).

## Autosave Behavior (`/lp` and `/dave`)

- Checkboxes and text inputs auto-save in browser `localStorage`
- Persistence is per browser/device
- Both pages have reset buttons to clear saved state

## Parent Ops (`/dave`) — Current Checklist Intent

- Slack setup on all devices
- `#art` upload process
- Bookmark key URLs
- Session readiness checks (mic/cam/recording/tabs)

## Known Constraints

- Saved checklist/input state is local-only (no shared cloud sync yet)
- Slack upload workflow is manual (no automatic import pipeline)
- `/play` is a shell, not yet the full game runtime

## Recommended Next Iteration

1. Add a simple game loop module inside `/play`:
   - player box
   - movement
   - one goal state
   - restart button
2. Add a lightweight session export button in `/lp`:
   - copy summary text to clipboard
3. Add optional Slack posting helper flow (manual or bot-assisted) for session wrap notes
4. Add basic tests for `/play` inputs and `/lp` state persistence

## Fast Verification Commands

From project root:

```bash
pnpm lint
pnpm build
```

## Ownership Notes

- Luke drives strategy and session facilitation
- Dave handles practical setup and uploads in `#art`
- Viktor tracks continuity, prompts, and session operations using `/lp` + `/dave` + Slack context
