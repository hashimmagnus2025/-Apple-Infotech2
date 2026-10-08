/**
 * Tiny event bridge between the Loader and the Hero entrance timeline.
 * The Loader calls markIntroReady() at its handoff point; Hero subscribes.
 */
export const INTRO_EVENT = "ai:intro-ready";
let ready = false;

export function isIntroReady() {
  return ready;
}

export function markIntroReady() {
  if (ready || typeof window === "undefined") return;
  ready = true;
  window.dispatchEvent(new Event(INTRO_EVENT));
}

export function onIntroReady(cb: () => void): () => void {
  if (ready) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(INTRO_EVENT, handler, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, handler);
}
