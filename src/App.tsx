import { useCallback, useState } from 'react';
import { achievements, education, experience, languages, profile, projects, skills, ui, type Lang } from './data';
import { useKonami, useLang, usePrefersReducedMotion, useReveal, useRoute, useTypewriter } from './hooks';
import { CvPage, cvFile } from './CvPage';
import { enableSfxNow, sfx, useSound } from './sound';

export function App() {
  const [lang, setLang] = useLang();
  const route = useRoute();
  return route === 'cv' ? <CvPage lang={lang} setLang={setLang} /> : <Portfolio lang={lang} setLang={setLang} />;
}

type Props = { lang: Lang; setLang: (l: Lang) => void };

function LangToggle({ lang, setLang }: Props) {
  return (
    <div className="lang" role="group" aria-label="Language">
      {(['en', 'es'] as const).map((l) => (
        <button
          key={l}
          type="button"
          data-sfx="none"
          className={lang === l ? 'active' : ''}
          aria-pressed={lang === l}
          onClick={() => {
            if (l !== lang) sfx.coin();
            setLang(l);
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function SectionTitle({ title, sub, index }: { title: string; sub: string; index: string }) {
  return (
    <header className="section-title" data-reveal>
      <span className="section-index">{index}</span>
      <div>
        <h2 className="glow">{title}</h2>
        <p>{sub}</p>
      </div>
    </header>
  );
}

function Portfolio({ lang, setLang }: Props) {
  const t = (s: Record<Lang, string>) => s[lang];
  const reduced = usePrefersReducedMotion();
  const typed = useTypewriter(profile.roles, reduced);
  const [turbo, setTurbo] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal([lang]);
  const [soundOn, setSoundOn] = useSound();
  useKonami(
    useCallback(() => {
      sfx.powerUp();
      setTurbo((v) => !v);
    }, []),
  );

  const nav = [
    ['about', ui.nav.about],
    ['experience', ui.nav.experience],
    ['projects', ui.nav.projects],
    ['skills', ui.nav.skills],
    ['contact', ui.nav.contact],
  ] as const;

  return (
    <div className={`app${turbo ? ' turbo' : ''}`}>
      <div className="bg-grid" aria-hidden />
      <div className="scanlines" aria-hidden />

      <nav className="nav">
        <a href="#top" className="logo" aria-label="Diego Marzioni, home">
          <span>D</span>M<span className="cursor">_</span>
        </a>
        <button type="button" className="menu-btn" aria-expanded={menuOpen} aria-label="Menu" onClick={() => setMenuOpen((v) => !v)}>
          ☰
        </button>
        <ul className={menuOpen ? 'open' : ''}>
          {nav.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {t(label)}
              </a>
            </li>
          ))}
          <li>
            <a href="#/cv" className="nav-cv" onClick={() => setMenuOpen(false)}>
              {t(ui.nav.cv)}
            </a>
          </li>
        </ul>
        <LangToggle lang={lang} setLang={setLang} />
        <button
          type="button"
          className="sound-btn"
          data-sfx="none"
          aria-pressed={soundOn}
          aria-label={soundOn ? 'Mute sound effects' : 'Enable sound effects'}
          title={soundOn ? 'Sound: on' : 'Sound: off'}
          onClick={() => {
            if (!soundOn) {
              enableSfxNow();
              sfx.coin();
            }
            setSoundOn(!soundOn);
          }}
        >
          {soundOn ? '🔊' : '🔇'}
        </button>
      </nav>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero-text">
            <p className="player">
              <span className="dot" /> {t(ui.hero.player)} · <span className="status">{t(ui.hero.status)}</span>
            </p>
            <h1 className="glitch" data-text={profile.name}>
              {profile.name}
            </h1>
            <p className="role">
              {t(profile.title)} <span className="sep">//</span>{' '}
              <span className="typed">
                {typed}
                <span className="cursor">▍</span>
              </span>
            </p>
            <dl className="stats">
              <div>
                <dt>{t(ui.hero.classLabel)}</dt>
                <dd>Front-end · Full Stack</dd>
              </div>
              <div>
                <dt>{t(ui.hero.guildLabel)}</dt>
                <dd>PMG Global Advisors</dd>
              </div>
              <div>
                <dt>{t(ui.hero.baseLabel)}</dt>
                <dd>{t(profile.location)}</dd>
              </div>
            </dl>
            <div className="cta">
              <a href="#projects" className="btn primary">
                ▶ {t(ui.hero.cta)}
              </a>
              <a href={cvFile(lang)} className="btn" download>
                ⤓ {t(ui.hero.cv)}
              </a>
              <a href={profile.github} className="btn icon" target="_blank" rel="noreferrer" aria-label="GitHub">
                GH
              </a>
              <a href={profile.linkedin} className="btn icon" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                in
              </a>
            </div>
          </div>
          <div className="avatar-frame" aria-hidden={false}>
            <img src={`${import.meta.env.BASE_URL}avatar.jpg`} alt={profile.name} width={320} height={320} />
            <span className="corner tl" />
            <span className="corner tr" />
            <span className="corner bl" />
            <span className="corner br" />
            <span className="hp">
              HP <i style={{ width: '100%' }} />
            </span>
          </div>
          <a href="#about" className="press-start" data-sfx="none" onClick={() => sfx.start()}>
            {t(ui.hero.start)}
          </a>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <SectionTitle index="01" title={t(ui.sections.about.title)} sub={t(ui.sections.about.sub)} />
          <div className="about card" data-reveal>
            <p>{t(profile.summary)}</p>
            <ul className="about-langs">
              {languages.map((l) => (
                <li key={l.name.en}>
                  <strong>{t(l.name)}</strong> · {t(l.level)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section">
          <SectionTitle index="02" title={t(ui.sections.experience.title)} sub={t(ui.sections.experience.sub)} />
          <ol className="quests">
            {experience.map((job) => (
              <li key={job.company} className="card quest" data-reveal>
                <div className="quest-head">
                  <div>
                    <h3>{t(job.role)}</h3>
                    <p className="company">
                      {job.company} · <span>{t(job.place)}</span>
                    </p>
                  </div>
                  <div className="quest-meta">
                    {job.current && <span className="badge live">{t(ui.labels.current)}</span>}
                    <span className="period">{t(job.period)}</span>
                  </div>
                </div>
                <ul>
                  {job.bullets.map((b) => (
                    <li key={b.en}>{t(b)}</li>
                  ))}
                </ul>
                <p className="chips">
                  {job.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section">
          <SectionTitle index="03" title={t(ui.sections.projects.title)} sub={t(ui.sections.projects.sub)} />
          <div className="missions">
            {projects.map((p) => (
              <article key={p.name} className={`card mission ${p.status}`} data-reveal>
                <header>
                  <span className={`badge ${p.status}`}>{t(ui.status[p.status])}</span>
                  <h3>{p.name}</h3>
                  <p className="tagline">{t(p.tagline)}</p>
                </header>
                <p>{t(p.description)}</p>
                <p className="chips">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </p>
                <footer>
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer">
                      {'</>'} {t(ui.labels.code)}
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer">
                      ↗ {t(ui.labels.live)}
                    </a>
                  )}
                </footer>
              </article>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section">
          <SectionTitle index="04" title={t(ui.sections.skills.title)} sub={t(ui.sections.skills.sub)} />
          <div className="inventory">
            {skills.map((g) => (
              <div key={g.group.en} className="card slot-group" data-reveal>
                <h3>{t(g.group)}</h3>
                <ul>
                  {g.items.map((s) => (
                    <li key={s.name} className={`slot ${s.tier}`} title={t(ui.tiers[s.tier])}>
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="legend" data-reveal>
            {(['legendary', 'epic', 'rare'] as const).map((tier) => (
              <span key={tier} className={`slot ${tier}`}>
                {t(ui.tiers[tier])}
              </span>
            ))}
          </p>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="section">
          <SectionTitle index="05" title={t(ui.sections.achievements.title)} sub={t(ui.sections.achievements.sub)} />
          <div className="achievements">
            {achievements.map((a) => (
              <div key={a.title.en} className="card trophy" data-reveal>
                <span className="trophy-icon" aria-hidden>
                  🏆
                </span>
                <div>
                  <h3>{t(a.title)}</h3>
                  <p>
                    {a.issuer} · {t(a.date)}
                    {a.url && (
                      <>
                        {' · '}
                        <a href={a.url} target="_blank" rel="noreferrer">
                          {t(ui.labels.verify)}
                        </a>
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <h3 className="sub-heading" data-reveal>
            {t(ui.labels.education)}
          </h3>
          <div className="achievements">
            {education.map((e) => (
              <div key={e.school} className="card trophy" data-reveal>
                <span className="trophy-icon" aria-hidden>
                  🎓
                </span>
                <div>
                  <h3>{t(e.title)}</h3>
                  <p>
                    {e.school} · {t(e.period)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section">
          <SectionTitle index="06" title={t(ui.sections.contact.title)} sub={t(ui.sections.contact.sub)} />
          <div className="card contact" data-reveal>
            <p>{t(ui.labels.contactText)}</p>
            <div className="cta">
              <a href={`mailto:${profile.email}`} className="btn primary">
                ✉ {t(ui.labels.email)}
              </a>
              <a href={profile.linkedin} className="btn" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={profile.github} className="btn" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
            <p className="mail">{profile.email}</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {profile.name} · {t(ui.labels.footer)}
        </p>
        <p className="hint">↑ ↑ ↓ ↓ ← → ← → B A</p>
      </footer>
    </div>
  );
}
