import { DateRange } from '@/domain/value-objects/DateRange'
import type { Profile } from '@/domain/entities/Profile'
import type { Experience } from '@/domain/entities/Experience'
import type { Project } from '@/domain/entities/Project'
import type { SkillGroup } from '@/domain/entities/Skill'
import type { Education } from '@/domain/entities/Education'

/**
 * Source of truth for the portfolio content, transcribed from Hendri's CV.
 * Deliberately contains NO personally identifiable contact data
 * (no phone number, no home address) — reach-out is via Calendly / email / socials.
 */

export const profile: Profile = {
  name: 'Hendri Faisal Hidayat',
  title: 'Senior Software Engineer, Frontend',
  company: 'Mekari',
  companyUrl: 'https://www.mekari.com',
  location: 'Bandung, Indonesia',
  tagline: 'I build scalable web apps, micro-frontends, and design systems.',
  summary:
    'Senior Frontend Engineer based in Bandung with around 10 years of experience building and scaling web applications. At Mekari I lead frontend architecture and large-scale migrations — micro-frontends with Module Federation, shared design systems (Mekari Pixel), and engineering quality. I care about maintainable architecture, design systems, testing, and growing the engineers around me. With a background in Industrial Engineering, I am especially drawn to digitalizing industry and ERP.',
  availableForWork: true,
  highlights: [
    { value: '~10 yrs', label: 'Frontend engineering' },
    { value: '6 yrs', label: 'Scaling frontend at Mekari' },
    { value: 'Micro-FE', label: 'Module Federation & design systems' },
    { value: '80%+', label: 'Unit-test coverage upheld' },
  ],
  socials: [
    {
      kind: 'email',
      label: 'Email',
      url: 'mailto:hendrifaisal18@gmail.com',
      handle: 'hendrifaisal18@gmail.com',
    },
    {
      kind: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/hendrifaisalhidayat/',
      handle: 'in/hendrifaisalhidayat',
    },
    {
      kind: 'github',
      label: 'GitHub',
      url: 'https://github.com/hendri1',
      handle: '@hendri1',
    },
    {
      kind: 'calendly',
      label: 'Book a call',
      url: 'https://calendly.com/hendrifaisal',
      handle: 'calendly.com/hendrifaisal',
    },
  ],
  languages: [
    { name: 'Indonesian', level: 'Native' },
    { name: 'Sundanese', level: 'Native' },
    { name: 'English', level: 'Professional' },
  ],
  softSkills: [
    'Leadership',
    'Mentoring',
    'Communication',
    'Collaboration',
    'Critical Thinking',
    'Public Speaking',
    'Adaptability',
  ],
}

