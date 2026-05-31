import Link from "next/link";

const figJamBoardUrl =
  "https://www.figma.com/board/OpO30xLt5cdUpM9r4x48kV/Untitled?node-id=0-1&t=sXaltxoug56MkQ9b-1";
const slackArtChannelUrl = "https://worldofeli.slack.com/archives/C0B842ALLQY";
const slackInviteUrl =
  "https://join.slack.com/t/worldofeli/shared_invite/zt-3zw5nghjk-oZsfLGslpQ68JtfgNjvSgg";

export default function ConceptsPage() {
  return (
    <main className="min-h-screen mario-bg px-4 py-8 sm:px-6 sm:py-12">
      <section className="question-panel mx-auto max-w-4xl text-center">
        <span className="card-icon mx-auto" aria-hidden="true">
          🎨
        </span>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Art Vault
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-700">
          This is where all of Eli&apos;s sketches, character designs, and map
          drafts live. Upload art to the Slack <code>#art</code> channel so
          everything stays in one place!
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={slackArtChannelUrl}
            className="btn-green"
            target="_blank"
            rel="noreferrer"
          >
            📤 Upload to #art
          </a>
          <a
            href={figJamBoardUrl}
            className="mission-link"
            target="_blank"
            rel="noreferrer"
          >
            ✏️ Open FigJam Board
          </a>
          <a
            href={slackInviteUrl}
            className="mission-link"
            target="_blank"
            rel="noreferrer"
          >
            💬 Join Slack
          </a>
        </div>

        <Link href="/" className="mission-link mt-6 inline-flex">
          ← Back To Mission Select
        </Link>
      </section>
    </main>
  );
}
