import { useEffect, useState } from 'react';
import type { Lang } from './data';

const LANG_KEY = 'dm.lang';

function readLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'en' || saved === 'es') return saved;
  } catch {
    /* storage unavailable */
  }
  return 'en';
}

/** Language preference, remembered per visitor. English by default. */
export function useLang() {
  const [lang, setLang] = useState<Lang>(readLang);
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);
  return [lang, setLang] as const;
}

/** Tiny hash router: '#/cv' shows the printable CV, anything else the portfolio. */
export function useRoute() {
  const get = () => (window.location.hash.startsWith('#/cv') ? 'cv' : 'home');
  const [route, setRoute] = useState<'cv' | 'home'>(get);
  useEffect(() => {
    const onHash = () => {
      const next = get();
      setRoute((prev) => {
        // Only jump to the top when switching pages, not on in-page anchors.
        if (prev !== next) window.scrollTo(0, 0);
        return next;
      });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

/** Cycles through words with a typing / deleting effect. */
export function useTypewriter(words: string[], reduced: boolean) {
  const [text, setText] = useState(reduced ? words[0] : '');
  useEffect(() => {
    if (reduced) return;
    let word = 0;
    let char = 0;
    let deleting = false;
    let timer: number;
    const tick = () => {
      const current = words[word];
      char += deleting ? -1 : 1;
      setText(current.slice(0, char));
      let delay = deleting ? 45 : 90;
      if (!deleting && char === current.length) {
        deleting = true;
        delay = 1600;
      } else if (deleting && char === 0) {
        deleting = false;
        word = (word + 1) % words.length;
        delay = 300;
      }
      timer = window.setTimeout(tick, delay);
    };
    timer = window.setTimeout(tick, 400);
    return () => window.clearTimeout(timer);
  }, [words, reduced]);
  return text;
}

export function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/** Adds the "visible" class to [data-reveal] elements when they scroll into view. */
export function useReveal(deps: unknown[]) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

/** Easter egg: the Konami code toggles "turbo mode". */
export function useKonami(onUnlock: () => void) {
  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      pos = e.key === KONAMI[pos] ? pos + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (pos === KONAMI.length) {
        pos = 0;
        onUnlock();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onUnlock]);
}
