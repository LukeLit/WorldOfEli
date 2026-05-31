import Link from "next/link";

export default function ConceptsPage() {
  return (
    <main className="min-h-screen mario-bg px-5 py-10">
      <section className="question-panel mx-auto max-w-4xl">
        <h1 className="text-3xl font-black text-slate-900">Concept Art Vault</h1>
        <p className="mt-3 text-slate-700">
          Put Eli&apos;s sketches, character designs, and map drafts in{" "}
          <code>assets/concepts/</code>.
        </p>
        <Link href="/" className="mission-link mt-5 inline-flex">
          Back To Mission Select
        </Link>
      </section>
    </main>
  );
}
