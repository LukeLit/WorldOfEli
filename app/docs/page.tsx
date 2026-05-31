import Link from "next/link";

const sessionGuideUrl =
  "https://docs.google.com/document/d/1DPGnzvgmL6LefsTYJi2S1X6j_LZ69lgpuKsrfohTJX4/edit";
const gameDesignDocUrl =
  "https://docs.google.com/document/d/1Q9SwF7OttUEVDRRLXdMo6_P4aRIRuWPin_GvMo7FrVc/edit";

export default function DocsPage() {
  return (
    <main className="min-h-screen mario-bg px-4 py-8 sm:px-6 sm:py-12">
      <section className="question-panel mx-auto max-w-4xl text-center">
        <span className="card-icon mx-auto" aria-hidden="true">
          💡
        </span>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Game Ideas &amp; Docs
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-700">
          All the game mechanics, story notes, and design decisions live in
          Google Docs. Click below to open or edit.
        </p>

        {/* Google Docs */}
        <div className="mx-auto mt-6 grid max-w-xl gap-4 text-left sm:grid-cols-2">
          <a
            href={sessionGuideUrl}
            target="_blank"
            rel="noreferrer"
            className="mission-card card-blue transition-transform hover:scale-[1.02]"
          >
            <h2 className="text-lg font-bold">📋 Session Guide</h2>
            <p className="mt-1 text-sm text-slate-600">
              Full runbook for running 60-minute game-building sessions — phases,
              questions, facilitation tips, and post-session checklist.
            </p>
            <span className="mission-link mt-2 inline-flex text-sm">
              Open in Google Docs →
            </span>
          </a>

          <a
            href={gameDesignDocUrl}
            target="_blank"
            rel="noreferrer"
            className="mission-card card-purple transition-transform hover:scale-[1.02]"
          >
            <h2 className="text-lg font-bold">🎮 Game Design Doc</h2>
            <p className="mt-1 text-sm text-slate-600">
              Template for the game concept, hero, world, core loop, session
              log, ideas-for-later, and art tracker.
            </p>
            <span className="mission-link mt-2 inline-flex text-sm">
              Open in Google Docs →
            </span>
          </a>
        </div>

        {/* What else goes here */}
        <div className="mx-auto mt-6 max-w-md text-left">
          <div className="mission-card card-orange">
            <h2 className="text-lg font-bold">📁 What else goes here?</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Game mechanic ideas</li>
              <li>Character backstories</li>
              <li>Level design notes</li>
              <li>Recording checklists</li>
              <li>Session flow scripts</li>
            </ul>
          </div>
        </div>

        <Link href="/" className="mission-link mt-6 inline-flex">
          ← Back To Mission Select
        </Link>
      </section>
    </main>
  );
}
