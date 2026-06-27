/**
 * config.js — Project NOVA
 *
 * Site-wide configuration and content data.
 * This is the single place to update personal information.
 *
 * Used by: Hero, About, Contact, Footer, SEO meta, Loader sequence.
 * PRD Reference: PRD.md §8 — Story Narrative, §11 — Section Specifications
 */

import resumePdf from '../assets/resume.pdf';

/* ── SITE IDENTITY ────────────────────────────────────────────── */
/**
 * Core identity information.
 * Consumed by meta tags, Hero heading, About section, and Footer.
 */
export const SITE_CONFIG = {
  // Personal
  name:        'Abhijeet Kushwaha',
  role:        'Frontend Developer',
  roles:       ['Frontend Developer', 'CSE Student', 'Problem Solver'], /* Rotating subtitle */
  tagline:     'Building Digital Experiences',

  // SEO
  siteTitle:   'Abhijeet Kushwaha — Frontend Developer',
  description: 'Cinematic portfolio of Abhijeet Kushwaha — Frontend Developer and B.Tech CSE student at MMMUT, building modern digital experiences with React, GSAP, and creative engineering.',

  // Education
  college:     'MMMUT',                                  /* Madan Mohan Malaviya University of Technology */
  collegeFull: 'Madan Mohan Malaviya University of Technology',
  degree:      'B.Tech Computer Science & Engineering',
  graduationYear: '2026',

  // Contact
  email:       'kushwahaabhijeet2508@gmail.com',
  github:      'https://github.com/abhijeet-kushwaha',
  linkedin:    'https://linkedin.com/in/abhijeet-kushwaha',
  resume:      resumePdf,

  // Copyright
  copyrightYear: '2026',
  builtWith:     'React, GSAP & Tailwind CSS',
};


/* ── LOADER / HERO SEQUENCE ───────────────────────────────────── */
/**
 * DS §21 / PRD §9 — AI initialization sequence text.
 * Chapter One: System Initialization.
 *
 * @property {string} text  - Text displayed during initialization
 * @property {number} delay - Seconds from sequence start
 * @property {string} [className] - Optional additional styling class
 */
export const LOADER_SEQUENCE = [
  {
    id:        'init',
    text:      'SYSTEM INITIALIZING...',
    delay:     0.2,
  },
  {
    id:        'neural',
    text:      'Loading Neural Interface...',
    delay:     0.6,
  },
  {
    id:        'scan',
    text:      'Scanning Identity...',
    delay:     1.0,
  },
  {
    id:        'connect',
    text:      'Connecting NOVA...',
    delay:     1.4,
  },
  {
    id:        'granted',
    text:      'ACCESS GRANTED',
    delay:     2.0,
    highlight: true,
  },
  {
    id:        'welcome',
    text:      'Welcome Commander.',
    delay:     2.4,
  }
];

/**
 * Total duration of the loader sequence before Hero is revealed (seconds).
 */
export const LOADER_DURATION = 3.0;


/* ── HERO ANIMATION TIMELINE ──────────────────────────────────── */
/**
 * PRD §11 — Hero Animation Timeline.
 * Defines when each element appears (in seconds from sequence start).
 */
export const HERO_TIMELINE = {
  videoStart:   0,
  initializing: 0.5,
  connecting:   2.0,
  accessGranted:3.5,
  nameReveal:   4.5,
  subtitleReveal:5.2,
  ctaReveal:    6.0,
  idleAnimation:6.5,
};


/* ── ABOUT SECTION DATA ───────────────────────────────────────── */
/**
 * PRD §11 — About Section.
 * Quick facts displayed in glass cards.
 */
export const ABOUT_QUICK_FACTS = [
  {
    id:    'degree',
    label: 'Degree',
    value: 'B.Tech CSE',
    icon:  'graduation',
  },
  {
    id:    'college',
    label: 'University',
    value: 'MMMUT',
    icon:  'university',
  },
  {
    id:    'graduation',
    label: 'Graduation',
    value: '2026',
    icon:  'calendar',
  },
  {
    id:    'location',
    label: 'Location',
    value: 'India',
    icon:  'map-pin',
  },
  {
    id:    'interests',
    label: 'Interests',
    value: 'UI/UX, 3D Web',
    icon:  'star',
  },
  {
    id:    'learning',
    label: 'Current Learning',
    value: 'MERN Stack, Next.js',
    icon:  'book',
  },
];


