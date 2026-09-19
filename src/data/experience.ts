import type { ExperienceRole } from "../types/Experience";

/* ---------------------------------------------------------------------------
 * ⚠️  UNFILLED CONTENT — DO NOT DEPLOY AS-IS
 *
 * Every [N] / [X] / [Y] below is a placeholder for a real figure. They are
 * deliberately loud so they cannot ship by accident. Replace each one with a
 * number you can defend in an interview, or delete the clause entirely — a
 * bullet with no figure still beats a bullet with an invented one.
 *
 * Lines marked TODO are facts only you know (exact stack, which portfolio
 * project came out of which role). They are left blank rather than guessed.
 *
 * This is a public page for a security vendor. Highlights name public
 * integrations and general architecture only — no internal product names, and
 * nothing describing a past credential-handling or auth weakness. Keep it that
 * way, and clear anything more specific with your lead first.
 *
 * Roles render newest-first automatically; `start`/`end` drive the ordering,
 * the <time> elements and the duration label, so keep them as ISO year-months.
 * ------------------------------------------------------------------------- */

export const experience: ExperienceRole[] = [
  {
    id: "seculyze-2025",
    title: "Software & AI/ML Engineer",
    company: {
      name: "Seculyze",
      url: "https://seculyze.com",
      sector: ["Cyber Security", "SaaS"],
    },
    location: "Copenhagen, Denmark",
    start: "2025-08",
    end: null,
    summary:
      "Own the ML training and serving pipeline behind the platform's alert classification " +
      "— its core differentiator — and build multi-tenant features across FastAPI and Vue " +
      "for managed security providers running Microsoft Sentinel.",
    highlights: [
      "Own the per-tenant model training pipeline on Azure Databricks — MLflow tracking and registry, parallel training with reproducible seeding, and quality gates that block promotion of models trained on insufficient labels. [N] tenant models in production.",
      "Cut scoring latency from [X]ms to [Y]ms by designing the model-serving cache — tenant, generic and pinned models with freshness checks and eviction — so requests resolve from memory instead of reloading per call.",
      "Took the heaviest read paths from [X] to [Y]: batched CTI/OSINT label lookups with bounded external calls, and rewrote alert-listing queries to paginate and count on indexed IDs.",
      "Generalised a single Jira integration into a pluggable ITSM adapter layer, then shipped Autotask and Xurrent on it — [N] days to add an integration, down from [X].",
    ],
    stack: [
      "Python",
      "FastAPI",
      "Celery",
      "SQLAlchemy",
      "Vue 3",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Azure Databricks",
      "MLflow",
      "Microsoft Sentinel",
    ],
    // TODO(rinor): add project titles from src/utils/Projects.ts that came out
    // of this role, e.g. relatedProjects: ["DocuForge"]. Left blank on purpose —
    // attributing a project to the wrong employer is a factual claim.
  },
  {
    id: "elba-2024",
    title: "Full-Stack Developer",
    company: {
      name: "Elba Technologies",
      url: "https://elba-tech.com",
      sector: ["Software Development"],
    },
    location: "Pristina, Kosovo / Stuttgart, Germany",
    start: "2024-08",
    end: "2025-05",
    summary:
      "Led front-end for a cross-functional team building an AI-powered web product, " +
      "from component architecture through launch.",
    highlights: [
      "Led front-end architecture for an AI product, building a reusable component system that took feature delivery from [X] to [Y] days.",
      "Built the interfaces that surface real-time model output, working directly with the AI/ML team on the inference contract.",
      "Delivered [N] releases across [N] agile sprints, running task prioritisation and stakeholder communication.",
      "Mentored [N] developers, cutting review cycles per pull request from [X] to [Y].",
    ],
    // TODO(rinor): still a guess. The previous copy named no framework for this
    // role, and your Seculyze work turns out to be Vue 3 — so "React" here has
    // no source behind it. Replace with what you actually used at Elba.
    stack: ["React", "TypeScript"],
  },
];

/** Newest first. Sorting here keeps the component free of ordering logic. */
export const experienceByRecency = [...experience].sort((a, b) =>
  b.start.localeCompare(a.start)
);
