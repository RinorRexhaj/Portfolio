import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import type { Company } from "../../types/Experience";

interface CompanyLineProps {
  company: Company;
}

/**
 * Company name plus sector. Sector is muted inline text rather than the old
 * 62-character pill, which wrapped to three lines inside a rounded-full badge
 * on mobile.
 */
const CompanyLine: React.FC<CompanyLineProps> = ({ company }) => (
  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-spaceGrotesk text-text-secondary">
    <FontAwesomeIcon
      icon={faBriefcase}
      className="text-electric-blue"
      aria-hidden="true"
    />
    <span className="text-lg text-text-primary">{company.name}</span>
    {company.url && (
      <a
        href={company.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-grid place-items-center w-6 h-6 shrink-0 rounded text-sm text-electric-blue transition-colors hover:text-neon-purple"
        aria-label={`Visit the ${company.name} website (opens in a new tab)`}
      >
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" />
      </a>
    )}
    {company.sector.length > 0 && (
      <span className="text-sm text-text-secondary/60">
        · {company.sector.join(" · ")}
      </span>
    )}
  </p>
);

export default CompanyLine;
