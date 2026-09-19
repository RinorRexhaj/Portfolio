export type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship";

export type LocationType = "on-site" | "hybrid" | "remote";

export interface Company {
  name: string;
  url?: string;
  /** Short sector tags, e.g. ["Cyber Security", "SaaS"]. Two words each, max. */
  sector: string[];
}

export interface ExperienceRole {
  /** Stable key. Never derive React keys from the array index. */
  id: string;
  title: string;
  company: Company;
  location: string;
  locationType?: LocationType;
  employmentType?: EmploymentType;
  /** ISO year-month ("2025-08"). Machine-readable, so <time dateTime> works. */
  start: string;
  /** ISO year-month, or null while the role is current. */
  end: string | null;
  /** One sentence. This is what a recruiter reads in their first three seconds. */
  summary: string;
  /** Impact first, one figure each. Cap at four: more dilutes the first three. */
  highlights: string[];
  /** Keyword-match surface. Name the technology exactly as a recruiter searches it. */
  stack: string[];
  /** Titles from src/utils/Projects.ts. Links career history to the project carousel. */
  relatedProjects?: string[];
}
