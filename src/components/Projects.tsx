import { motion, AnimatePresence, useInView } from "framer-motion";
import { lazy, Suspense, useRef } from "react";
import { projects } from "../utils/Projects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import {
  selectProjectIndex,
  useSelectedProjectIndex,
} from "../hooks/useProjectSelection";

// Split out of the main bundle and only mounted once the carousel is close to
// the viewport, so its screenshots cost nothing on first paint.
const Display = lazy(() => import("./Display"));

const swipeConfidenceThreshold = 100;

/** Matches Display's main-stage height so mounting causes no layout shift. */
const DisplaySkeleton = () => (
  <div className="w-full flex md:flex-col gap-4 items-start" aria-hidden="true">
    <div className="flex-1 h-96 md:h-56 w-9/12 md:w-full rounded-lg bg-deep-space/30" />
    <div className="w-4/12 md:w-full h-9" />
  </div>
);

const Projects = () => {
  // Shared with the Experience section, which links straight to a slide.
  const currentIndex = useSelectedProjectIndex();
  const sectionRef = useRef(null);
  const isNearViewport = useInView(sectionRef, {
    once: true,
    margin: "300px",
  });

  const nextProject = () => {
    selectProjectIndex((currentIndex + 1) % projects.length);
  };

  const prevProject = () => {
    selectProjectIndex((currentIndex - 1 + projects.length) % projects.length);
  };

  const handleSwipe = (offsetX: number) => {
    if (offsetX > swipeConfidenceThreshold) {
      prevProject();
    } else if (offsetX < -swipeConfidenceThreshold) {
      nextProject();
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 w-11/12 mx-auto max-w-7xl scroll-mt-24"
      aria-labelledby="projects-heading"
    >
      <h2
        id="projects-heading"
        className="font-orbitron text-4xl mb-12 text-center"
      >
        Featured Projects
      </h2>

      {/* Main Project Display */}
      <div className="relative mb-8" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.article
            key={currentIndex}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => handleSwipe(info.offset.x)}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="group relative bg-deep-space/50 backdrop-blur-sm border border-electric-blue/30 rounded-lg p-8 transition-all duration-300 hover:shadow-holographic-hover"
            aria-labelledby="current-project-title"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-4">
                <h3
                  id="current-project-title"
                  className="font-orbitron text-3xl md:text-2xl text-electric-blue"
                >
                  {projects[currentIndex].title}
                </h3>
                {projects[currentIndex].url && (
                  <a
                    href={projects[currentIndex].url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className="text-xl md:text-lg"
                    />
                  </a>
                )}
              </div>
              <p className="font-spaceGrotesk text-text-secondary text-lg md:text-base mb-8">
                {projects[currentIndex].description}
              </p>

              {isNearViewport ? (
                <Suspense fallback={<DisplaySkeleton />}>
                  <Display currentIndex={currentIndex} />
                </Suspense>
              ) : (
                <DisplaySkeleton />
              )}
            </div>
          </motion.article>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevProject}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-deep-space/80 backdrop-blur-sm border border-electric-blue/30 rounded-full p-3 text-electric-blue hover:bg-electric-blue/20 transition-colors duration-300"
          aria-label="Previous project"
        >
          ←
        </button>
        <button
          onClick={nextProject}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-deep-space/80 backdrop-blur-sm border border-electric-blue/30 rounded-full p-3 text-electric-blue hover:bg-electric-blue/20 transition-colors duration-300"
          aria-label="Next project"
        >
          →
        </button>
      </div>

      {/* Project Navigation */}
      <ul
        className="flex justify-center gap-4 list-none"
        aria-label="Choose a project"
      >
        {projects.map((project, index) => (
          <li key={project.title}>
            <button
              type="button"
              onClick={() => selectProjectIndex(index)}
              className="group grid place-items-center w-6 h-6 rounded-full"
              aria-current={index === currentIndex}
              aria-label={`Show project ${index + 1}: ${project.title}`}
            >
              <span
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-electric-blue scale-125"
                    : "bg-electric-blue/30 group-hover:bg-electric-blue/50"
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
