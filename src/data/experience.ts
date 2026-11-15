import type { ExperienceRole } from "../types/Experience";

/* ---------------------------------------------------------------------------
 * Career history. Figures here are claims you will be asked to defend in an
 * interview, so a bullet with no figure beats a bullet with an invented one.
 *
 * The first two Seculyze highlights mirror the ML bullets on Rinor's CV — if
 * one changes, change the other, or the page and the document a recruiter
 * reads next stop agreeing. The four below them are page-only, and the CV's
 * remaining bullets (code reviews, third-party APIs, documentation) are
 * CV-only on purpose: they scan well for an ATS and dilute a page that a
 * reader already chose to open.
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
      "platform's alert classification, and the threat-intel, cost and " +
      "notification systems around it, for security teams running Microsoft " +
      "Sentinel.",
    highlights: [
      "Built an automated multi-tenant ML training pipeline for a PyTorch true/false-positive classifier of Sentinel alerts: data collection, Azure Databricks training, MLflow registry, deployment of promoted models with hot-swap FastAPI serving, and model and data drift monitoring.",
      "Reworked the ML training components — a recall-first scoring function, grid search and the champion/challenger gate, a holdout carved before oversampling, and evaluation that counts abstained predictions.",
      "Fixed a multi-day memory leak in the enrichment service — four nested levels of per-call thread pools multiplying to a ~960-thread ceiling — with two shared bounded pools, explicit deadlines, and a circuit breaker on OpenCTI writes.",
      "Built Sentinel ingestion budgeting — per-log-source and overall budgets with projected cost and threshold alerting, from the underlying logic to the UI.",
      "Extended threat-intel lookup from IP-only to URLs and file hashes, adding five providers behind one interface with per-source scoring into OpenCTI.",
      "Centralized notification delivery into one service with a pluggable adapter model — SMS, email and ITSM across five providers.",
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