export const experiences: Experience[] = [
  {
    id: 'mekari',
    company: 'Mekari',
    companyUrl: 'https://www.mekari.com',
    roles: [
      {
        title: 'Senior Software Engineer, Frontend',
        employmentType: 'Full-time',
        period: DateRange.fromMonth(2024, 8),
        location: 'Indonesia',
        highlights: [
          'Lead the frontend re-architecture and migration — authored the RFC for the new FE architecture and drove the project end-to-end.',
          'Implemented micro-frontends with Module Federation for the Jurnal application.',
          'Wrapped Mekari Pixel UI into configurable, shareable components published as a shared CDN across modules.',
          'Built Storybook for shared components; led the FE team, distributing work and managing the timeline.',
          'Mentor new joiners and FE interns; run FE weekly meetings and internal sharing sessions.',
        ],
        stack: ['Vue 3', 'Vue 2.7', 'TypeScript', 'Pinia', 'Vitest', 'Module Federation', 'Storybook'],
      },
      {
        title: 'Software Engineer, Frontend II',
        employmentType: 'Full-time',
        period: DateRange.fromMonth(2022, 3, 2024, 8),
        location: 'Indonesia',
        highlights: [
          'Developed and maintained KlikPajak (tax application); migrated legacy Thymeleaf pages to Vue.',
          'Adopted the unified design system (Mekari Pixel 2.0) across the product.',
          'Upheld 80%+ unit-test coverage and moved engineering guidelines to VitePress.',
          'Decoupled KlikPajak into separately-built instances and isolated SCM into a micro-frontend structure.',
        ],
        stack: ['Vue', 'Pinia', 'Vuex', 'Vue Test Utils', 'JSDoc', 'Storybook'],
      },
      {
        title: 'Software Engineer, Frontend',
        employmentType: 'Full-time',
        period: DateRange.fromMonth(2020, 7, 2022, 3),
        location: 'Indonesia',
        highlights: [
          'Built custom UI components on atomic-design principles, documented with Storybook.',
          'Developed KlikPajak features and prototyped Vuex-based state management.',
          'Prototyped internal KYC tooling adopting Mekari UI.',
        ],
        stack: ['Vue 3', 'Vuex', 'Storybook', 'Axios'],
      },
    ],
  },
  {
    id: 'labtek-indie',
    company: 'Labtek Indie',
    roles: [
      {
        title: 'Senior Software Engineer',
        employmentType: 'Freelance',
        period: DateRange.fromMonth(2019, 3),
        location: 'Bandung',
        highlights: [
          'Co-create digital products across fintech (lending, trading), HR (assessment & job matchmaking), and business monitoring.',
          'Frontend for Knods (web) with React.js and a learning-management system with Vue.js.',
          'Built the Knods companion mobile app with Flutter.',
        ],
        stack: ['React', 'Vue', 'Flutter'],
      },
      {
        title: 'Software Engineer',
        employmentType: 'Freelance',
        period: DateRange.fromMonth(2017, 3, 2019, 3),
        location: 'Bandung',
        highlights: [
          'Delivered web & mobile apps as a frontend (Angular, Ionic) and backend (Node.js, AdonisJS).',
          'Analysed and prototyped e-commerce and investment products.',
        ],
        stack: ['Angular', 'Ionic', 'Node.js', 'AdonisJS', 'jQuery'],
      },
    ],
  },
  {
    id: 'ralali',
    company: 'Ralali.com',
    companyUrl: 'https://www.ralali.com',
    roles: [
      {
        title: 'Frontend Engineer',
        employmentType: 'Full-time',
        period: DateRange.fromMonth(2019, 8, 2020, 4),
        location: 'Bandung',
        highlights: [
          'Developed and maintained a CMS for the BIG Agent application.',
          'Built atomic-design UI components with Storybook documentation.',
        ],
        stack: ['Nuxt', 'Axios', 'AVA', 'Storybook'],
      },
    ],
  },
  {
    id: '9cv9',
    company: '9cv9',
    roles: [
      {
        title: 'Frontend Engineer',
        employmentType: 'Part-time',
        period: DateRange.fromMonth(2019, 6, 2019, 10),
        location: 'Vietnam · Remote',
        highlights: ['Developed Jobsrefer, a recruiter management system.'],
        stack: ['Vue'],
      },
    ],
  },
  {
    id: 'terakorp',
    company: 'PT. Terakorp Indonesia',
    roles: [
      {
        title: 'Web Developer',
        employmentType: 'Full-time',
        period: DateRange.fromMonth(2018, 1, 2019, 8),
        location: 'Bandung',
        highlights: [
          'Maintained TeraMedik, a hospital information system.',
          'Built base code and structure for a public API consumed by mobile apps.',
        ],
        stack: ['PHP', 'PostgreSQL', 'JavaScript', 'jQuery'],
      },
    ],
  },
  {
    id: 'indomedia',
    company: 'CV. Indomedia Kreasi',
    roles: [
      {
        title: 'Frontend Web Developer',
        employmentType: 'Full-time',
        period: DateRange.fromMonth(2017, 8, 2017, 12),
        location: 'Bandung',
        highlights: [
          'Built a real-estate management web application (WGS project) with data-visualisation charts.',
        ],
        stack: ['Angular 2', 'PrimeNG', 'ngx-charts'],
      },
    ],
  },
  {
    id: 'ebdesk',
    company: 'PT. eBdesk Teknologi',
    roles: [
      {
        title: 'Frontend Web Developer',
        employmentType: 'Full-time',
        period: DateRange.fromMonth(2016, 7, 2017, 8),
        location: 'Bandung',
        highlights: [
          'Maintained IPA, a social-media analytics platform, with rich data visualisations.',
          'Migrated IPA to a new version with real-time data.',
        ],
        stack: ['Angular 4', 'CodeIgniter', 'D3.js', 'Highcharts', 'Socket.IO'],
      },
    ],
  },
  {
    id: 'nutrifood',
    company: 'PT. Nutrifood Indonesia',
    roles: [
      {
        title: 'Production Administrator',
        employmentType: 'Internship',
        period: DateRange.fromMonth(2015, 8, 2015, 12),
        location: 'Bekasi',
        highlights: [
          'Entered production data into the ERP application.',
          'Built a production-monitoring website as a final report.',
        ],
        stack: ['ERP'],
      },
    ],
  },
]

