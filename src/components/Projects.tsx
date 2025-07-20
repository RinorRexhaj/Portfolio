import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../utils/Projects";
import Display from "./Display";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const swipeConfidenceThreshold = 100;

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
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
      className="py-20 w-11/12 mx-auto max-w-7xl"
      aria-label="Featured Projects"
    >
      <h2 className="font-orbitron text-4xl mb-12 text-center">
        Featured Projects
      </h2>

      {/* Main Project Display */}
      <div className="relative mb-8">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentIndex}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(event, info) => {
              event;
              handleSwipe(info.offset.x);
            }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="group relative bg-deep-space/50 backdrop-blur-sm border border-electric-blue/30 rounded-lg p-8 transition-all duration-300 hover:shadow-holographic-hover"
            role="article"
            aria-label={`Project: ${projects[currentIndex].title}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-4">
                <h3 className="font-orbitron text-3xl md:text-2xl text-electric-blue">
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

              <Display currentIndex={currentIndex} />
            </div>
          </motion.div>
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
      <div
        className="flex justify-center gap-4"
        role="tablist"
        aria-label="Project navigation"
      >
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-electric-blue scale-125"
                : "bg-electric-blue/30 hover:bg-electric-blue/50"
            }`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
