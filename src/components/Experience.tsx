import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faMapMarkerAlt,
  faCalendarAlt,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

const experienceData = [
  {
    title: "Full-Stack Developer & AI/ML Engineer",
    company: "Seculyze",
    location: "Copenhagen, Denmark",
    period: "Recent",
    website: "https://seculyze.com",
    sector: "Information Technology / Software Development / Cyber Security",
    responsibilities: [
      "Built and maintained front-end, back-end and cyber security features for the Seculyze SaaS platform",
      "Delivered customer service contracts, ensuring performance monitoring, client support, and compliance documentation",
      "Implemented and supported AI/ML initiatives and workflows with data preparation and validation, model testing, and integration with MLFlow and Azure Databricks",
      "Collaborated with cross-functional teams to deliver secure, user-friendly solutions",
      "Conducted code reviews, debugging, and issue resolution across environments",
      "Integrated third-party APIs and assisted with deployment, monitoring, and optimization",
      "Documented technical specs and processes, contributing to workflow improvements",
    ],
  },
  {
    title: "Full-Stack Developer",
    company: "Elba Technologies",
    location: "Pristina, Kosovo / Stuttgart, Germany",
    period: "Previous",
    website: "https://elba-tech.com",
    sector: "Information Technology / Software Development",
    responsibilities: [
      "Implemented many new features in the Front-End and Back-End of different projects that led to increase in productivity for the users",
      "Led the front-end development of a cross-functional team building an AI-powered web application, ensuring seamless integration with machine learning features",
      "Architected scalable UI components to support dynamic AI-driven functionalities like recommendations, predictions, or natural language interactions",
      "Collaborated closely with AI/ML engineers to design intuitive interfaces that visualize real-time model outputs and improve user experience",
      "Delivered on-time releases through agile sprints, overseeing task prioritization, team mentoring, and stakeholder communication",
      "Fixed bugs and improved parts of the platform that resulted in an increase in product quality",
    ],
  },
];

const Experience = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 mx-auto w-11/12 max-w-7xl"
      aria-labelledby="experience-heading"
    >
      <motion.h2
        id="experience-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="font-orbitron text-4xl mb-12 text-center"
      >
        Professional Experience
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative"
      >
        {/* Timeline line */}
        <div
          className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric-blue via-neon-purple to-electric-blue opacity-30 md:hidden"
          aria-hidden="true"
        />

        <div className="space-y-12">
          {experienceData.map((experience, index) => (
            <motion.article
              key={`${experience.company}-${index}`}
              variants={cardVariants}
              className="relative group"
              role="listitem"
              aria-label={`${experience.title} at ${experience.company}`}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-8 w-4 h-4 bg-electric-blue rounded-full transform -translate-x-1/2 mt-8 z-10 md:hidden group-hover:scale-150 transition-transform duration-300"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-electric-blue rounded-full animate-ping opacity-75" />
              </div>

              {/* Card */}
              <div className="ml-20 md:ml-0 bg-deep-space/50 backdrop-blur-sm border border-electric-blue/30 rounded-lg p-8 transition-all duration-300 hover:shadow-holographic-hover hover:-translate-y-1">
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Card content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                    <div>
                      <h3 className="font-orbitron text-2xl text-electric-blue mb-2">
                        {experience.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-text-secondary font-spaceGrotesk">
                        <FontAwesomeIcon
                          icon={faBriefcase}
                          className="text-electric-blue"
                        />
                        <span className="text-lg">{experience.company}</span>
                        {experience.website && (
                          <a
                            href={experience.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-electric-blue hover:text-neon-purple transition-colors"
                            aria-label={`Visit ${experience.company} website`}
                          >
                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="text-right md:text-left">
                      <div className="flex items-center space-x-2 text-text-secondary font-spaceGrotesk mb-1">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="text-neon-purple"
                        />
                        <span>{experience.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-text-secondary font-spaceGrotesk">
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className="text-neon-purple"
                        />
                        <span>{experience.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sector badge */}
                  <div className="inline-block bg-electric-blue/20 border border-electric-blue/50 rounded-full px-4 py-1 mb-6">
                    <span className="font-spaceGrotesk text-sm text-electric-blue">
                      {experience.sector}
                    </span>
                  </div>

                  {/* Responsibilities */}
                  <div className="space-y-3">
                    {experience.responsibilities.map((responsibility, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={
                          isInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -20 }
                        }
                        transition={{
                          delay: index * 0.2 + idx * 0.05 + 0.2,
                          duration: 0.4,
                        }}
                        className="flex items-start space-x-3"
                      >
                        <div
                          className="mt-2 w-1.5 h-1.5 rounded-full bg-electric-blue flex-shrink-0"
                          aria-hidden="true"
                        />
                        <p className="font-spaceGrotesk text-text-secondary leading-relaxed">
                          {responsibility}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Decorative corner accents */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-electric-blue/5 to-neon-purple/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-neon-purple/5 to-electric-blue/5 rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
