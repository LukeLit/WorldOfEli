import Link from "next/link";

const fallbackPlayUrl = "#";
const playUrl = process.env.NEXT_PUBLIC_PLAY_URL ?? fallbackPlayUrl;
const safePlayUrl = isSafeHref(playUrl) ? playUrl : fallbackPlayUrl;
const hasPlayableBuild = safePlayUrl !== "#";
const figJamBoardUrl =
  "https://www.figma.com/board/OpO30xLt5cdUpM9r4x48kV/Untitled?node-id=0-1&t=sXaltxoug56MkQ9b-1";
const slackArtChannelUrl = "https://worldofeli.slack.com/archives/C0B842ALLQY";
const slackInviteUrl =
  "https://join.slack.com/t/worldofeli/shared_invite/zt-3zw5nghjk-oZsfLGslpQ68JtfgNjvSgg";
const sessionGuideUrl =
  "https://docs.google.com/document/d/1DPGnzvgmL6LefsTYJi2S1X6j_LZ69lgpuKsrfohTJX4/edit";
const gameDesignDocUrl =
  "https://docs.google.com/document/d/1Q9SwF7OttUEVDRRLXdMo6_P4aRIRuWPin_GvMo7FrVc/edit";

function isSafeHref(href: string): boolean {
  return href.startsWith("/") || /^https?:\/\//i.test(href) || href === "#";
}

/* ─── Card definitions ─── */

const eliCards = [
  ...(hasPlayableBuild
    ? [
        {
          icon: "🎮",
          title: "Play Eli's Game",
          description: "Your game is ready — jump in and play!",
          href: safePlayUrl,
          cta: "PLAY NOW!",
          color: "card-green",
          big: true,
        },
      ]
    : []),
  {
    icon: "🕹️",
    title: "Game Lab",
    description: "Test controls, touch screen buttons, and game inputs!",
    href: "/play",
    cta: "Open Game Lab",
    color: "card-green",
    big: false,
  },
  {
    icon: "🎨",
    title: "Art Vault",
    description: "Your drawings, character designs, and map sketches live here!",
    href: "/concepts",
    cta: "See My Art",
    color: "card-purple",
    links: [
      { href: slackArtChannelUrl, label: "📤 Upload Art" },
      { href: figJamBoardUrl, label: "✏️ Draw on FigJam" },
    ],
    big: false,
  },
  {
    icon: "💡",
    title: "Game Ideas",
    description: "All the cool mechanics, story notes, and design plans!",
    href: "/docs",
    cta: "See Ideas",
    color: "card-orange",
    links: [
      { href: sessionGuideUrl, label: "📋 Session Guide" },
      { href: gameDesignDocUrl, label: "🎮 Design Doc" },
    ],
    big: false,
  },
  {
    icon: "📓",
    title: "Build Journal",
    description: "What we made, what was fun, and what's next!",
    href: "/journal",
    cta: "Read Journal",
    color: "card-yellow",
    big: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen mario-bg px-4 py-8 sm:px-6 sm:py-12">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        {/* ─── HERO ─── */}
        <section className="question-panel text-center">
          <p className="text-5xl sm:text-6xl animate-float" aria-hidden="true">
            🎮
          </p>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
            World Of Eli
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-slate-700 sm:text-xl">
            Welcome to your game creation headquarters!
            <br />
            Pick a mission below to start building.
          </p>
        </section>

        {/* ─── ELI'S MISSIONS ─── */}
        <section>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-white drop-shadow-[0_2px_0_#0f172a] sm:text-3xl">
            <span>⭐</span> Mission Select
          </h2>

          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {eliCards.map((card) => (
              <article
                key={card.title}
                className={`mission-card ${card.color} ${card.big ? "sm:col-span-2" : ""}`}
              >
                <span className="card-icon" aria-hidden="true">
                  {card.icon}
                </span>
                <h3 className="text-xl font-bold sm:text-2xl">{card.title}</h3>
                <p className="mt-1 text-slate-600">{card.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {card.big ? (
                    card.href.startsWith("/") ? (
                      <Link href={card.href} className="btn-green">
                        {card.cta}
                      </Link>
                    ) : (
                      <a
                        href={card.href}
                        className="btn-green"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {card.cta}
                      </a>
                    )
                  ) : card.href.startsWith("/") ? (
                    <Link href={card.href} className="mission-link">
                      {card.cta}
                    </Link>
                  ) : (
                    <a
                      href={card.href}
                      className="mission-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {card.cta}
                    </a>
                  )}

                  {"links" in card && card.links
                    ? card.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="mission-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      ))
                    : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── GROWNUP CORNER ─── */}
        <section>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-700">
            <span>🔧</span> Grownup Corner
          </h2>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <Link href="/lp" className="grownup-card block">
              <p className="font-semibold text-slate-800">📋 Lesson Plan</p>
              <p className="mt-1 text-sm text-slate-500">
                Session checklist &amp; tracking
              </p>
            </Link>

            <Link href="/dave" className="grownup-card block">
              <p className="font-semibold text-slate-800">🛠️ Dave Setup</p>
              <p className="mt-1 text-sm text-slate-500">
                Device, Slack &amp; upload checklist
              </p>
            </Link>

            <a
              href={slackInviteUrl}
              className="grownup-card block"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="font-semibold text-slate-800">💬 Join Slack</p>
              <p className="mt-1 text-sm text-slate-500">
                Team chat &amp; art uploads
              </p>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
