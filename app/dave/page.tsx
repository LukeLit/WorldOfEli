import Link from "next/link";

const homepageUrl = "https://woe.metalgames.xyz";
const figJamBoardUrl =
  "https://www.figma.com/board/OpO30xLt5cdUpM9r4x48kV/Untitled?node-id=0-1&t=sXaltxoug56MkQ9b-1";

export default function DaveSetupPage() {
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
        </header>

        <section className="mission-card">
          <h2 className="text-2xl font-black">1) Upload Eli&apos;s Art</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
            <li>Gather all current sketches/photos/screenshots.</li>
            <li>Drop files into the repo folder: <code>assets/concepts/</code>.</li>
            <li>Use clear names like <code>eli-session-01-character.png</code>.</li>
            <li>Add new uploads after each session.</li>
          </ul>
        </section>

        <section className="mission-card">
          <h2 className="text-2xl font-black">2) Slack On Every Device</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
            <li>Install Slack on Dave&apos;s laptop + phone.</li>
            <li>Install Slack on Eli&apos;s main device (with parent supervision).</li>
            <li>Sign into the same workspace and verify notifications are enabled.</li>
            <li>Create or pin a private channel for Eli&apos;s game project.</li>
          </ul>
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
              Lesson plan: <code>/lp</code>
            </li>
          </ul>
        </section>

        <section className="mission-card">
          <h2 className="text-2xl font-black">4) Session-Ready Check</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
            <li>Mic/camera tested before call.</li>
            <li>Screen recording ready.</li>
            <li>Slack and homepage both open in advance.</li>
            <li>Eli has drawing tool open (FigJam) before kickoff.</li>
          </ul>
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