/* ── PROJECT DATA ─────────────────────────────────────────────── */
/**
 * PRD §11 — Projects Section (Mission Archive).
 * Data-driven: adding a new project requires editing only this file.
 *
 * @property {string}   id          - Unique project identifier
 * @property {string}   title       - Project name
 * @property {string}   description - Short overview (2-3 sentences)
 * @property {string[]} tech        - Technology stack tags
 * @property {string}   github      - GitHub repository URL
 * @property {string}   [live]      - Live demo URL (optional)
 * @property {string}   status      - 'featured' | 'completed' | 'in-progress'
 * @property {string}   [image]     - Project screenshot path (from /public)
 */
export const PROJECTS = [
  {
    id:          'hirehub',
    title:       'HireHub',
    description: 'A futuristic hiring platform dashboard featuring candidate profile cards, hiring analytics, interview scheduling UI, and applicant tracking with a glowing cyber interface.',
    tech:        ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT'],
    github:      'https://github.com/abhi-9651/HIREHUB',
    live:        'https://hirehub-nova.vercel.app/',
    status:      'FEATURED',
    image:       '/images/projects/hirehub.png',
    stars:       120, // Optional mock data, can be omitted if not wanted
  },
  {
    id:          'rc-car',
    title:       'RC Car Project',
    description: 'A futuristic wireless robotic RC car with glowing circuitry, Bluetooth signals, embedded electronics, and holographic UI overlays.',
    tech:        ['Arduino', 'C++', 'JavaScript', 'Bluetooth', 'Web Bluetooth API'],
    github:      'https://github.com/abhijeet-kushwaha/rc-car',
    live:        null,
    status:      'FEATURED',
    image:       '/images/projects/rc-car.png',
    stars:       45,
  },
  {
    id:          'splitwise-clone',
    title:       'Splitwise Clone',
    description: 'A premium mobile finance application UI featuring an expense dashboard, payment cards, group expense management, charts, and transaction history.',
    tech:        ['React Native', 'Expo', 'Firebase', 'JavaScript'],
    github:      'https://github.com/abhi-9651/First_Splitwise_Clone_App..git',
    live:        null,
    status:      'LIVE',
    image:       '/images/projects/splitwise.png',
    stars:       85,
  },
];


/* ── ACHIEVEMENTS DATA ────────────────────────────────────────── */
/**
 * PRD §11 — Achievements Section (Mission Records).
 * Displayed as a vertical timeline with a glowing connecting line.
 *
 * @property {string} id       - Unique identifier
 * @property {string} title    - Achievement name
 * @property {string} org      - Organizing body or institution
 * @property {string} year     - Year achieved
 * @property {string} description - Brief detail
 * @property {string} type     - 'hackathon' | 'certification' | 'contest' | 'award'
 */
export const ACHIEVEMENTS = [
  {
    id:          'sih',
    title:       'Smart India Hackathon',
    org:         'Government of India',
    year:        '2024',
    description: 'Selected and participated in the national-level Smart India Hackathon, developing innovative solutions for real-world problems.',
    type:        'hackathon',
  },
  {
    id:          'nptel',
    title:       'NPTEL Elite Certificate',
    org:         'NPTEL / IIT',
    year:        '2024',
    description: 'Achieved Elite status in NPTEL certification — top performer recognition for outstanding course performance.',
    type:        'certification',
  },
  {
    id:          'coding-contest',
    title:       'Inter-College Coding Contest',
    org:         'MMMUT',
    year:        '2023',
    description: 'Competitive programming achievement at the university level, demonstrating problem-solving abilities.',
    type:        'contest',
  },
];


/* ── VIDEO SCENES ─────────────────────────────────────────────── */
/**
 * PRD §12 — Video Synchronization.
 * Maps each section to its background video file.
 * Videos are stored in /public/videos/.
 */
export const VIDEO_SCENES = {
  hero:         '/videos/scene-1-arrival.mp4',
  about:        '/videos/scene-2-identity.mp4',
  skills:       '/videos/scene-3-lab.mp4',
  projects:     '/videos/scene-4-archive.mp4',
  contact:      '/videos/scene-5-control.mp4',
};


/* ── SKILLS DATA ──────────────────────────────────────────────── */
/**
 * PRD §11 — Skills Section (Technology Laboratory).
 * Categorized and rendered as a responsive grid.
 *
 * proficiency: 1–5 (used for visual bar, not displayed as a number)
 * level: 'beginner' | 'intermediate' | 'advanced' | 'learning'
 */
