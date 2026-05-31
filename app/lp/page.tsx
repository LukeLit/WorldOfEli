"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const slackArtChannelUrl = "https://worldofeli.slack.com/archives/C0B842ALLQY";
const figJamBoardUrl =
  "https://www.figma.com/board/OpO30xLt5cdUpM9r4x48kV/Untitled?node-id=0-1&t=sXaltxoug56MkQ9b-1";
const slackInviteUrl =
  "https://join.slack.com/t/worldofeli/shared_invite/zt-3zw5nghjk-oZsfLGslpQ68JtfgNjvSgg";

const discoveryQuestions = [
  "What game do you want to make today?",
  "Who is the hero in your game?",
  "What is the one coolest thing the hero can do?",
  "Where does the game happen (space, castle, forest, ocean)?",
];

const scopeQuestions = [
  "What is one thing the player can do right away?",
  "How does the player win this first version?",
  "How does the player lose or restart?",
  "What can we save for Session 2?",
];

const buildPrompts = [
  "Try it now. What feels fun already?",
  "What is confusing right now?",
  "Pick one improvement: controls, goal, or visuals.",
];

const wrapQuestions = [
  "What should we name this version?",
  "What are the top 2 things for next time?",
  "What part are you most proud of today?",
];

const lpChecklistStorageKey = "woe-lp-checklist-v1";
const lpNotesStorageKey = "woe-lp-notes-v1";
const lpSessionFormStorageKey = "woe-lp-session-form-v1";

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

type SessionForm = {
  sessionDate: string;
  gameIdea: string;
  onePlayerAction: string;
  winCondition: string;
  restartMethod: string;
  whatEliLoved: string;
  nextSessionFocus: string;
};

const defaultSessionForm: SessionForm = {
  sessionDate: "",
  gameIdea: "",
  onePlayerAction: "",
  winCondition: "",
  restartMethod: "",
  whatEliLoved: "",
  nextSessionFocus: "",
};

const sectionMeta: Record<string, { icon: string; color: string; noteKey: string }> = {
  "1) Discovery Questions": { icon: "🔍", color: "card-purple", noteKey: "discovery" },
  "2) Scope Questions": { icon: "🎯", color: "card-green", noteKey: "scope" },
  "3) Build Check-In Prompts": { icon: "🔨", color: "card-orange", noteKey: "build" },
  "4) Wrap-Up Questions": { icon: "🎁", color: "card-yellow", noteKey: "wrap" },
};

