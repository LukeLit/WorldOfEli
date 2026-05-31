import Link from "next/link";

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

export default function LessonPlanPage() {
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
            <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
              {discoveryQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </article>

          <article className="mission-card">
            <h2 className="text-xl font-black">2) Scope Questions</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
              {scopeQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </article>

          <article className="mission-card">
            <h2 className="text-xl font-black">3) Build Check-In Prompts</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
              {buildPrompts.map((prompt) => (
                <li key={prompt}>{prompt}</li>
              ))}
            </ul>
          </article>

          <article className="mission-card">
            <h2 className="text-xl font-black">4) Wrap-Up Questions</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
              {wrapQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mission-card">
          <h2 className="text-xl font-black">Tracking Template</h2>
          <p className="mt-2 text-slate-700">
            Copy this into Slack, a doc, or your notes each session:
          </p>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
{`Session Date:
Game Idea:
One Player Action:
Win Condition:
Restart Method:
What Eli Loved:
Next Session Focus:`}
          </pre>
        </section>

        <Link href="/" className="mission-link inline-flex w-fit">
          Back To Mission Select
        </Link>
      </section>
    </main>
  );
}
