"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type PointerState = {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  startedAt: number;
};

const SWIPE_THRESHOLD = 48;
const TAP_MAX_DISTANCE = 16;
const TAP_MAX_DURATION_MS = 280;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1);
}

export default function PlayPage() {
  const gameShellRef = useRef<HTMLDivElement | null>(null);
  const pointersRef = useRef<Map<number, PointerState>>(new Map());
  const pinchStartDistanceRef = useRef<number | null>(null);
  const pressedKeysRef = useRef<Set<string>>(new Set());

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [movement, setMovement] = useState({ x: 0, y: 0 });
  const [pinchScale, setPinchScale] = useState(1);
  const [actions, setActions] = useState({ a: false, b: false });
  const [gestureLog, setGestureLog] = useState<string[]>([]);

  function pushGestureLog(message: string) {
    setGestureLog((previous) =>
      [
        `${new Date().toLocaleTimeString()}: ${message}`,
        ...previous,
      ].slice(0, 6),
    );
  }

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === " " || event.key.toLowerCase() === "j") {
        setActions((previous) => ({ ...previous, a: true }));
      }
      if (event.key.toLowerCase() === "k") {
        setActions((previous) => ({ ...previous, b: true }));
      }

      const normalizedKey = event.key.toLowerCase();
      const movementKeys = new Set([
        "arrowright",
        "arrowleft",
        "arrowup",
        "arrowdown",
        "w",
        "a",
        "s",
        "d",
      ]);
      if (movementKeys.has(normalizedKey)) {
        pressedKeysRef.current.add(normalizedKey);
        const activeKeys = pressedKeysRef.current;
        const x =
          (activeKeys.has("arrowright") || activeKeys.has("d") ? 1 : 0) +
          (activeKeys.has("arrowleft") || activeKeys.has("a") ? -1 : 0);
        const y =
          (activeKeys.has("arrowdown") || activeKeys.has("s") ? 1 : 0) +
          (activeKeys.has("arrowup") || activeKeys.has("w") ? -1 : 0);
        setMovement({ x: clamp(x, -1, 1), y: clamp(y, -1, 1) });
      }
    }

    function onKeyUp(event: KeyboardEvent) {
      if (event.key === " " || event.key.toLowerCase() === "j") {
        setActions((previous) => ({ ...previous, a: false }));
      }
      if (event.key.toLowerCase() === "k") {
        setActions((previous) => ({ ...previous, b: false }));
      }

      const normalizedKey = event.key.toLowerCase();
      const movementKeys = new Set([
        "arrowright",
        "arrowleft",
        "arrowup",
        "arrowdown",
        "w",
        "a",
        "s",
        "d",
      ]);
      if (movementKeys.has(normalizedKey)) {
        pressedKeysRef.current.delete(normalizedKey);
        const activeKeys = pressedKeysRef.current;
        const x =
          (activeKeys.has("arrowright") || activeKeys.has("d") ? 1 : 0) +
          (activeKeys.has("arrowleft") || activeKeys.has("a") ? -1 : 0);
        const y =
          (activeKeys.has("arrowdown") || activeKeys.has("s") ? 1 : 0) +
          (activeKeys.has("arrowup") || activeKeys.has("w") ? -1 : 0);
        setMovement({ x: clamp(x, -1, 1), y: clamp(y, -1, 1) });
      }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  function getTwoPointers() {
    return Array.from(pointersRef.current.values()).slice(0, 2);
  }

  function updateMovementFromPrimaryPointer() {
    const firstPointer = pointersRef.current.values().next().value as
      | PointerState
      | undefined;
    if (!firstPointer) {
      setMovement({ x: 0, y: 0 });
      return;
    }

    const deltaX = firstPointer.currentX - firstPointer.startX;
    const deltaY = firstPointer.currentY - firstPointer.startY;
    const nextMovement = {
      x: clamp(deltaX / 80, -1, 1),
      y: clamp(deltaY / 80, -1, 1),
    };
    setMovement((previous) =>
      Math.abs(previous.x - nextMovement.x) < 0.01 &&
      Math.abs(previous.y - nextMovement.y) < 0.01
        ? previous
        : nextMovement,
    );
  }

  function updatePinchScale() {
    const [first, second] = getTwoPointers();
    if (!first || !second) {
      pinchStartDistanceRef.current = null;
      setPinchScale(1);
      return;
    }

    const currentDistance = distance(
      first.currentX,
      first.currentY,
      second.currentX,
      second.currentY,
    );

    if (!pinchStartDistanceRef.current) {
      pinchStartDistanceRef.current = currentDistance;
      setPinchScale(1);
      return;
    }

    const nextScale = currentDistance / pinchStartDistanceRef.current;
    setPinchScale((previous) =>
      Math.abs(previous - nextScale) < 0.01 ? previous : nextScale,
    );
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, {
      startX: event.clientX,
      startY: event.clientY,
      currentX: event.clientX,
      currentY: event.clientY,
      startedAt: Date.now(),
    });
    updateMovementFromPrimaryPointer();
    updatePinchScale();
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const pointer = pointersRef.current.get(event.pointerId);
    if (!pointer) {
      return;
    }

    pointersRef.current.set(event.pointerId, {
      ...pointer,
      currentX: event.clientX,
      currentY: event.clientY,
    });

    updateMovementFromPrimaryPointer();
    updatePinchScale();
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const pointer = pointersRef.current.get(event.pointerId);
    if (pointer) {
      const deltaX = pointer.currentX - pointer.startX;
      const deltaY = pointer.currentY - pointer.startY;
      const gestureDistance = Math.hypot(deltaX, deltaY);
      const durationMs = Date.now() - pointer.startedAt;

      if (
        gestureDistance <= TAP_MAX_DISTANCE &&
        durationMs <= TAP_MAX_DURATION_MS
      ) {
        pushGestureLog("Tap");
      } else if (gestureDistance >= SWIPE_THRESHOLD && durationMs < 900) {
        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
          pushGestureLog(deltaX > 0 ? "Swipe Right →" : "← Swipe Left");
        } else {
          pushGestureLog(deltaY > 0 ? "Swipe Down ↓" : "↑ Swipe Up");
        }
      }
    }

    pointersRef.current.delete(event.pointerId);
    updateMovementFromPrimaryPointer();
    updatePinchScale();
  }

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement && gameShellRef.current) {
        await gameShellRef.current.requestFullscreen();
        return;
      }

      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {
      pushGestureLog("Fullscreen request failed on this browser/device");
    }
  }

  function setDirectionalInput(x: number, y: number, pressed: boolean) {
    setMovement(pressed ? { x, y } : { x: 0, y: 0 });
  }

  function setActionInput(button: "a" | "b", pressed: boolean) {
    setActions((previous) => ({ ...previous, [button]: pressed }));
  }

  return (
    <main className="min-h-screen mario-bg px-4 py-8 sm:px-6 sm:py-12">
      <section className="question-panel mx-auto flex w-full max-w-5xl flex-col gap-5">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              🕹️ /play
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
              Game Lab
            </h1>
            <p className="mt-1 text-slate-600">
              Touch, keyboard &amp; fullscreen — ready for your game engine!
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="mario-btn"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? "↙ Exit Full Screen" : "⛶ Full Screen"}
            </button>
            <Link href="/" className="mission-link">
              ← Mission Select
            </Link>
          </div>
        </div>

        {/* Game container */}
        <div
          ref={gameShellRef}
          className="relative isolate overflow-hidden rounded-2xl border-4 border-slate-900 bg-slate-950 text-white shadow-[0_8px_0_#0f172a]"
        >
          <div
            className="relative h-[70vh] w-full touch-none overscroll-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#38bdf8_0%,#0f172a_55%,#020617_100%)]" />

            {/* Center message */}
            <div className="absolute inset-0 p-4">
              <div className="flex h-full items-center justify-center rounded-xl border-2 border-white/15 bg-black/20">
                <div className="text-center px-4">
                  <p className="text-4xl" aria-hidden="true">
                    🚀
                  </p>
                  <p className="mt-3 text-2xl font-bold sm:text-3xl">
                    Game Loading Zone
                  </p>
                  <p className="mt-2 text-sm text-slate-300 sm:text-base">
                    Your game engine (Canvas / Phaser / Three.js) plugs in here.
                  </p>
                </div>
              </div>
            </div>

            {/* HUD overlay */}
            <div className="pointer-events-none absolute left-3 top-3 rounded-lg bg-black/60 px-3 py-2 text-xs font-mono backdrop-blur-sm">
              <p>
                Move: {movement.x.toFixed(2)}, {movement.y.toFixed(2)}
              </p>
              <p>Pinch: {pinchScale.toFixed(2)}</p>
              <p>
                A:{" "}
                <span className={actions.a ? "text-emerald-400" : ""}>
                  {actions.a ? "ON" : "off"}
                </span>{" "}
                / B:{" "}
                <span className={actions.b ? "text-fuchsia-400" : ""}>
                  {actions.b ? "ON" : "off"}
                </span>
              </p>
            </div>

            {/* D-pad */}
            <div className="absolute bottom-3 left-3 flex gap-1.5 sm:gap-2">
              {[
                { label: "◀", x: -1, y: 0 },
                { label: "▲", x: 0, y: -1 },
                { label: "▼", x: 0, y: 1 },
                { label: "▶", x: 1, y: 0 },
              ].map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  className="rounded-lg border-2 border-white/30 bg-white/10 px-3 py-2 text-base font-bold backdrop-blur-sm transition-colors active:bg-white/30"
                  onPointerDown={() =>
                    setDirectionalInput(btn.x, btn.y, true)
                  }
                  onPointerUp={() =>
                    setDirectionalInput(btn.x, btn.y, false)
                  }
                  onPointerCancel={() =>
                    setDirectionalInput(btn.x, btn.y, false)
                  }
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* A / B buttons */}
            <div className="absolute bottom-3 right-3 flex gap-2">
              <button
                type="button"
                className="h-14 w-14 rounded-full border-3 border-emerald-300/80 bg-emerald-500/40 text-lg font-black backdrop-blur-sm transition-colors active:bg-emerald-500/70"
                onPointerDown={() => setActionInput("a", true)}
                onPointerUp={() => setActionInput("a", false)}
                onPointerCancel={() => setActionInput("a", false)}
              >
                A
              </button>
              <button
                type="button"
                className="h-14 w-14 rounded-full border-3 border-fuchsia-300/80 bg-fuchsia-500/40 text-lg font-black backdrop-blur-sm transition-colors active:bg-fuchsia-500/70"
                onPointerDown={() => setActionInput("b", true)}
                onPointerUp={() => setActionInput("b", false)}
                onPointerCancel={() => setActionInput("b", false)}
              >
                B
              </button>
            </div>
          </div>
        </div>

        {/* Gesture log */}
        <section className="mission-card card-blue">
          <h2 className="text-lg font-bold">📡 Input Log</h2>
          {gestureLog.length > 0 ? (
            <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm text-slate-600 font-mono">
              {gestureLog.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              Tap, swipe, or pinch in the play area to see events here.
            </p>
          )}
        </section>
      </section>
    </main>
  );
}
