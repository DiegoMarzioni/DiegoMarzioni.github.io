import { useEffect, useState } from 'react';

/**
 * Tiny 8-bit style sound effects synthesized with the Web Audio API
 * (no audio files). Browsers only allow audio after a user gesture, so the
 * context is created lazily and resumed on the first click / key press.
 */
type Note = { freq: number; dur: number; type?: OscillatorType; gain?: number; slideTo?: number };

let ctx: AudioContext | null = null;
let enabled = true;

function audio() {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

function play(notes: Note[], gap = 0) {
  if (!enabled) return;
  const ac = audio();
  if (!ac || ac.state !== 'running') return;
  let t = ac.currentTime;
  for (const n of notes) {
    const osc = ac.createOscillator();
    const amp = ac.createGain();
    osc.type = n.type ?? 'square';
    osc.frequency.setValueAtTime(n.freq, t);
    if (n.slideTo) osc.frequency.exponentialRampToValueAtTime(n.slideTo, t + n.dur);
    const peak = n.gain ?? 0.04;
    amp.gain.setValueAtTime(0.0001, t);
    amp.gain.exponentialRampToValueAtTime(peak, t + 0.008);
    amp.gain.exponentialRampToValueAtTime(0.0001, t + n.dur);
    osc.connect(amp).connect(ac.destination);
    osc.start(t);
    osc.stop(t + n.dur + 0.02);
    t += n.dur + gap;
  }
}

/** Turns effects on immediately (before React re-renders), e.g. to confirm the toggle. */
export function enableSfxNow() {
  enabled = true;
}

export const sfx = {
  hover: () => play([{ freq: 880, dur: 0.035, gain: 0.018 }]),
  click: () => play([{ freq: 520, dur: 0.05, gain: 0.035 }, { freq: 1040, dur: 0.07, gain: 0.03 }]),
  coin: () => play([{ freq: 988, dur: 0.07, gain: 0.03 }, { freq: 1319, dur: 0.18, gain: 0.03 }]),
  start: () => play([{ freq: 220, dur: 0.18, type: 'sawtooth', gain: 0.025, slideTo: 880 }]),
  powerUp: () =>
    play(
      [523, 659, 784, 1047, 1319].map((freq) => ({ freq, dur: 0.07, gain: 0.03 })),
      0.01,
    ),
};

const KEY = 'dm.sound';

function readEnabled() {
  try {
    return localStorage.getItem(KEY) !== 'off';
  } catch {
    return true;
  }
}

const INTERACTIVE = 'a, button, .mission, .slot, .trophy';

/** Wires hover / click sounds through event delegation and exposes an on/off toggle. */
export function useSound() {
  const [on, setOn] = useState(readEnabled);

  useEffect(() => {
    enabled = on;
    try {
      localStorage.setItem(KEY, on ? 'on' : 'off');
    } catch {
      /* ignore */
    }
  }, [on]);

  useEffect(() => {
    const unlock = () => {
      const ac = audio();
      if (ac && ac.state === 'suspended') void ac.resume();
    };
    let last: Element | null = null;
    let lastAt = 0;
    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest(INTERACTIVE) ?? null;
      if (!el || el === last) return;
      last = el;
      const now = performance.now();
      if (now - lastAt < 60) return;
      lastAt = now;
      sfx.hover();
    };
    const onOut = (e: MouseEvent) => {
      const to = (e.relatedTarget as Element | null)?.closest(INTERACTIVE) ?? null;
      if (to !== last) last = null;
    };
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest('a, button');
      if (el && !el.closest('[data-sfx="none"]')) sfx.click();
    };
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return [on, setOn] as const;
}
