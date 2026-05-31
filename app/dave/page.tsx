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

const sections = [
  {
    id: "upload",
    title: "Upload Eli's Art",
    icon: "📤",
    color: "card-purple",
    items: [
      { id: "upload-gather", text: "Gather all current sketches/photos/screenshots." },
      { id: "upload-open-art-channel", text: "Open the Slack #art channel." },
      { id: "upload-drop", text: "Upload files directly in #art (drag/drop or attach)." },
      { id: "upload-name", text: "Use clear names like eli-session-01-character.png." },
      { id: "upload-repeat", text: "Add new uploads to #art after each session." },
    ],
    linkHref: slackArtChannelUrl,
    linkLabel: "📤 Open #art Channel",
  },
  {
    id: "slack",
    title: "Slack On Every Device",
    icon: "💬",
    color: "card-blue",
    items: [
      { id: "slack-install-dave", text: "Install Slack on Dave's laptop and phone." },
      { id: "slack-install-eli", text: "Install Slack on Eli's main device (with supervision)." },
      { id: "slack-join", text: "Join the World Of Eli Slack workspace from invite link." },
      { id: "slack-notify", text: "Enable notifications on all devices." },
      { id: "slack-channel", text: "Pin or create a private Eli game channel." },
    ],
    linkHref: slackInviteUrl,
    linkLabel: "💬 Slack Invite Link",
  },
  {
    id: "bookmarks",
    title: "Bookmark Key Links",
    icon: "🔖",
    color: "card-orange",
    items: [
      { id: "bookmark-home", text: "Bookmark woe.metalgames.xyz on all devices." },
      { id: "bookmark-figjam", text: "Bookmark the FigJam board." },
      { id: "bookmark-art", text: "Bookmark the Slack #art channel." },
      { id: "bookmark-lp", text: "Bookmark /lp lesson plan." },
    ],
    linkHref: null,
    linkLabel: null,
  },
  {
    id: "ready",
    title: "Session-Ready Check",
    icon: "✅",
    color: "card-green",
    items: [
      { id: "ready-audio-video", text: "Mic/camera tested before call." },
      { id: "ready-recording", text: "Screen recording ready." },
      { id: "ready-open-tabs", text: "Slack, homepage, and #art are open before kickoff." },
      { id: "ready-figjam", text: "FigJam is open before kickoff." },
    ],
    linkHref: null,
    linkLabel: null,
  },
];

export default function DaveSetupPage() {
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>(
    () => readStorageJson(daveChecklistStorageKey, {}),
  );
  const [notes, setNotes] = useState(() =>
    readStorageText(daveNotesStorageKey),
  );

  useEffect(() => {
    localStorage.setItem(
      daveChecklistStorageKey,
      JSON.stringify(checklistState),
    );
  }, [checklistState]);

  useEffect(() => {
    localStorage.setItem(daveNotesStorageKey, notes);
  }, [notes]);

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
    <main className="min-h-screen mario-bg px-4 py-8 sm:px-6 sm:py-12">
      <section className="question-panel mx-auto flex w-full max-w-5xl flex-col gap-6">
        {/* Header */}
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            🛠️ /dave
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Dave&apos;s Setup Page
          </h1>
          <p className="mt-2 text-slate-600">
            Quick setup checklist so everything is ready before Eli&apos;s
            session.
          </p>
          <button
            type="button"
            className="mission-link mt-3 inline-flex text-sm"
            onClick={resetDaveSetupState}
          >
            🔄 Reset All
          </button>
        </header>

        {/* Bookmark reference */}
        <section className="mission-card card-teal">
          <h2 className="text-lg font-bold">🔗 Key Links</h2>
          <div className="mt-2 flex flex-wrap gap-2 text-sm">
            <a
              href={homepageUrl}
              className="mission-link"
              target="_blank"
              rel="noreferrer"
            >
              🏠 Homepage
            </a>
            <a
              href={figJamBoardUrl}
              className="mission-link"
              target="_blank"
              rel="noreferrer"
            >
              ✏️ FigJam
            </a>
            <a
              href={slackArtChannelUrl}
              className="mission-link"
              target="_blank"
              rel="noreferrer"
            >
              📤 #art
            </a>
            <a
              href={slackInviteUrl}
              className="mission-link"
              target="_blank"
              rel="noreferrer"
            >
              💬 Slack Invite
            </a>
            <Link href="/lp" className="mission-link">
              📋 Lesson Plan
            </Link>
          </div>
        </section>

        {/* Checklist sections */}
        {sections.map((section, index) => (
          <section
            key={section.id}
            className={`mission-card ${section.color}`}
          >
            <h2 className="text-xl font-bold">
              {section.icon} {index + 1}) {section.title}
            </h2>
            <div className="mt-3 space-y-2 text-slate-700">
              {section.items.map((item) => (
                <label key={item.id} className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-0.5"
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
            {section.linkHref && (
              <a
                href={section.linkHref}
                className="mission-link mt-3 inline-flex"
                target="_blank"
                rel="noreferrer"
              >
                {section.linkLabel}
              </a>
            )}
          </section>
        ))}

        {/* Notes */}
        <section className="mission-card">
          <label className="block text-sm font-semibold text-slate-700">
            📝 Dave&apos;s Notes (auto-saved)
            <textarea
              className="mt-2 min-h-28 w-full rounded-lg border-2 border-slate-200 bg-white/80 px-3 py-2 text-sm font-normal"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Device details, account notes, follow-ups..."
            />
          </label>
          <p className="mt-2 text-xs font-semibold text-emerald-600">
            ✅ Autosave is on
          </p>
        </section>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2">
          <Link href="/" className="mission-link">
            ← Mission Select
          </Link>
          <Link href="/lp" className="mission-link">
            📋 Lesson Plan
          </Link>
        </div>
      </section>
    </main>
  );
}
