"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function PlayPage() {
  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement && gameContainerRef.current) {
        await gameContainerRef.current.requestFullscreen();
        return;
      }

      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {
      // no-op
    }
  }

  return (
    <main className="fixed inset-0 h-screen w-screen overflow-hidden bg-black">
      <div ref={gameContainerRef} id="game-container" className="h-full w-full touch-none">
        <div className="absolute right-3 top-3 z-10 flex gap-2">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="rounded-md border border-white/40 bg-black/60 px-3 py-2 text-sm text-white"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? "Exit Full" : "Full Screen"}
          </button>
          <Link
            href="/"
            className="rounded-md border border-white/40 bg-black/60 px-3 py-2 text-sm text-white"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
