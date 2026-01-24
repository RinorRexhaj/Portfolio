import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faMapMarkerAlt,
  faTrophy,
  faExternalLinkAlt,
  faStar,
  faAward,
  faBook,
  faChartLine,
  faBrain,
  faLaptopCode,
} from "@fortawesome/free-solid-svg-icons";

const academicData = {
  degree: "Bachelor's Degree (Computer Science and Engineering)",
  institution: "UBT – University of Business and Technology",
  location: "Pristina, Kosovo",
  website: "https://www.ubt-uni.net",
  grade: "10/10",
  rank: "Ranked 1st in my generation",
  categories: [
    {
      title: "Computer Science & Programming",
      icon: faLaptopCode,
      color: "#61DAFB",
      courses: [
        "Introduction to programming",
        "Data structures and algorithms",
        "Software engineering",
        "Computer architecture",
        "Operating systems",
        "Human-computer interaction",
        "Web design and development",
        "Game programming",
        "Cloud computing",
      ],
    },
    {
      title: "Mathematics & Foundations",
      icon: faChartLine,
      color: "#FF6B6B",
      courses: [
        "Discrete structures",
        "Probability and modeling",
        "Linear algebra",
        "Calculus",
        "Systems and signals",
        "Digital circuits and signals",
      ],
    },
    {
      title: "Data & AI",
      icon: faBrain,
      color: "#45B7D1",
      courses: [
        "Database systems",
        "Data models",
        "Big data technologies",
        "Data processing system design",
        "Data science and visualization with Python",
        "Machine learning models",
        "Fundamentals of artificial intelligence",
      ],
    },
  ],
  thesis:
    "Building a Document Forgery Detection System with CNN and Computer Vision",
  awards: [
    "Best Student of the Year",
    "Certificate of Scholarship",
    "Lecture Requirements Award",
  ],
};

const Academic = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
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
      id="academic"
      ref={sectionRef}
      className="py-20 mx-auto w-11/12 max-w-7xl"
      aria-labelledby="academic-heading"
    >
      <motion.h2
        id="academic-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="font-orbitron text-4xl mb-12 text-center"
      >
        Academic Background
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="space-y-8"
      >
        {/* Main Education Card */}
        <motion.article
          variants={cardVariants}
          className="relative group bg-deep-space/50 backdrop-blur-sm border border-electric-blue/30 rounded-lg p-8 transition-all duration-300 hover:shadow-holographic-hover"
        >
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-electric-blue/20 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faGraduationCap}
                      className="text-2xl text-electric-blue"
                    />
                  </div>
                  <h3 className="font-orbitron text-2xl text-electric-blue">
                    {academicData.degree}
                  </h3>
                </div>

                <div className="flex items-center space-x-2 text-text-secondary font-spaceGrotesk mb-2">
                  <FontAwesomeIcon
                    icon={faBook}
                    className="text-electric-blue"
                  />
                  <span className="text-lg">{academicData.institution}</span>
                  {academicData.website && (
                    <a
                      href={academicData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-electric-blue hover:text-neon-purple transition-colors"
                      aria-label={`Visit ${academicData.institution} website`}
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </a>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-text-secondary font-spaceGrotesk">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-neon-purple"
                  />
                  <span>{academicData.location}</span>
                </div>
              </div>

              {/* Achievement Badge */}
              <div className="text-right md:text-left">
                <div className="bg-gradient-to-br from-electric-blue/20 to-neon-purple/20 border-2 border-electric-blue/50 rounded-lg px-6 py-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-electric-blue"
                    />
                    <span className="font-orbitron text-xl text-electric-blue">
                      {academicData.grade}
                    </span>
                  </div>
                  <p className="font-spaceGrotesk text-sm text-text-secondary">
                    {academicData.rank}
                  </p>
                </div>
              </div>
            </div>

            {/* Thesis Section */}
            <div className="mb-8 p-6 bg-electric-blue/5 border border-electric-blue/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <FontAwesomeIcon
                  icon={faTrophy}
                  className="text-electric-blue text-xl mt-1"
                />
                <div>
                  <h4 className="font-orbitron text-lg text-electric-blue mb-2">
                    Thesis Project
                  </h4>
                  <p className="font-spaceGrotesk text-text-secondary">
                    {academicData.thesis}
                  </p>
                </div>
              </div>
            </div>

            {/* Coursework Categories */}
            <div className="flex flex-row tb:flex-col gap-6 mb-8">
              {academicData.categories.map((category, idx) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ delay: idx * 0.15 + 0.3, duration: 0.5 }}
                  className="bg-deep-space/30 border border-electric-blue/20 rounded-lg p-5"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <FontAwesomeIcon
                        icon={category.icon}
                        className="text-lg"
                        style={{ color: category.color }}
                      />
                    </div>
                    <h4 className="font-orbitron text-base text-electric-blue">
                      {category.title}
                    </h4>
                  </div>

                  <ul className="space-y-2">
                    {category.courses.map((course, courseIdx) => (
                      <li
                        key={courseIdx}
                        className="flex items-start space-x-2"
                      >
                        <div
                          className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-spaceGrotesk text-sm text-text-secondary">
                          {course}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Awards Section */}
            <div className="border-t border-electric-blue/20 pt-6">
              <div className="flex items-center space-x-3 mb-4">
                <FontAwesomeIcon
                  icon={faAward}
                  className="text-electric-blue text-xl"
                />
                <h4 className="font-orbitron text-lg text-electric-blue">
                  Scholarships & Awards
                </h4>
              </div>

              <div className="flex flex-wrap gap-3">
                {academicData.awards.map((award, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.9 }
                    }
                    transition={{ delay: idx * 0.1 + 0.5, duration: 0.3 }}
                    className="bg-gradient-to-r from-electric-blue/20 to-neon-purple/20 border border-electric-blue/30 rounded-full px-5 py-2 flex items-center space-x-2"
                  >
                    <FontAwesomeIcon
                      icon={faTrophy}
                      className="text-electric-blue text-sm"
                    />
                    <span className="font-spaceGrotesk text-sm text-text-primary">
                      {award}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative corner accents */}
          <div
            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-electric-blue/5 to-neon-purple/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-neon-purple/5 to-electric-blue/5 rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />
        </motion.article>
      </motion.div>
    </section>
  );
};

export default Academic;
