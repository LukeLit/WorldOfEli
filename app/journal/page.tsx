import Link from "next/link";

export default function JournalPage() {
  return (
    <main className="min-h-screen mario-bg px-4 py-8 sm:px-6 sm:py-12">
      <section className="question-panel mx-auto max-w-4xl text-center">
        <span className="card-icon mx-auto" aria-hidden="true">
          📓
        </span>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Build Journal
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-700">
          One entry per session — capture what you built, what was fun, and
          what Eli wants to try next time!
        </p>

        <div className="mx-auto mt-6 max-w-md text-left">
          <div className="mission-card card-yellow">
            <h2 className="text-lg font-bold">✍️ Each entry should cover:</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>What we built today</li>
              <li>What felt the most fun</li>
              <li>What Eli wants next</li>
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
