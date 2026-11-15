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
      "Built the automated multi-tenant ML training pipeline behind the " +
      "platform's Sentinel alert classification, and the full-stack and " +
      "security features around it, for security teams running Microsoft " +
      "Sentinel.",
    highlights: [
      "Built an automated multi-tenant ML training pipeline for a PyTorch true/false-positive classifier of Sentinel alerts: data collection, Azure Databricks training, MLflow registry, deployment of promoted models with hot-swap FastAPI serving, and model and data drift monitoring.",
      "Reworked the ML training components — a recall-first scoring function, grid search and the champion/challenger gate, a holdout carved before oversampling, and evaluation that counts abstained predictions.",
      "Built and maintained front-end, back-end and cyber security features for the Seculyze SaaS platform across a multi-tenant architecture, with scalability, security and performance in mind.",
      "Conducted code reviews, debugging and issue resolution across environments.",
      "Integrated third-party APIs and assisted with deployment, monitoring and optimisation.",
      "Documented technical specs and processes, contributing to workflow improvements.",
    ],
    stack: [
      "Python",
      "PyTorch",
      "FastAPI",
      "Celery",
      "TypeScript",
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
      "Led front-end for a cross-functional team building an AI-powered web product.",
    highlights: [
      "Led front-end architecture for an AI product, building a reusable component system.",
      "Built the interfaces that surface real-time model output, working directly with the AI/ML team on the inference contract.",
      "Delivered on-time releases across agile sprints, running task prioritisation and stakeholder communication.",
      "Fixed bugs and improved sections of the platforms on the projects I was involved in.",
    ],
    // TODO(rinor): still a guess. The previous copy named no framework for this
    // role, and your Seculyze work turns out to be Vue 3 — so "React" here has
    // no source behind it. Replace with what you actually used at Elba.
    stack: ["Angular", "TypeScript", "Node.js", "Docker"],
  },
];

/** Newest first. Sorting here keeps the component free of ordering logic. */
export const experienceByRecency = [...experience].sort((a, b) =>
  b.start.localeCompare(a.start),
);
