import { useEffect } from 'react';
import { achievements, education, experience, languages, profile, projects, skills, ui, type Lang } from './data';

type Props = { lang: Lang; setLang: (l: Lang) => void };

const headings = {
  summary: { en: 'Professional summary', es: 'Perfil profesional' },
  experience: { en: 'Experience', es: 'Experiencia' },
  projects: { en: 'Projects', es: 'Proyectos' },
  skills: { en: 'Technical skills', es: 'Habilidades técnicas' },
  education: { en: 'Education', es: 'Formación' },
  certs: { en: 'Certifications', es: 'Certificaciones' },
  languages: { en: 'Languages', es: 'Idiomas' },
};

/** Printable, ATS-friendly CV generated from the same data as the portfolio. */
export function CvPage({ lang, setLang }: Props) {
  const t = (s: Record<Lang, string>) => s[lang];
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div className="cv-wrap">
      <div className="cv-toolbar no-print">
        <a href="#top">{t(ui.labels.back)}</a>
        <div className="cv-actions">
          {(['en', 'es'] as const).map((l) => (
            <button key={l} type="button" className={lang === l ? 'active' : ''} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
          <button type="button" className="print" onClick={() => window.print()}>
            ⤓ {t(ui.labels.print)}
          </button>
        </div>
        <p className="cv-hint">{t(ui.labels.printHint)}</p>
      </div>

      <article className="cv">
        <header>
          <h1>{profile.name}</h1>
          <p className="cv-title">{t(profile.title)} · React · Next.js · TypeScript · NestJS · React Native</p>
          <p className="cv-contact">
            {t(profile.location)} · <a href={`mailto:${profile.email}`}>{profile.email}</a> ·{' '}
            <a href={profile.linkedin}>linkedin.com/in/diego-marzioni</a> · <a href={profile.github}>github.com/DiegoMarzioni</a> ·{' '}
            <a href="https://diegomarzioni.github.io/">diegomarzioni.github.io</a>
          </p>
        </header>

        <section>
          <h2>{t(headings.summary)}</h2>
          <p>{t(profile.summary)}</p>
        </section>

        <section>
          <h2>{t(headings.experience)}</h2>
          {experience.map((job) => (
            <div key={job.company} className="cv-item">
              <div className="cv-row">
                <strong>
                  {t(job.role)} — {job.company}
                </strong>
                <span>{t(job.period)}</span>
              </div>
              <p className="cv-muted">{t(job.place)}</p>
              <ul>
                {job.bullets.map((b) => (
                  <li key={b.en}>{t(b)}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>{t(headings.projects)}</h2>
          {projects.map((p) => (
            <div key={p.name} className="cv-item">
              <div className="cv-row">
                <strong>
                  {p.name} — {t(p.tagline)}
                </strong>
                <span>{p.repo ? <a href={p.repo}>GitHub · {p.repo.split('/').pop()}</a> : t(ui.status.private)}</span>
              </div>
              <p>{t(p.description)}</p>
              <p className="cv-muted">{p.stack.join(' · ')}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>{t(headings.skills)}</h2>
          {skills.map((g) => (
            <p key={g.group.en}>
              <strong>{t(g.group)}:</strong> {g.items.map((s) => s.name).join(', ')}
            </p>
          ))}
        </section>

        <section className="cv-two">
          <div>
            <h2>{t(headings.education)}</h2>
            {education.map((e) => (
              <p key={e.school}>
                <strong>{t(e.title)}</strong> — {e.school}, {t(e.period)}
              </p>
            ))}
            <h2>{t(headings.languages)}</h2>
            {languages.map((l) => (
              <p key={l.name.en}>
                <strong>{t(l.name)}</strong> — {t(l.level)}
              </p>
            ))}
          </div>
          <div>
            <h2>{t(headings.certs)}</h2>
            {achievements.map((a) => (
              <p key={a.title.en}>
                <strong>{t(a.title)}</strong> — {a.issuer}, {t(a.date)}
              </p>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
