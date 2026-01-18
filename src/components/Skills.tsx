import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faAngular,
  faVuejs,
  faNodeJs,
  faMicrosoft,
  faPython,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBrain,
  faChartLine,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";

const skillsData = {
  "Front-End": [
    {
      name: "React, Next.js",
      icon: faReact,
      description: "Modern UI Development",
      color: "#61DAFB",
    },
    {
      name: "Angular",
      icon: faAngular,
      description: "Enterprise Applications",
      color: "#DD0031",
    },
    {
      name: "Vue.js",
      icon: faVuejs,
      description: "Progressive Frameworks",
      color: "#06B6D4",
    },
  ],
  "Back-End": [
    {
      name: "Python (FastAPI, Flask)",
      icon: faPython,
      description: "Enterprise & AI Solutions",
      color: "#06B6D4",
    },
    {
      name: "Node.js",
      icon: faNodeJs,
      description: "Server-Side JavaScript",
      color: "#339933",
    },
    {
      name: ".NET",
      icon: faMicrosoft,
      description: "Enterprise Solutions",
      color: "#512BD4",
    },
  ],
  "AI and Data Science": [
    {
      name: "Machine Learning",
      icon: faBrain,
      description: "Predictive Models",
      color: "#FF6B6B",
    },
    {
      name: "Data Analysis",
      icon: faChartLine,
      description: "Data Insights",
      color: "#4ECDC4",
    },
    {
      name: "Deep Learning",
      icon: faRobot,
      description: "Neural Networks",
      color: "#45B7D1",
    },
  ],
};

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 mx-auto w-11/12 max-w-7xl"
      aria-labelledby="skills-heading"
    >
      <motion.h2
        id="skills-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="font-orbitron text-4xl mb-12 text-center"
      >
        Skills Overview
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        role="list"
        aria-label="Technical Skills Categories"
      >
        {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
          <motion.div
            key={category}
            variants={categoryVariants}
            className="mb-16"
            role="group"
            aria-labelledby={`category-${categoryIndex}`}
          >
            <motion.h3
              id={`category-${categoryIndex}`}
              className="font-orbitron text-2xl mb-8 text-electric-blue"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
            >
              {category}
            </motion.h3>

            <div className="grid grid-cols-3 gap-6 tb:grid-cols-2 md:grid-cols-1">
              {skills.map((skill, index) => (
                <motion.article
                  key={skill.name}
                  variants={cardVariants}
                  className="group relative bg-deep-space/50 backdrop-blur-sm border border-electric-blue/30 rounded-lg p-6 transition-all duration-300 hover:shadow-holographic-hover hover:-translate-y-1"
                  role="listitem"
                  aria-label={`${skill.name} skill card`}
                  title={`${skill.name} – ${skill.description}`}
                >
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Card content */}
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-4">
                      <div
                        className="w-12 h-12 flex items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${skill.color}20` }}
                        aria-hidden="true"
                      >
                        <FontAwesomeIcon
                          icon={skill.icon}
                          className="text-2xl"
                          style={{ color: skill.color }}
                        />
                      </div>
                      <h4 className="font-orbitron text-xl text-electric-blue">
                        {skill.name}
                      </h4>
                    </div>

                    <p className="font-spaceGrotesk text-text-secondary mb-6">
                      {skill.description}
                    </p>

                    {/* Animated progress bar */}
                    <div
                      className="h-1 bg-deep-space/50 rounded-full overflow-hidden"
                      aria-hidden="true"
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "100%" } : { width: 0 }}
                        transition={{
                          delay: categoryIndex * 0.2 + index * 0.1 + 0.3,
                          duration: 0.5,
                        }}
                        className="h-full"
                        style={{
                          background: `linear-gradient(to right, ${skill.color}, ${skill.color}80)`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Decorative accents */}
                  <div
                    className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-electric-blue/5 to-neon-purple/5 rounded-bl-full"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-electric-blue/5 to-neon-purple/5 rounded-tr-full"
                    aria-hidden="true"
                  />
                </motion.article>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
