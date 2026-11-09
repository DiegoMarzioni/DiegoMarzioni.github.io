export type Lang = 'en' | 'es';
export type Localized = Record<Lang, string>;

export const profile = {
  name: 'Diego Marzioni',
  email: 'diegoa.marzioni@gmail.com',
  linkedin: 'https://www.linkedin.com/in/diego-marzioni/',
  github: 'https://github.com/DiegoMarzioni',
  location: { en: 'Pergamino, Buenos Aires, Argentina', es: 'Pergamino, Buenos Aires, Argentina' } as Localized,
  title: { en: 'Front-end / Full Stack Developer', es: 'Desarrollador Front-end / Full Stack' } as Localized,
  roles: ['React', 'Next.js', 'TypeScript', 'NestJS', 'React Native · Expo'],
  summary: {
    en: 'Front-end developer with a full stack toolbox. I build web and mobile products end to end — from the database schema to the last pixel — with React, Next.js, TypeScript, NestJS and React Native. Currently working remotely with English-speaking teams, and always shipping side projects.',
    es: 'Desarrollador front-end con herramientas full stack. Construyo productos web y mobile de punta a punta — del esquema de base de datos al último píxel — con React, Next.js, TypeScript, NestJS y React Native. Hoy trabajo en remoto con equipos de habla inglesa y siempre estoy construyendo proyectos propios.',
  } as Localized,
};

export type Experience = {
  role: Localized;
  company: string;
  period: Localized;
  place: Localized;
  current?: boolean;
  bullets: Localized[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    role: { en: 'Front-end Developer', es: 'Desarrollador Front-end' },
    company: 'PMG Consulting US',
    period: { en: 'Mar 2026 — Present', es: 'Mar 2026 — Actualidad' },
    place: { en: 'Remote · Full-time', es: 'Remoto · Jornada completa' },
    current: true,
    bullets: [
      {
        en: 'Build and maintain production web and mobile applications with React, Next.js and React Native for international clients.',
        es: 'Desarrollo y mantenimiento de aplicaciones web y mobile en producción con React, Next.js y React Native para clientes internacionales.',
      },
      {
        en: 'Integrate front-end features with REST APIs built in Node.js and NestJS.',
        es: 'Integración de funcionalidades front-end con APIs REST en Node.js y NestJS.',
      },
      {
        en: 'Improve performance, accessibility and reusability of UI components.',
        es: 'Mejora de rendimiento, accesibilidad y reutilización de componentes de UI.',
      },
      {
        en: 'Collaborate daily with English-speaking, cross-functional teams using Agile and Jira.',
        es: 'Trabajo diario con equipos multidisciplinarios de habla inglesa con metodologías ágiles y Jira.',
      },
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'React Native', 'NestJS', 'GCP'],
  },
  {
    role: { en: 'Teaching Assistant · Full Stack', es: 'Teaching Assistant · Full Stack' },
    company: 'Henry',
    period: { en: 'Oct 2025 — Oct 2026', es: 'Oct 2025 — Oct 2026' },
    place: { en: 'Remote · Part-time', es: 'Remoto · Media jornada' },
    bullets: [
      {
        en: 'Helped full stack students solve technical questions in JavaScript, React and backend development.',
        es: 'Acompañé a estudiantes full stack en la resolución de dudas técnicas de JavaScript, React y backend.',
      },
      {
        en: 'Reviewed code, debugged issues and supported individual and team projects.',
        es: 'Revisión de código, debugging y apoyo en proyectos individuales y grupales.',
      },
      {
        en: 'Prepared material for presentations and hands-on sessions.',
        es: 'Preparación y organización de material para presentaciones y sesiones prácticas.',
      },
    ],
    stack: ['JavaScript', 'React', 'Node.js', 'SQL'],
  },
];

export type Project = {
  name: string;
  tagline: Localized;
  description: Localized;
  stack: string[];
  repo?: string;
  live?: string;
  status: 'shipped' | 'wip' | 'private';
};

