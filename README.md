<div align="center">
  <h1>diegomarzioni.github.io</h1>
  <p>My personal portfolio — a game-inspired, bilingual (EN/ES) single page with a printable CV.</p>
  <a href="https://diegomarzioni.github.io/"><b>🌐 Visit the site</b></a>
  <br/><br/>
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white" alt="GitHub Pages"/>
</div>

---

## Highlights

- 🎮 **Game-inspired UI**: neon perspective grid, glitch title, HUD-style cards, "inventory" skills with rarity tiers and "achievements" for certifications — without giving up readability.
- 🌐 **Bilingual**: English by default with a Spanish toggle, remembered per visitor.
- 📄 **Printable CV** at [`#/cv`](https://diegomarzioni.github.io/#/cv), generated from the same data as the site, so both always stay in sync. "Download PDF" uses the browser's print dialog.
- ♿ **Accessible**: semantic HTML, keyboard focus styles, and all animations disabled for `prefers-reduced-motion`.
- ⚡ **Zero runtime dependencies** besides React; a tiny hash router and custom hooks (typewriter, scroll reveal, language).
- 🕹️ Hidden easter egg. Hint: it's in the footer.

## Structure

```
src/
├── data.ts      # All content (EN/ES): profile, experience, projects, skills, certifications
├── App.tsx      # Portfolio sections
├── CvPage.tsx   # Printable CV
├── hooks.ts     # useLang, useRoute, useTypewriter, useReveal, useKonami…
└── styles.css   # Theme, effects and print styles
```

## Run locally

```bash
npm install
npm run dev
```

Deployed automatically to GitHub Pages on every push to `main` (see `.github/workflows/deploy.yml`).

> Rollup is pinned to its WebAssembly build (`@rollup/wasm-node`) through `overrides`, so the project also builds on machines where native binaries are blocked.