export default function LessonPlanPage() {
  const checklistItems = useMemo(
    () => [
      ...discoveryQuestions.map((text, index) => ({
        id: `discovery-${index + 1}`,
        group: "1) Discovery Questions",
        text,
      })),
      ...scopeQuestions.map((text, index) => ({
        id: `scope-${index + 1}`,
        group: "2) Scope Questions",
        text,
      })),
      ...buildPrompts.map((text, index) => ({
        id: `build-${index + 1}`,
        group: "3) Build Check-In Prompts",
        text,
      })),
      ...wrapQuestions.map((text, index) => ({
        id: `wrap-${index + 1}`,
        group: "4) Wrap-Up Questions",
        text,
      })),
    ],
    [],
  );

  const [checklistState, setChecklistState] = useState<Record<string, boolean>>(
    () => readStorageJson(lpChecklistStorageKey, {}),
  );
  const [sectionNotes, setSectionNotes] = useState<Record<string, string>>(
    () =>
      readStorageJson(lpNotesStorageKey, {
        discovery: "",
        scope: "",
        build: "",
        wrap: "",
      }),
  );
  const [sessionForm, setSessionForm] = useState<SessionForm>(() =>
    readStorageJson(lpSessionFormStorageKey, defaultSessionForm),
  );

  useEffect(() => {
    localStorage.setItem(
      lpChecklistStorageKey,
      JSON.stringify(checklistState),
    );
  }, [checklistState]);

  useEffect(() => {
    localStorage.setItem(lpNotesStorageKey, JSON.stringify(sectionNotes));
  }, [sectionNotes]);

  useEffect(() => {
    localStorage.setItem(
      lpSessionFormStorageKey,
      JSON.stringify(sessionForm),
    );
  }, [sessionForm]);

  const groupedChecklist = useMemo(() => {
    return checklistItems.reduce<Record<string, typeof checklistItems>>(
      (acc, item) => {
        if (!acc[item.group]) {
          acc[item.group] = [];
        }
        acc[item.group].push(item);
        return acc;
      },
      {},
    );
  }, [checklistItems]);

  function updateSectionNote(
    key: "discovery" | "scope" | "build" | "wrap",
    value: string,
  ) {
    setSectionNotes((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  function updateSessionField(key: keyof SessionForm, value: string) {
    setSessionForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  function resetLessonPlanState() {
    const shouldReset = window.confirm(
      "Clear all saved lesson plan checkboxes and notes on this device?",
    );
    if (!shouldReset) {
      return;
    }

    setChecklistState({});
    setSectionNotes({
      discovery: "",
      scope: "",
      build: "",
      wrap: "",
    });
    setSessionForm(defaultSessionForm);
    localStorage.removeItem(lpChecklistStorageKey);
    localStorage.removeItem(lpNotesStorageKey);
    localStorage.removeItem(lpSessionFormStorageKey);
  }

  return (
    <main className="min-h-screen mario-bg px-4 py-8 sm:px-6 sm:py-12">
      <section className="question-panel mx-auto flex w-full max-w-5xl flex-col gap-6">
        {/* Header */}
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            📋 /lp
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Session Lesson Plan
          </h1>
          <p className="mt-2 text-slate-600">
            Live runbook for guiding the call, asking the right questions, and
            keeping momentum toward a playable build.
          </p>
          <button
            type="button"
            className="mission-link mt-3 inline-flex text-sm"
            onClick={resetLessonPlanState}
          >
            🔄 Reset All
          </button>
        </header>

        {/* Timeline */}
        <section className="mission-card card-blue">
          <h2 className="text-xl font-bold">⏱️ Session Structure (60 min)</h2>
          <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-5">
            {[
              { time: "0–5", label: "Intro", icon: "👋" },
              { time: "5–15", label: "Discover", icon: "🔍" },
              { time: "15–25", label: "Scope", icon: "🎯" },
              { time: "25–50", label: "Build!", icon: "🔨" },
              { time: "50–60", label: "Wrap-up", icon: "🎁" },
            ].map((step) => (
              <div
                key={step.label}
                className="rounded-lg bg-white/60 px-3 py-2 text-center"
              >
                <p className="text-lg">{step.icon}</p>
                <p className="font-bold text-slate-800">{step.time} min</p>
                <p>{step.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Checklist sections */}
        <section className="grid gap-4 md:grid-cols-2">
          {Object.entries(groupedChecklist).map(([group, items]) => {
            const meta = sectionMeta[group] ?? {
              icon: "📌",
              color: "",
              noteKey: "discovery",
            };
            return (
              <article
                key={group}
                className={`mission-card ${meta.color}`}
              >
                <h2 className="text-xl font-bold">
                  {meta.icon} {group.replace(/^\d\)\s*/, "")}
                </h2>
                <div className="mt-3 space-y-2 text-slate-700">
                  {items.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-start gap-2"
                    >
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
                <textarea
                  className="mt-3 min-h-20 w-full rounded-lg border-2 border-slate-200 bg-white/80 px-3 py-2 text-sm"
                  placeholder={`${group.replace(/^\d\)\s*/, "")} notes...`}
                  value={
                    sectionNotes[
                      meta.noteKey as keyof typeof sectionNotes
                    ]
                  }
                  onChange={(event) =>
                    updateSectionNote(
                      meta.noteKey as
                        | "discovery"
                        | "scope"
                        | "build"
                        | "wrap",
                      event.target.value,
                    )
                  }
                />
              </article>
            );
          })}
        </section>

        {/* Tracking template */}
        <section className="mission-card">
          <h2 className="text-xl font-bold">📊 Tracking Template</h2>
          <p className="mt-1 text-sm text-slate-500">
            Auto-saved in this browser.
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {(
              [
                ["sessionDate", "Session Date"],
                ["gameIdea", "Game Idea"],
                ["onePlayerAction", "One Player Action"],
                ["winCondition", "Win Condition"],
                ["restartMethod", "Restart Method"],
                ["nextSessionFocus", "Next Session Focus"],
              ] as [keyof SessionForm, string][]
            ).map(([key, label]) => (
              <label
                key={key}
                className="text-sm font-semibold text-slate-700"
              >
                {label}
                <input
                  className="mt-1 w-full rounded-lg border-2 border-slate-200 bg-white/80 px-3 py-2 text-sm font-normal"
                  value={sessionForm[key]}
                  onChange={(event) =>
                    updateSessionField(key, event.target.value)
                  }
                />
              </label>
            ))}
          </div>
          <label className="mt-3 block text-sm font-semibold text-slate-700">
            What Eli Loved
            <textarea
              className="mt-1 min-h-24 w-full rounded-lg border-2 border-slate-200 bg-white/80 px-3 py-2 text-sm font-normal"
              value={sessionForm.whatEliLoved}
              onChange={(event) =>
                updateSessionField("whatEliLoved", event.target.value)
              }
            />
          </label>
          <p className="mt-2 text-xs font-semibold text-emerald-600">
            ✅ Autosave is on
          </p>
        </section>

        {/* Quick links */}
        <section className="mission-card card-teal">
          <h2 className="text-lg font-bold">🔗 Quick Links</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={slackArtChannelUrl}
              className="mission-link"
              target="_blank"
              rel="noreferrer"
            >
              📤 #art Channel
            </a>
            <a
              href={figJamBoardUrl}
              className="mission-link"
              target="_blank"
              rel="noreferrer"
            >
              ✏️ FigJam Board
            </a>
            <a
              href={slackInviteUrl}
              className="mission-link"
              target="_blank"
              rel="noreferrer"
            >
              💬 Slack Invite
            </a>
          </div>
        </section>

        <Link href="/" className="mission-link inline-flex w-fit">
          ← Back To Mission Select
        </Link>
      </section>
    </main>
  );
}
