import Link from "next/link";

export default function JournalPage() {
  return (
    <main className="min-h-screen mario-bg px-5 py-10">
      <section className="question-panel mx-auto max-w-4xl">
        <h1 className="text-3xl font-black text-slate-900">Build Journal</h1>
        <p className="mt-3 text-slate-700">
          Add one short entry per session in <code>journal/</code>:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>What we built</li>
          <li>What felt fun</li>
          <li>What Eli wants next</li>
        </ul>
        <Link href="/" className="mission-link mt-5 inline-flex">
          Back To Mission Select
        </Link>
      </section>
    </main>
  );
}
