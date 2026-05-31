import Link from "next/link";

const slackArtChannelUrl = "https://worldofeli.slack.com/archives/C0B842ALLQY";
const slackInviteUrl =
  "https://join.slack.com/t/worldofeli/shared_invite/zt-3zw5nghjk-oZsfLGslpQ68JtfgNjvSgg";
const figJamBoardUrl =
  "https://www.figma.com/board/OpO30xLt5cdUpM9r4x48kV/Untitled?node-id=0-1&t=sXaltxoug56MkQ9b-1";
const homepageUrl = "https://woe.metalgames.xyz";

const engagementMoves = [
  "Offer two choices only: 'Do you want jumping or shooting first?'",
  "Use 90-second build chunks, then ask Eli to test immediately.",
  "Praise specifics: 'That enemy idea is awesome' instead of generic praise.",
  "Let Eli name everything: character, level, goal, and version title.",
  "When attention drops, switch to action: doodle, test, or quick vote.",
];

const focusResetProtocol = [
  "Pause for 20 seconds and take one deep breath.",
  "Say out loud: 'One action, one goal, one restart.'",
  "Pick the smallest next step and ship it in under 5 minutes.",
  "Move any extra idea to a 'Session 2' parking list.",
];

export default function LukePage() {
  return (
    <main className="min-h-screen mario-bg px-5 py-10">
      <section className="question-panel mx-auto w-full max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
          /luke
        </p>
        <h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
          Luke Host Cheatsheet
        </h1>
        <p className="mt-3 text-slate-700">
          Session guide for staying focused, keeping Eli engaged, and shipping a playable
          game loop in one sitting.
        </p>
      </section>

      <section className="mx-auto mt-4 grid w-full max-w-6xl gap-4 lg:grid-cols-[1.8fr_1fr]">
        <div className="space-y-4">
          <article className="mission-card">
            <h2 className="text-2xl font-black">60-Min Session Plan</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
              <li>0-5 min: Huddle start + Eli idea prompt.</li>
              <li>5-15 min: Scope lock (one action, one goal, one restart).</li>
              <li>15-25 min: FigJam doodle + #art upload.</li>
              <li>25-50 min: Build first playable in /play.</li>
              <li>50-60 min: Playtest, celebrate, and capture next steps.</li>
            </ul>
          </article>

          <article className="mission-card">
            <h2 className="text-2xl font-black">Questions To Ask Eli</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
              <li>What game do you want to make today?</li>
              <li>What is the coolest thing your character can do?</li>
              <li>How do we win in 30 seconds?</li>
              <li>What should we save for next session?</li>
            </ul>
          </article>

          <article className="mission-card">
            <h2 className="text-2xl font-black">Keep Eli Engaged</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
              {engagementMoves.map((move) => (
                <li key={move}>{move}</li>
              ))}
            </ul>
          </article>

          <article className="mission-card">
            <h2 className="text-2xl font-black">If You Get Frustrated</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
              {focusResetProtocol.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </article>

          <article className="mission-card">
            <h2 className="text-2xl font-black">End-Of-Session Checklist</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
              <li>Upload new images/screenshots to Slack #art.</li>
              <li>Fill `/lp` fields with what worked and next focus.</li>
              <li>Capture one celebration moment and version name.</li>
              <li>Post the top 2 next tasks in Slack before ending.</li>
            </ul>
            <div className="mt-4">
              <Link href="/" className="mission-link inline-flex">
                Back To Mission Select
              </Link>
            </div>
          </article>
        </div>

        <aside className="lg:sticky lg:top-4 lg:self-start">
          <article className="mission-card">
            <h2 className="text-xl font-black">Quick Links (Sticky)</h2>
            <ul className="mt-3 space-y-2 text-slate-700">
              <li>
                <Link href="/play" className="underline underline-offset-2">
                  /play
                </Link>{" "}
                (game shell)
              </li>
              <li>
                <Link href="/lp" className="underline underline-offset-2">
                  /lp
                </Link>{" "}
                (lesson plan)
              </li>
              <li>
                <Link href="/dave" className="underline underline-offset-2">
                  /dave
                </Link>{" "}
                (parent setup)
              </li>
              <li>
                <Link href="/concepts" className="underline underline-offset-2">
                  /concepts
                </Link>
              </li>
              <li>
                <a
                  href={figJamBoardUrl}
                  className="underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FigJam Board
                </a>
              </li>
              <li>
                <a
                  href={slackArtChannelUrl}
                  className="underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Slack #art
                </a>
              </li>
              <li>
                <a
                  href={slackInviteUrl}
                  className="underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Slack Invite
                </a>
              </li>
              <li>
                <a
                  href={homepageUrl}
                  className="underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  woe.metalgames.xyz
                </a>
              </li>
            </ul>
            <div className="mt-4 rounded-md border border-slate-300 bg-slate-50 p-3 text-sm text-slate-700">
              <p className="font-bold text-slate-900">Host mantra</p>
              <p className="mt-1">
                Keep it fun. Keep it small. Ship one playable loop.
              </p>
            </div>
          </article>
        </aside>
      </section>
    </main>
  );
}
