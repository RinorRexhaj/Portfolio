import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { experienceByRecency } from "../data/experience";
import ExperienceCard from "./experience/ExperienceCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const Experience = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();
  const animate = reduceMotion || isInView ? "visible" : "hidden";

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="mx-auto w-11/12 max-w-7xl scroll-mt-24 py-20 md:w-full md:py-12"
      aria-labelledby="experience-heading"
    >
      <motion.h2
        id="experience-heading"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={
          isInView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
        }
        transition={{ duration: 0.5 }}
        className="mb-12 text-center font-orbitron text-4xl md:mb-8 md:text-3xl"
      >
        Professional Experience
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={animate}
        className="relative"
      >
        {/* Timeline rail — decorative, desktop only */}
        <div
          className="absolute bottom-0 left-8 top-0 w-0.5 bg-gradient-to-b from-electric-blue via-neon-purple to-electric-blue opacity-30 md:hidden"
          aria-hidden="true"
        />

        <ol className="list-none space-y-12 md:space-y-8">
          {experienceByRecency.map((role) => (
            <li key={role.id}>
              <ExperienceCard role={role} />
            </li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
};

export default Experience;
