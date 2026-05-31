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

  const [checklistState, setChecklistState] = useState<Record<string, boolean>>(() =>
    readStorageJson(lpChecklistStorageKey, {}),
  );
  const [sectionNotes, setSectionNotes] = useState<Record<string, string>>(() =>
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
    localStorage.setItem(lpChecklistStorageKey, JSON.stringify(checklistState));
  }, [checklistState]);

  useEffect(() => {
    localStorage.setItem(lpNotesStorageKey, JSON.stringify(sectionNotes));
  }, [sectionNotes]);

  useEffect(() => {
    localStorage.setItem(lpSessionFormStorageKey, JSON.stringify(sessionForm));
  }, [sessionForm]);

  const groupedChecklist = useMemo(() => {
    return checklistItems.reduce<Record<string, typeof checklistItems>>((acc, item) => {
      if (!acc[item.group]) {
        acc[item.group] = [];
      }
      acc[item.group].push(item);
      return acc;
    }, {});
  }, [checklistItems]);

  function updateSectionNote(key: "discovery" | "scope" | "build" | "wrap", value: string) {
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
    <main className="min-h-screen mario-bg px-5 py-10">
      <section className="question-panel mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            /lp
          </p>
          <h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
            Eli Session Lesson Plan
          </h1>
          <p className="mt-3 text-slate-700">
            Use this as your live runbook so you can guide the call, ask the
            right questions, and keep momentum toward a playable build.
          </p>
          <button
            type="button"
            className="mission-link mt-4 inline-flex"
            onClick={resetLessonPlanState}
          >
            Reset Saved Lesson Plan
          </button>
        </header>

        <section className="mission-card">
          <h2 className="text-2xl font-black">Session Structure (60 minutes)</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
            <li>0-5 min: Intro Eli to Slack + Viktor</li>
            <li>5-15 min: Discovery questions and pick a game idea</li>
            <li>15-25 min: Scope to one action, one goal, one restart</li>
            <li>25-50 min: Build and test the first playable loop</li>
            <li>50-60 min: Deploy, celebrate, and capture next steps</li>
          </ul>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="mission-card">
            <h2 className="text-xl font-black">1) Discovery Questions</h2>
            <div className="mt-3 space-y-2 text-slate-700">
              {groupedChecklist["1) Discovery Questions"]?.map((item) => (
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
            <textarea
              className="mt-3 min-h-20 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder="Discovery notes..."
              value={sectionNotes.discovery}
              onChange={(event) => updateSectionNote("discovery", event.target.value)}
            />
          </article>

          <article className="mission-card">
            <h2 className="text-xl font-black">2) Scope Questions</h2>
            <div className="mt-3 space-y-2 text-slate-700">
              {groupedChecklist["2) Scope Questions"]?.map((item) => (
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
            <textarea
              className="mt-3 min-h-20 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder="Scope notes..."
              value={sectionNotes.scope}
              onChange={(event) => updateSectionNote("scope", event.target.value)}
            />
          </article>

          <article className="mission-card">
            <h2 className="text-xl font-black">3) Build Check-In Prompts</h2>
            <div className="mt-3 space-y-2 text-slate-700">
              {groupedChecklist["3) Build Check-In Prompts"]?.map((item) => (
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
            <textarea
              className="mt-3 min-h-20 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder="Build notes..."
              value={sectionNotes.build}
              onChange={(event) => updateSectionNote("build", event.target.value)}
            />
          </article>

          <article className="mission-card">
            <h2 className="text-xl font-black">4) Wrap-Up Questions</h2>
            <div className="mt-3 space-y-2 text-slate-700">
              {groupedChecklist["4) Wrap-Up Questions"]?.map((item) => (
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
            <textarea
              className="mt-3 min-h-20 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder="Wrap-up notes..."
              value={sectionNotes.wrap}
              onChange={(event) => updateSectionNote("wrap", event.target.value)}
            />
          </article>
        </section>

        <section className="mission-card">
          <h2 className="text-xl font-black">Tracking Template</h2>
          <p className="mt-2 text-slate-700">These fields auto-save in this browser.</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">
              Session Date
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal"
                value={sessionForm.sessionDate}
                onChange={(event) => updateSessionField("sessionDate", event.target.value)}
              />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Game Idea
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal"
                value={sessionForm.gameIdea}
                onChange={(event) => updateSessionField("gameIdea", event.target.value)}
              />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              One Player Action
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal"
                value={sessionForm.onePlayerAction}
                onChange={(event) => updateSessionField("onePlayerAction", event.target.value)}
              />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Win Condition
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal"
                value={sessionForm.winCondition}
                onChange={(event) => updateSessionField("winCondition", event.target.value)}
              />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Restart Method
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal"
                value={sessionForm.restartMethod}
                onChange={(event) => updateSessionField("restartMethod", event.target.value)}
              />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Next Session Focus
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal"
                value={sessionForm.nextSessionFocus}
                onChange={(event) => updateSessionField("nextSessionFocus", event.target.value)}
              />
            </label>
          </div>
          <label className="mt-3 block text-sm font-semibold text-slate-700">
            What Eli Loved
            <textarea
              className="mt-1 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal"
              value={sessionForm.whatEliLoved}
              onChange={(event) => updateSessionField("whatEliLoved", event.target.value)}
            />
          </label>
          <p className="mt-2 text-xs text-emerald-700">Autosave is on.</p>
        </section>

        <section className="mission-card">
          <h2 className="text-xl font-black">Session Quick Links</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
            <li>
              <a href={slackArtChannelUrl} className="underline" target="_blank" rel="noreferrer">
                Slack #art Channel
              </a>
            </li>
            <li>
              <a href={figJamBoardUrl} className="underline" target="_blank" rel="noreferrer">
                FigJam Board
              </a>
            </li>
            <li>
              <a href={slackInviteUrl} className="underline" target="_blank" rel="noreferrer">
                Slack Invite Link
              </a>
            </li>
          </ul>
        </section>

        <Link href="/" className="mission-link inline-flex w-fit">
          Back To Mission Select
        </Link>
      </section>
    </main>
  );
}