export const projects: Project[] = [
  {
    id: 'fe-rearchitecture',
    name: 'Frontend Re-Architecture & Micro-Frontends',
    tagline: 'Re-architecting a multi-product frontend with Module Federation',
    context: 'Mekari · Jurnal',
    description:
      'Authored the RFC and led the migration to a micro-frontend architecture using Module Federation, letting independent teams ship modules that compose into the Jurnal application.',
    stack: ['Vue 3', 'Module Federation', 'Vite', 'TypeScript', 'Storybook'],
    tags: ['Architecture', 'Micro Frontends', 'Leadership'],
    links: [],
    featured: true,
    order: 1,
  },
  {
    id: 'mekari-pixel',
    name: 'Mekari Pixel — Shared Design System',
    tagline: 'Configurable, shareable UI components delivered via CDN',
    context: 'Mekari',
    description:
      'Wrapped Mekari Pixel into configurable components shared across modules and published as a shared CDN, with a Storybook component library for consistency and delivery speed.',
    stack: ['Vue', 'Storybook', 'TypeScript', 'CDN'],
    tags: ['Design Systems', 'Developer Experience'],
    links: [],
    featured: true,
    order: 2,
  },
  {
    id: 'klikpajak',
    name: 'KlikPajak — Tax Platform',
    tagline: 'Modernising a tax application while upholding quality',
    context: 'Mekari',
    description:
      'Migrated legacy Thymeleaf pages to Vue, adopted the unified design system, decoupled the app into independently-built instances, and kept unit-test coverage above 80%.',
    stack: ['Vue', 'Pinia', 'Vuex', 'Vue Test Utils'],
    tags: ['Migration', 'Testing'],
    links: [{ label: 'klikpajak.id', url: 'https://www.klikpajak.id' }],
    featured: true,
    order: 3,
  },
  {
    id: 'knods',
    name: 'Knods — Web & Mobile Product',
    tagline: 'A marketplace connecting talent with clients',
    context: 'Labtek Indie',
    description:
      'Co-created Knods as a frontend with React.js and built the companion mobile app with Flutter, solving matchmaking between tenants/clients and talent/freelancers.',
    stack: ['React', 'Flutter'],
    tags: ['Product', 'Mobile'],
    links: [],
    featured: true,
    order: 4,
  },
]

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    skills: [
      { name: 'JavaScript', years: 10 },
      { name: 'TypeScript', years: 10 },
      { name: 'CSS · Sass · Tailwind', years: 10 },
      { name: 'Vue · Nuxt', years: 7 },
      { name: 'React · Next.js', years: 4 },
      { name: 'jQuery', years: 4 },
      { name: 'Angular', years: 2 },
      { name: 'GraphQL' },
    ],
  },
  {
    id: 'testing-tooling',
    name: 'Testing & Tooling',
    skills: [
      { name: 'Vitest' },
      { name: 'Vue Test Utils' },
      { name: 'Storybook' },
      { name: 'Module Federation' },
      { name: 'Pinia · Vuex' },
      { name: 'Vite' },
      { name: 'Bun' },
      { name: 'Git' },
    ],
  },
  {
    id: 'mobile',
    name: 'Mobile',
    skills: [
      { name: 'React Native', years: 2 },
      { name: 'Flutter' },
      { name: 'Ionic' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    skills: [
      { name: 'PHP', years: 3 },
      { name: 'MySQL', years: 3 },
      { name: 'CodeIgniter', years: 2 },
      { name: 'PostgreSQL', years: 2 },
      { name: 'Node.js' },
      { name: 'Laravel' },
      { name: 'MongoDB' },
    ],
  },
  {
    id: 'design',
    name: 'Design',
    skills: [
      { name: 'Figma' },
      { name: 'Adobe XD' },
      { name: 'Illustrator' },
      { name: 'Photoshop' },
    ],
  },
]

export const education: Education[] = [
  {
    id: 'widyatama',
    institution: 'Universitas Widyatama',
    credential: 'Bachelor of Engineering',
    field: 'Industrial Engineering',
    period: DateRange.fromMonth(2017, 9, 2021, 5),
    note: 'GPA 3.39',
  },
  {
    id: 'smkn1-cimahi',
    institution: 'SMKN 1 Cimahi',
    credential: 'Vocational High School',
    field: 'Software Engineering',
    period: DateRange.fromMonth(2012, 7, 2016, 6),
  },
]