export const projects: Project[] = [
  {
    name: 'Tally',
    tagline: { en: 'Personal finance · web + mobile', es: 'Finanzas personales · web + mobile' },
    description: {
      en: 'Expense tracker I use every day. Turborepo monorepo with a Next.js PWA, an Expo app and a NestJS + Prisma API sharing types and validation. Budgets, savings goals, multi-currency (ARS/USD) and receipts in PDF.',
      es: 'App de gastos que uso todos los días. Monorepo con Turborepo: PWA en Next.js, app en Expo y API en NestJS + Prisma que comparten tipos y validaciones. Presupuestos, metas de ahorro, multimoneda (ARS/USD) y recibos en PDF.',
    },
    stack: ['Next.js', 'Expo', 'NestJS', 'Prisma', 'PostgreSQL', 'Turborepo'],
    status: 'private',
  },
  {
    name: 'DevCore',
    tagline: { en: 'Online courses platform', es: 'Plataforma de cursos online' },
    description: {
      en: 'Catalog, cart and Stripe checkout, Google/GitHub OAuth, transactional emails and an admin panel with charts. Final team project at Henry.',
      es: 'Catálogo, carrito y pagos con Stripe, login con Google/GitHub, emails transaccionales y panel de administración con gráficos. Proyecto final en equipo en Henry.',
    },
    stack: ['Next.js', 'NestJS', 'TypeORM', 'PostgreSQL', 'Stripe'],
    repo: 'https://github.com/DiegoMarzioni/devcore-courses-platform',
    live: 'https://devcore-front.vercel.app/',
    status: 'shipped',
  },
  {
    name: 'E-commerce Admin Dashboard',
    tagline: { en: 'Store back-office', es: 'Back-office de tienda' },
    description: {
      en: 'Manage products, brands, categories and orders, with sales, earnings and statistics views. JWT auth stored in cookies.',
      es: 'Gestión de productos, marcas, categorías y órdenes, con vistas de ventas, ganancias y estadísticas. Autenticación JWT con cookies.',
    },
    stack: ['Next.js 16', 'NestJS 11', 'Prisma', 'PostgreSQL', 'Recharts'],
    repo: 'https://github.com/DiegoMarzioni/ecommerce-admin-dashboard',
    status: 'shipped',
  },
  {
    name: 'Fashion Store',
    tagline: { en: 'Fashion e-commerce', es: 'E-commerce de moda' },
    description: {
      en: 'Catalog by category, cart, wishlist, checkout and order history, with an animated UI and a Swagger-documented API.',
      es: 'Catálogo por categorías, carrito, wishlist, checkout e historial de órdenes, con UI animada y API documentada con Swagger.',
    },
    stack: ['Next.js 15', 'Tailwind', 'Express', 'TypeORM', 'PostgreSQL'],
    repo: 'https://github.com/DiegoMarzioni/fashion-store-ecommerce',
    status: 'shipped',
  },
  {
    name: 'Appointment Booking App',
    tagline: { en: 'Scheduling system', es: 'Sistema de turnos' },
    description: {
      en: 'Users sign up, book and cancel appointments and manage their profile picture, with email notifications.',
      es: 'Los usuarios se registran, reservan y cancelan turnos y gestionan su foto de perfil, con notificaciones por email.',
    },
    stack: ['React', 'Vite', 'Express', 'TypeORM', 'PostgreSQL'],
    repo: 'https://github.com/DiegoMarzioni/appointment-booking-app',
    status: 'shipped',
  },
];

export type SkillTier = 'legendary' | 'epic' | 'rare';

export const skills: { group: Localized; items: { name: string; tier: SkillTier }[] }[] = [
  {
    group: { en: 'Front-end', es: 'Front-end' },
    items: [
      { name: 'React', tier: 'legendary' },
      { name: 'Next.js', tier: 'legendary' },
      { name: 'TypeScript', tier: 'legendary' },
      { name: 'JavaScript', tier: 'legendary' },
      { name: 'Tailwind CSS', tier: 'epic' },
      { name: 'HTML5 / CSS3', tier: 'epic' },
      { name: 'TanStack Query', tier: 'rare' },
    ],
  },
  {
    group: { en: 'Mobile', es: 'Mobile' },
    items: [
      { name: 'React Native', tier: 'epic' },
      { name: 'Expo', tier: 'epic' },
    ],
  },
  {
    group: { en: 'Back-end & data', es: 'Back-end y datos' },
    items: [
      { name: 'NestJS', tier: 'epic' },
      { name: 'Node.js', tier: 'epic' },
      { name: 'Express', tier: 'epic' },
      { name: 'PostgreSQL', tier: 'epic' },
      { name: 'Prisma', tier: 'epic' },
      { name: 'TypeORM', tier: 'rare' },
      { name: 'MongoDB', tier: 'rare' },
      { name: 'MySQL', tier: 'rare' },
    ],
  },
  {
    group: { en: 'Tools & practices', es: 'Herramientas y prácticas' },
    items: [
      { name: 'Git / GitHub', tier: 'legendary' },
      { name: 'GitHub Actions', tier: 'rare' },
      { name: 'Turborepo', tier: 'rare' },
      { name: 'GCP', tier: 'rare' },
      { name: 'Figma · UX/UI', tier: 'epic' },
      { name: 'Agile · Scrum · Jira', tier: 'epic' },
    ],
  },
];

export const achievements: { title: Localized; issuer: string; date: Localized; url?: string }[] = [
  {
    title: { en: 'English C1 Advanced (63/100)', es: 'Inglés C1 Avanzado (63/100)' },
    issuer: 'EF SET',
    date: { en: 'Nov 2025', es: 'Nov 2025' },
    url: 'https://cert.efset.org/Bkm74A',
  },
  {
    title: { en: 'Full Stack Web Developer', es: 'Desarrollador Web Full Stack' },
    issuer: 'Henry',
    date: { en: 'Dec 2025', es: 'Dic 2025' },
  },
  {
    title: { en: 'AI Masterclass', es: 'Masterclass de IA' },
    issuer: 'Henry',
    date: { en: 'May 2025', es: 'May 2025' },
  },
  {
    title: { en: 'Cybersecurity Fundamentals', es: 'Fundamentos de Ciberseguridad' },
    issuer: 'Santander',
    date: { en: 'Jul 2026', es: 'Jul 2026' },
  },
  {
    title: { en: 'Responsible Prompting', es: 'Prompting Responsable' },
    issuer: 'Santander',
    date: { en: 'Jul 2026', es: 'Jul 2026' },
  },
  {
    title: { en: 'Leadership in Digital Environments', es: 'Liderazgo en entornos digitales' },
    issuer: 'Santander',
    date: { en: 'Jul 2026', es: 'Jul 2026' },
  },
];

