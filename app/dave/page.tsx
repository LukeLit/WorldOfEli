"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const homepageUrl = "https://woe.metalgames.xyz";
const figJamBoardUrl =
  "https://www.figma.com/board/OpO30xLt5cdUpM9r4x48kV/Untitled?node-id=0-1&t=sXaltxoug56MkQ9b-1";
const slackArtChannelUrl = "https://worldofeli.slack.com/archives/C0B842ALLQY";
const slackInviteUrl =
  "https://join.slack.com/t/worldofeli/shared_invite/zt-3zw5nghjk-oZsfLGslpQ68JtfgNjvSgg";

const daveChecklistStorageKey = "woe-dave-checklist-v1";
const daveNotesStorageKey = "woe-dave-notes-v1";

function readStorageJson<T>(key: string, fallbackValue: T): T {
  if (typeof window === "undefined") {
    return fallbackValue;
  }

  try {
    const rawValue = localStorage.getItem(key);
    if (!rawValue) {
      return fallbackValue;
    }
    return JSON.parse(rawValue) as T;
  } catch {
    return fallbackValue;
  }
}

function readStorageText(key: string): string {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(key) ?? "";
}

const daveChecklistItems = [
  { id: "upload-gather", section: "1) Upload Eli's Art", text: "Gather all current sketches/photos/screenshots." },
  { id: "upload-open-art-channel", section: "1) Upload Eli's Art", text: "Open the Slack #art channel." },
  { id: "upload-drop", section: "1) Upload Eli's Art", text: "Upload files directly in #art (drag/drop or attach)." },
  { id: "upload-name", section: "1) Upload Eli's Art", text: "Use clear names like eli-session-01-character.png." },
  { id: "upload-repeat", section: "1) Upload Eli's Art", text: "Add new uploads to #art after each session." },
  { id: "slack-install-dave", section: "2) Slack On Every Device", text: "Install Slack on Dave's laptop and phone." },
  { id: "slack-install-eli", section: "2) Slack On Every Device", text: "Install Slack on Eli's main device (with supervision)." },
  { id: "slack-join", section: "2) Slack On Every Device", text: "Join the World Of Eli Slack workspace from invite link." },
  { id: "slack-notify", section: "2) Slack On Every Device", text: "Enable notifications on all devices." },
  { id: "slack-channel", section: "2) Slack On Every Device", text: "Pin or create a private Eli game channel." },
  { id: "bookmark-home", section: "3) Bookmark Key Links", text: "Bookmark woe.metalgames.xyz on all devices." },
  { id: "bookmark-figjam", section: "3) Bookmark Key Links", text: "Bookmark the FigJam board." },
  { id: "bookmark-art", section: "3) Bookmark Key Links", text: "Bookmark the Slack #art channel." },
  { id: "bookmark-lp", section: "3) Bookmark Key Links", text: "Bookmark /lp lesson plan." },
  { id: "ready-audio-video", section: "4) Session-Ready Check", text: "Mic/camera tested before call." },
  { id: "ready-recording", section: "4) Session-Ready Check", text: "Screen recording ready." },
  { id: "ready-open-tabs", section: "4) Session-Ready Check", text: "Slack, homepage, and #art are open before kickoff." },
  { id: "ready-figjam", section: "4) Session-Ready Check", text: "FigJam is open before kickoff." },
];

export default function DaveSetupPage() {
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>(() =>
    readStorageJson(daveChecklistStorageKey, {}),
  );
  const [notes, setNotes] = useState(() => readStorageText(daveNotesStorageKey));

  useEffect(() => {
    localStorage.setItem(daveChecklistStorageKey, JSON.stringify(checklistState));
  }, [checklistState]);

  useEffect(() => {
    localStorage.setItem(daveNotesStorageKey, notes);
  }, [notes]);

  function renderChecklist(section: string) {
    return (
      <div className="mt-3 space-y-2 text-slate-700">
        {daveChecklistItems
          .filter((item) => item.section === section)
          .map((item) => (
            <label key={item.id} className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1"
                checked={Boolean(checklistState[item.id])}
                onChange={(event) =>
                  setChecklistState((previous) => ({
                    ...previous,
                    [item.id]: event.target.checked,
                  }))
                }
              />
              <span>{item.text}</span>
            </label>
          ))}
      </div>
    );
  }

  function resetDaveSetupState() {
    const shouldReset = window.confirm(
      "Clear all saved Dave setup checkboxes and notes on this device?",
    );
    if (!shouldReset) {
      return;
    }

    setChecklistState({});
    setNotes("");
    localStorage.removeItem(daveChecklistStorageKey);
    localStorage.removeItem(daveNotesStorageKey);
  }

  return (
    <main className="min-h-screen mario-bg px-5 py-10">
      <section className="question-panel mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            /dave
          </p>
          <h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
            Dave Setup Page
          </h1>
          <p className="mt-3 text-slate-700">
            Quick setup checklist to support Eli&apos;s game sessions.
          </p>
          <button
            type="button"
            className="mission-link mt-4 inline-flex"
            onClick={resetDaveSetupState}
          >
            Reset Saved Dave Checklist
          </button>
        </header>

        <section className="mission-card">
          <h2 className="text-2xl font-black">1) Upload Eli&apos;s Art</h2>
          {renderChecklist("1) Upload Eli's Art")}
          <a
            href={slackArtChannelUrl}
            className="mission-link mt-3 inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            Open Slack #art Channel
          </a>
        </section>

        <section className="mission-card">
          <h2 className="text-2xl font-black">2) Slack On Every Device</h2>
          {renderChecklist("2) Slack On Every Device")}
          <a href={slackInviteUrl} className="mission-link mt-3 inline-flex" target="_blank" rel="noreferrer">
            Open World Of Eli Slack Invite
          </a>
        </section>

        <section className="mission-card">
          <h2 className="text-2xl font-black">3) Bookmark Key Links</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
            <li>
              Homepage:{" "}
              <a href={homepageUrl} className="underline" target="_blank" rel="noreferrer">
                {homepageUrl}
              </a>
            </li>
            <li>
              FigJam board:{" "}
              <a href={figJamBoardUrl} className="underline" target="_blank" rel="noreferrer">
                Eli FigJam Board
              </a>
            </li>
            <li>
              Art uploads:{" "}
              <a href={slackArtChannelUrl} className="underline" target="_blank" rel="noreferrer">
                Slack #art Channel
              </a>
            </li>
            <li>
              Slack invite:{" "}
              <a href={slackInviteUrl} className="underline" target="_blank" rel="noreferrer">
                World Of Eli Slack Invite
              </a>
            </li>
            <li>
              Lesson plan: <code>/lp</code>
            </li>
          </ul>
          {renderChecklist("3) Bookmark Key Links")}
        </section>

        <section className="mission-card">
          <h2 className="text-2xl font-black">4) Session-Ready Check</h2>
          {renderChecklist("4) Session-Ready Check")}
          <label className="mt-3 block text-sm font-semibold text-slate-700">
            Dave Notes (auto-saved)
            <textarea
              className="mt-1 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Add device details, account notes, or follow-ups here..."
            />
          </label>
          <p className="mt-2 text-xs text-emerald-700">Autosave is on.</p>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link href="/" className="mission-link inline-flex w-fit">
            Back To Mission Select
          </Link>
          <Link href="/lp" className="mission-link inline-flex w-fit">
            Open Lesson Plan
          </Link>
        </div>
      </section>
    </main>
  );
}