export const SKILLS = [
  /* Programming Languages */
  { id: 'js',      name: 'JavaScript',    category: 'Programming',  proficiency: 4, level: 'advanced',     description: 'Core web scripting language for dynamic interactions.', projects: 'EduSmaran, Splitwise Clone, RC Car Project' },
  { id: 'c',       name: 'C',             category: 'Programming',  proficiency: 4, level: 'advanced',     description: 'Low-level procedural programming and system operations.', projects: 'Academic Projects' },
  { id: 'cpp',     name: 'C++',           category: 'Programming',  proficiency: 3, level: 'intermediate', description: 'Object-oriented programming for high-performance applications.', projects: 'RC Car Project, Competitive Programming' },
  { id: 'python',  name: 'Python',        category: 'Programming',  proficiency: 3, level: 'intermediate', description: 'Versatile language for scripting, data analysis, and backend.', projects: 'Academic Projects' },

  /* Frontend */
  { id: 'react',   name: 'React',         category: 'Frontend',     proficiency: 4, level: 'advanced',     description: 'Component-based UI library for building complex web applications.', projects: 'EduSmaran, Splitwise Clone, Project NOVA' },
  { id: 'html',    name: 'HTML5',         category: 'Frontend',     proficiency: 5, level: 'advanced',     description: 'Semantic markup for accessible web structure.', projects: 'All Web Projects' },
  { id: 'css',     name: 'CSS3',          category: 'Frontend',     proficiency: 4, level: 'advanced',     description: 'Styling language for responsive and modern web design.', projects: 'All Web Projects' },
  { id: 'tailwind',name: 'Tailwind CSS',  category: 'Frontend',     proficiency: 4, level: 'advanced',     description: 'Utility-first CSS framework for rapid UI development.', projects: 'EduSmaran, Splitwise Clone, Project NOVA' },
  { id: 'gsap',    name: 'GSAP',          category: 'Frontend',     proficiency: 3, level: 'intermediate', description: 'Robust animation library for cinematic web experiences.', projects: 'Project NOVA' },

  /* Backend */
  { id: 'nodejs',  name: 'Node.js',       category: 'Backend',      proficiency: 3, level: 'intermediate', description: 'JavaScript runtime for scalable server-side applications.', projects: 'EduSmaran' },
  { id: 'express', name: 'Express.js',    category: 'Backend',      proficiency: 3, level: 'intermediate', description: 'Minimalist web framework for Node.js RESTful APIs.', projects: 'EduSmaran' },

  /* Database */
  { id: 'mongodb', name: 'MongoDB',       category: 'Database',     proficiency: 3, level: 'intermediate', description: 'NoSQL database for flexible and scalable data storage.', projects: 'EduSmaran' },
  { id: 'firebase',name: 'Firebase',      category: 'Database',     proficiency: 3, level: 'intermediate', description: 'BaaS platform for real-time databases and authentication.', projects: 'Splitwise Clone' },

  /* Tools */
  { id: 'git',     name: 'Git',           category: 'Tools',        proficiency: 4, level: 'advanced',     description: 'Distributed version control for collaborative development.', projects: 'All Projects' },
  { id: 'github',  name: 'GitHub',        category: 'Tools',        proficiency: 4, level: 'advanced',     description: 'Cloud platform for hosting and managing Git repositories.', projects: 'All Projects' },
  { id: 'vscode',  name: 'VS Code',       category: 'Tools',        proficiency: 5, level: 'advanced',     description: 'Primary IDE equipped with productivity-enhancing extensions.', projects: 'All Projects' },
  { id: 'arduino', name: 'Arduino',       category: 'Tools',        proficiency: 3, level: 'intermediate', description: 'Open-source electronics platform for hardware prototyping.', projects: 'RC Car Project' },

  /* Currently Learning */
  { id: 'ts',      name: 'TypeScript',    category: 'Learning',     proficiency: 2, level: 'learning',     description: 'Strongly typed superset of JavaScript for robust code.', projects: 'Learning' },
  { id: 'nextjs',  name: 'Next.js',       category: 'Learning',     proficiency: 2, level: 'learning',     description: 'React framework for SSR and production-grade applications.', projects: 'Learning' },
  { id: 'threejs', name: 'Three.js',      category: 'Learning',     proficiency: 1, level: 'learning',     description: 'JavaScript 3D library for rendering interactive graphics.', projects: 'Project NOVA (Technology Sphere)' },
];

/**
 * Ordered skill categories for tab/filter display.
 */
export const SKILL_CATEGORIES = [
  'Programming',
  'Frontend',
  'Backend',
  'Database',
  'Tools',
  'Learning',
];