export const education: { title: Localized; school: string; period: Localized }[] = [
  {
    title: { en: 'Full Stack JavaScript Developer', es: 'Desarrollador Full Stack JavaScript' },
    school: 'Henry',
    period: { en: 'Jan 2025 — Nov 2025', es: 'Ene 2025 — Nov 2025' },
  },
  {
    title: { en: 'Full Stack Web Developer (Python)', es: 'Desarrollador Web Full Stack (Python)' },
    school: 'Codo a Codo 4.0',
    period: { en: '2023', es: '2023' },
  },
];

export const languages: { name: Localized; level: Localized }[] = [
  { name: { en: 'Spanish', es: 'Español' }, level: { en: 'Native', es: 'Nativo' } },
  { name: { en: 'English', es: 'Inglés' }, level: { en: 'C1 · Advanced', es: 'C1 · Avanzado' } },
];

/** UI copy. Section titles keep a light game flavor; subtitles stay professional. */
export const ui = {
  nav: {
    about: { en: 'About', es: 'Sobre mí' },
    experience: { en: 'Experience', es: 'Experiencia' },
    projects: { en: 'Projects', es: 'Proyectos' },
    skills: { en: 'Skills', es: 'Skills' },
    contact: { en: 'Contact', es: 'Contacto' },
    cv: { en: 'CV', es: 'CV' },
  },
  hero: {
    player: { en: 'PLAYER 1', es: 'JUGADOR 1' },
    status: { en: 'Open to remote opportunities', es: 'Abierto a oportunidades remotas' },
    classLabel: { en: 'CLASS', es: 'CLASE' },
    guildLabel: { en: 'GUILD', es: 'GREMIO' },
    baseLabel: { en: 'BASE', es: 'BASE' },
    start: { en: 'Press start', es: 'Presioná start' },
    cta: { en: 'View projects', es: 'Ver proyectos' },
    cv: { en: 'Download CV', es: 'Descargar CV' },
  },
  sections: {
    about: { title: { en: 'Character', es: 'Personaje' }, sub: { en: 'About me', es: 'Sobre mí' } },
    experience: { title: { en: 'Quest log', es: 'Misiones' }, sub: { en: 'Experience', es: 'Experiencia' } },
    projects: { title: { en: 'Missions', es: 'Proyectos' }, sub: { en: 'Selected projects', es: 'Proyectos destacados' } },
    skills: { title: { en: 'Inventory', es: 'Inventario' }, sub: { en: 'Tech stack', es: 'Stack tecnológico' } },
    achievements: { title: { en: 'Achievements', es: 'Logros' }, sub: { en: 'Certifications & education', es: 'Certificaciones y formación' } },
    contact: { title: { en: 'Join the party', es: 'Sumate a la party' }, sub: { en: 'Contact', es: 'Contacto' } },
  },
  status: {
    shipped: { en: 'Completed', es: 'Completado' },
    wip: { en: 'In progress', es: 'En progreso' },
    private: { en: 'Private · in daily use', es: 'Privado · en uso diario' },
  },
  tiers: {
    legendary: { en: 'Main', es: 'Principal' },
    epic: { en: 'Strong', es: 'Sólido' },
    rare: { en: 'Working', es: 'Funcional' },
  },
  labels: {
    current: { en: 'Active quest', es: 'Misión activa' },
    code: { en: 'Code', es: 'Código' },
    live: { en: 'Live demo', es: 'Demo' },
    education: { en: 'Education', es: 'Formación' },
    languages: { en: 'Languages', es: 'Idiomas' },
    verify: { en: 'Verify', es: 'Verificar' },
    contactText: {
      en: 'Building something and need a developer who cares about both the code and the experience? Send me a message — I usually reply within a day.',
      es: '¿Estás armando un producto y necesitás un desarrollador al que le importen tanto el código como la experiencia? Escribime, suelo responder en el día.',
    },
    email: { en: 'Send an email', es: 'Enviar un email' },
    footer: { en: 'Built with React, TypeScript and Vite.', es: 'Hecho con React, TypeScript y Vite.' },
    back: { en: '← Back to portfolio', es: '← Volver al portfolio' },
    print: { en: 'Download PDF', es: 'Descargar PDF' },
    printHint: {
      en: 'Tip: choose "Save as PDF" in the print dialog.',
      es: 'Tip: elegí "Guardar como PDF" en el diálogo de impresión.',
    },
  },
};
