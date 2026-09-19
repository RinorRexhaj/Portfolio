import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { hasProject, selectProjectByTitle } from "../../hooks/useProjectSelection";

interface RelatedProjectsProps {
  titles: string[];
  companyName: string;
}

/**
 * The bridge from career history into the project carousel: selects the slide
 * and scrolls to it, so "what did you actually build there" is one click away.
 * Unknown titles are dropped rather than linked to the wrong slide.
 */
const RelatedProjects: React.FC<RelatedProjectsProps> = ({
  titles,
  companyName,
}) => {
  const known = titles.filter(hasProject);
  if (known.length === 0) return null;

  const openProject = (title: string) => {
    if (!selectProjectByTitle(title)) return;
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-electric-blue/20 pt-4"
      aria-label={`Projects from ${companyName}`}
    >
      <span className="font-spaceGrotesk text-sm text-text-secondary/70">
        See the work:
      </span>
      {known.map((title) => (
        <button
          key={title}
          type="button"
          onClick={() => openProject(title)}
          className="group/link inline-flex items-center gap-2 rounded font-spaceGrotesk text-sm text-electric-blue underline underline-offset-4 transition-colors hover:text-neon-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue"
        >
          {title}
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-xs transition-transform group-hover/link:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      ))}
    </nav>
  );
};

export default RelatedProjects;
