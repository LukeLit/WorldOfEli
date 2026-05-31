import Link from "next/link";

const fallbackPlayUrl = "#";
const playUrl = process.env.NEXT_PUBLIC_PLAY_URL ?? fallbackPlayUrl;
const safePlayUrl = isSafeHref(playUrl) ? playUrl : fallbackPlayUrl;
const hasPlayableBuild = safePlayUrl !== "#";
const figJamBoardUrl =
  "https://www.figma.com/board/OpO30xLt5cdUpM9r4x48kV/Untitled?node-id=0-1&t=sXaltxoug56MkQ9b-1";
const driveFolderUrl =
  "https://drive.google.com/drive/folders/1h99_8i6VuOI0fCl9eDLCv38576rDxLIH?usp=drive_link";
const slackInviteUrl =
  "https://join.slack.com/t/worldofeli/shared_invite/zt-3zw5nghjk-oZsfLGslpQ68JtfgNjvSgg";
const contactNote =
  process.env.NEXT_PUBLIC_CONTACT_NOTE ?? "Add your project notes and links here.";

function isSafeHref(href: string): boolean {
  return href.startsWith("/") || /^https?:\/\//i.test(href) || href === "#";
}

const cards = [
  ...(hasPlayableBuild
    ? [
        {
          title: "Play Eli's Game",
          description: "Launch the latest playable version.",
          href: safePlayUrl,
          cta: "Open Playable",
        },
      ]
    : []),
  {
    title: "Lesson Plan",
    description:
      "Track the questions to ask Eli and follow a clear session structure.",
    href: "/lp",
    cta: "Open /lp",
  },
  {
    title: "Concept Art",
    description: "Store characters, map sketches, and style ideas in one place.",
    href: "/concepts",
    cta: "Open Art Folder",
    secondaryHref: driveFolderUrl,
    secondaryCta: "Open Google Drive Folder",
    tertiaryHref: figJamBoardUrl,
    tertiaryCta: "Open FigJam Board",
  },
  {
    title: "Game Ideas + Docs",
    description:
      "Capture mechanics, story notes, and design decisions for each session.",
    href: "/docs",
    cta: "Open Docs Folder",
  },
  {
    title: "Build Journal",
    description: "Track what we built each session and what to do next.",
    href: "/journal",
    cta: "Open Journal",
  },
  {
    title: "Grownup Setup",
    description:
      "Parent setup checklist for uploads, Slack on all devices, and bookmarks.",
    href: "/dave",
    cta: "Open /dave",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen mario-bg px-5 py-10 text-slate-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="question-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            World Of Eli
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
            Build a game in one session
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            This is Eli&apos;s game dev basecamp. We gather ideas, concept art,
            and build notes here. When a playable build is ready, it will appear
            in Mission Select.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-amber-200 px-3 py-2 text-sm font-semibold text-amber-900">
              {contactNote}
            </span>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-white drop-shadow-[0_2px_0_#0f172a]">
            Eli&apos;s Mission Select
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {cards.map((card) => (
              <article key={card.title} className="mission-card">
                <h3 className="text-xl font-black">{card.title}</h3>
                <p className="mt-2 text-slate-700">{card.description}</p>
                {card.href.startsWith("/") ? (
                  <Link href={card.href} className="mt-4 inline-flex mission-link">
                    {card.cta}
                  </Link>
                ) : (
                  <a
                    href={card.href}
                    className="mt-4 inline-flex mission-link"
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {card.cta}
                  </a>
                )}
                {"secondaryHref" in card && card.secondaryHref ? (
                  <a
                    href={card.secondaryHref}
                    className="mt-2 inline-flex mission-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {card.secondaryCta}
                  </a>
                ) : null}
                {"tertiaryHref" in card && card.tertiaryHref ? (
                  <a
                    href={card.tertiaryHref}
                    className="mt-2 inline-flex mission-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {card.tertiaryCta}
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl">
          <div className="rounded-lg border-2 border-slate-800 bg-white/80 px-4 py-3 text-sm text-slate-700">
            <p className="font-bold text-slate-900">Grownup Corner</p>
            <p className="mt-1">
              Parent/admin tools:{" "}
              <Link href="/lp" className="underline underline-offset-2">
                lesson plan
              </Link>{" "}
              and{" "}
              <Link href="/dave" className="underline underline-offset-2">
                Dave setup checklist
              </Link>
              ,{" "}
              <a
                href={driveFolderUrl}
                className="underline underline-offset-2"
                target="_blank"
                rel="noreferrer"
              >
                Google Drive uploads
              </a>
              ,{" "}
              <a
                href={slackInviteUrl}
                className="underline underline-offset-2"
                target="_blank"
                rel="noreferrer"
              >
                Slack invite
              </a>
              .
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
