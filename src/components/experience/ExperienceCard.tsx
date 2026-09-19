import { motion, useReducedMotion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import type { ExperienceRole } from "../../types/Experience";
import CompanyLine from "./CompanyLine";
import RolePeriod from "./RolePeriod";
import StackChips from "./StackChips";
import RelatedProjects from "./RelatedProjects";

interface ExperienceCardProps {
  role: ExperienceRole;
}

const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staticVariants = {
  hidden: { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0 },
};

/**
 * One role. Reads top to bottom as four tiers of decreasing weight:
 * title -> summary -> stack -> highlights, so a 15-second scan stops after
 * tier two and still comes away with something.
 */
const ExperienceCard: React.FC<ExperienceCardProps> = ({ role }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? staticVariants : cardVariants}
      className="group relative"
    >
      {/* Timeline dot — decorative, desktop only (the rail is hidden on mobile) */}
      <div
        className="absolute left-8 z-10 mt-8 h-4 w-4 -translate-x-1/2 rounded-full bg-electric-blue transition-transform duration-300 group-hover:scale-150 md:hidden"
        aria-hidden="true"
      >
        {!reduceMotion && (
          <div className="absolute inset-0 animate-ping rounded-full bg-electric-blue opacity-75" />
        )}
      </div>

      <article className="relative ml-20 overflow-hidden rounded-lg border border-electric-blue/30 bg-deep-space/50 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-holographic-hover md:ml-0 md:p-5">
        {/* Hover overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <header className="mb-4 flex flex-wrap items-start justify-between gap-x-6 gap-y-3 md:flex-col">
            <div className="min-w-0">
              <h3 className="mb-2 font-orbitron text-2xl leading-tight text-electric-blue md:text-xl">
                {role.title}
              </h3>
              <CompanyLine company={role.company} />
            </div>

            <div className="shrink-0 space-y-1 text-right md:text-left">
              <p className="flex items-center gap-2 font-spaceGrotesk text-text-secondary md:justify-start">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-neon-purple"
                  aria-hidden="true"
                />
                <span>{role.location}</span>
              </p>
              <RolePeriod start={role.start} end={role.end} />
            </div>
          </header>

          {/* Tier 2 — the one line that does most of the work */}
          <p className="mb-5 max-w-3xl font-spaceGrotesk text-lg leading-relaxed text-text-primary md:text-base">
            {role.summary}
          </p>

          {/* Tier 3 — keyword-match surface */}
          <div className="mb-6">
            <StackChips stack={role.stack} companyName={role.company.name} />
          </div>

          {/* Tier 4 — impact detail, capped at four in the data layer */}
          <ul className="list-none space-y-3">
            {role.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-blue"
                  aria-hidden="true"
                />
                <p className="font-spaceGrotesk leading-relaxed text-text-secondary">
                  {highlight}
                </p>
              </li>
            ))}
          </ul>

          {role.relatedProjects && (
            <RelatedProjects
              titles={role.relatedProjects}
              companyName={role.company.name}
            />
          )}
        </div>

        {/* Decorative corner accents */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-br from-electric-blue/5 to-neon-purple/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 rounded-tr-full bg-gradient-to-tr from-neon-purple/5 to-electric-blue/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
      </article>
    </motion.div>
  );
};

export default ExperienceCard;
