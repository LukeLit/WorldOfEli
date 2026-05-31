import Link from "next/link";

export default function DocsPage() {
  return (
    <main className="min-h-screen mario-bg px-5 py-10">
      <section className="question-panel mx-auto max-w-4xl">
        <h1 className="text-3xl font-black text-slate-900">Game Docs HQ</h1>
        <p className="mt-3 text-slate-700">
          Keep planning notes in <code>docs/</code>. Start with:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>Session flow script</li>
          <li>Recording checklist</li>
          <li>Future feature ideas</li>
        </ul>
        <Link href="/" className="mission-link mt-5 inline-flex">
          Back To Mission Select
        </Link>
      </section>
    </main>
  );
}
