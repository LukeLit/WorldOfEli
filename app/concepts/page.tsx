import Link from "next/link";

const figJamBoardUrl =
  "https://www.figma.com/board/OpO30xLt5cdUpM9r4x48kV/Untitled?node-id=0-1&t=sXaltxoug56MkQ9b-1";
const driveFolderUrl =
  "https://drive.google.com/drive/folders/1h99_8i6VuOI0fCl9eDLCv38576rDxLIH?usp=drive_link";
const slackInviteUrl =
  "https://join.slack.com/t/worldofeli/shared_invite/zt-3zw5nghjk-oZsfLGslpQ68JtfgNjvSgg";

export default function ConceptsPage() {
  return (
    <main className="min-h-screen mario-bg px-5 py-10">
      <section className="question-panel mx-auto max-w-4xl">
        <h1 className="text-3xl font-black text-slate-900">Concept Art Vault</h1>
        <p className="mt-3 text-slate-700">
          Put Eli&apos;s sketches, character designs, and map drafts in the
          shared Google Drive folder so Dave can upload with simple drag-and-drop.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={driveFolderUrl}
            className="mission-link inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            Open Google Drive Folder
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
