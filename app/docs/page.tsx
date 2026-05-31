import Link from "next/link";

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
          All the game mechanics, story notes, and design decisions go here.
          Keep adding ideas between sessions!
        </p>

        <div className="mx-auto mt-6 max-w-md text-left">
          <div className="mission-card card-orange">
            <h2 className="text-lg font-bold">📁 What goes here?</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Session flow scripts</li>
              <li>Recording checklists</li>
              <li>Game mechanic ideas</li>
              <li>Character backstories</li>
              <li>Level design notes</li>
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
