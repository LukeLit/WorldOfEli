import Link from "next/link";

const figJamBoardUrl =
  "https://www.figma.com/board/OpO30xLt5cdUpM9r4x48kV/Untitled?node-id=0-1&t=sXaltxoug56MkQ9b-1";
const slackArtChannelUrl = "https://worldofeli.slack.com/archives/C0B842ALLQY";
const slackInviteUrl =
  "https://join.slack.com/t/worldofeli/shared_invite/zt-3zw5nghjk-oZsfLGslpQ68JtfgNjvSgg";

export default function ConceptsPage() {
  return (
    <main className="min-h-screen mario-bg px-5 py-10">
      <section className="question-panel mx-auto max-w-4xl">
        <h1 className="text-3xl font-black text-slate-900">Concept Art Vault</h1>
        <p className="mt-3 text-slate-700">
          Put Eli&apos;s sketches, character designs, and map drafts in Slack
          channel <code>#art</code> so everything stays in one place.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={slackArtChannelUrl}
            className="mission-link inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            Open Slack #art Channel
          </a>
          <a
            href={figJamBoardUrl}
            className="mission-link inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            Open FigJam Board
          </a>
          <a
            href={slackInviteUrl}
            className="mission-link inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            Join Slack Workspace
          </a>
          <Link href="/" className="mission-link inline-flex">
            Back To Mission Select
          </Link>
        </div>
      </section>
    </main>
  );
}
