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
    setGestureLog((previous) => [
      `${new Date().toLocaleTimeString()}: ${message}`,
      ...previous,
    ].slice(0, 6));
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
    const firstPointer = pointersRef.current.values().next().value as PointerState | undefined;
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

      if (gestureDistance <= TAP_MAX_DISTANCE && durationMs <= TAP_MAX_DURATION_MS) {
        pushGestureLog("Tap");
      } else if (gestureDistance >= SWIPE_THRESHOLD && durationMs < 900) {
        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
          pushGestureLog(deltaX > 0 ? "Swipe Right" : "Swipe Left");
        } else {
          pushGestureLog(deltaY > 0 ? "Swipe Down" : "Swipe Up");
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
    <main className="min-h-screen mario-bg px-5 py-10">
      <section className="question-panel mx-auto flex w-full max-w-6xl flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              /play
            </p>
            <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">
              Game Container Shell
            </h1>
            <p className="mt-2 text-slate-700">
              Touch gestures, keyboard input, and fullscreen are wired for rapid game prototyping.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="mission-link inline-flex" onClick={toggleFullscreen}>
              {isFullscreen ? "Exit Full Screen" : "Full Screen"}
            </button>
            <Link href="/" className="mission-link inline-flex">
              Back To Mission Select
            </Link>
          </div>
        </div>

        <div
          ref={gameShellRef}
          className="relative isolate overflow-hidden rounded-xl border-4 border-slate-900 bg-slate-950 text-white shadow-[0_8px_0_#0f172a]"
        >
          <div
            className="relative h-[70vh] w-full touch-none overscroll-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#38bdf8_0%,#0f172a_55%,#020617_100%)]" />
            <div className="absolute inset-0 p-4">
              <div className="flex h-full items-center justify-center rounded-lg border border-white/20 bg-black/20">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">
                    World Of Eli Runtime
                  </p>
                  <p className="mt-2 text-2xl font-black">Drop your game engine here</p>
                  <p className="mt-2 text-sm text-slate-200">
                    Canvas/WebGL/Phaser/Three.js can mount into this container.
                  </p>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute left-3 top-3 rounded-md bg-black/50 px-3 py-2 text-xs">
              <p>
                Move X/Y: {movement.x.toFixed(2)}, {movement.y.toFixed(2)}
              </p>
              <p>Pinch Scale: {pinchScale.toFixed(2)}</p>
              <p>
                Actions: A {actions.a ? "ON" : "off"} / B {actions.b ? "ON" : "off"}
              </p>
            </div>

            <div className="absolute bottom-3 left-3 flex gap-2">
              <button
                type="button"
                className="rounded-md border border-white/40 bg-black/40 px-3 py-2 text-sm"
                onPointerDown={() => setDirectionalInput(-1, 0, true)}
                onPointerUp={() => setDirectionalInput(-1, 0, false)}
                onPointerCancel={() => setDirectionalInput(-1, 0, false)}
              >
                Left
              </button>
              <button
                type="button"
                className="rounded-md border border-white/40 bg-black/40 px-3 py-2 text-sm"
                onPointerDown={() => setDirectionalInput(0, -1, true)}
                onPointerUp={() => setDirectionalInput(0, -1, false)}
                onPointerCancel={() => setDirectionalInput(0, -1, false)}
              >
                Up
              </button>
              <button
                type="button"
                className="rounded-md border border-white/40 bg-black/40 px-3 py-2 text-sm"
                onPointerDown={() => setDirectionalInput(0, 1, true)}
                onPointerUp={() => setDirectionalInput(0, 1, false)}
                onPointerCancel={() => setDirectionalInput(0, 1, false)}
              >
                Down
              </button>
              <button
                type="button"
                className="rounded-md border border-white/40 bg-black/40 px-3 py-2 text-sm"
                onPointerDown={() => setDirectionalInput(1, 0, true)}
                onPointerUp={() => setDirectionalInput(1, 0, false)}
                onPointerCancel={() => setDirectionalInput(1, 0, false)}
              >
                Right
              </button>
            </div>

            <div className="absolute bottom-3 right-3 flex gap-2">
              <button
                type="button"
                className="rounded-full border border-emerald-300/80 bg-emerald-500/30 px-4 py-3 text-sm font-bold"
                onPointerDown={() => setActionInput("a", true)}
                onPointerUp={() => setActionInput("a", false)}
                onPointerCancel={() => setActionInput("a", false)}
              >
                A
              </button>
              <button
                type="button"
                className="rounded-full border border-fuchsia-300/80 bg-fuchsia-500/30 px-4 py-3 text-sm font-bold"
                onPointerDown={() => setActionInput("b", true)}
                onPointerUp={() => setActionInput("b", false)}
                onPointerCancel={() => setActionInput("b", false)}
              >
                B
              </button>
            </div>
          </div>
        </div>

        <section className="mission-card">
          <h2 className="text-xl font-black">Latest Gesture Events</h2>
          {gestureLog.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
              {gestureLog.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-slate-700">
              Tap, swipe, or pinch in the play area to capture touch events.
            </p>
          )}
        </section>
      </section>
    </main>
  );
}
