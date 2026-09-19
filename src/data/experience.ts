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
      "Build AI/ML and backend features for a multi-tenant SaaS security platform, " +
      "owning the path from data preparation through model deployment to production monitoring.",
    highlights: [
      "Took [N] ML workflows from data preparation to production on MLflow and Azure Databricks, standardising validation and cutting model-iteration time from [X] to [Y].",
      "Built backend features across a multi-tenant architecture serving [N] tenants, holding p95 latency at [X]ms while enforcing per-tenant data isolation.",
      "Shipped [N] security detections into the platform, reducing analyst triage time by [X]%.",
      "Delivered customer service contracts end to end — performance monitoring, client support and compliance documentation — across [N] enterprise accounts.",
    ],
    // TODO(rinor): MLflow / Azure Databricks / Python are the only entries the
    // previous copy actually supported. Add the rest of what you use daily.
    stack: ["Python", "MLflow", "Azure Databricks"],
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
    // TODO(rinor): confirm — the previous copy named no framework for this role.
    stack: ["React", "TypeScript"],
  },
];

/** Newest first. Sorting here keeps the component free of ordering logic. */
export const experienceByRecency = [...experience].sort((a, b) =>
  b.start.localeCompare(a.start)
);
