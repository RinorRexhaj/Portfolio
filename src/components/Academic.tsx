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
        className="font-orbitron text-2xl sm:text-3xl md:text-4xl mb-8 sm:mb-12 text-center"
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
          className="relative group bg-deep-space/50 backdrop-blur-sm border border-electric-blue/30 rounded-lg p-4 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-holographic-hover"
        >
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
              <div className="flex-1 w-full">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-electric-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon
                      icon={faGraduationCap}
                      className="text-xl sm:text-2xl text-electric-blue"
                    />
                  </div>
                  <h3 className="font-orbitron text-base sm:text-xl md:text-2xl text-electric-blue leading-tight">
                    {academicData.degree}
                  </h3>
                </div>

                <div className="flex items-center space-x-2 text-text-secondary font-spaceGrotesk mb-2">
                  <FontAwesomeIcon
                    icon={faBook}
                    className="text-electric-blue text-sm sm:text-base"
                  />
                  <span className="text-sm sm:text-base md:text-lg">
                    {academicData.institution}
                  </span>
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
                    className="text-neon-purple text-sm sm:text-base"
                  />
                  <span className="text-sm sm:text-base">
                    {academicData.location}
                  </span>
                </div>
              </div>

              {/* Achievement Badge */}
              <div className="w-full sm:w-auto">
                <div className="bg-gradient-to-br from-electric-blue/20 to-neon-purple/20 border-2 border-electric-blue/50 rounded-lg px-4 py-3 sm:px-6 sm:py-4">
                  <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-electric-blue text-base sm:text-lg"
                    />
                    <span className="font-orbitron text-lg sm:text-xl text-electric-blue">
                      {academicData.grade}
                    </span>
                  </div>
                  <p className="font-spaceGrotesk text-xs sm:text-sm text-text-secondary text-center sm:text-left">
                    {academicData.rank}
                  </p>
                </div>
              </div>
            </div>

            {/* Thesis Section */}
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-electric-blue/5 border border-electric-blue/20 rounded-lg">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <FontAwesomeIcon
                  icon={faTrophy}
                  className="text-electric-blue text-lg sm:text-xl mt-1 flex-shrink-0"
                />
                <div>
                  <h4 className="font-orbitron text-base sm:text-lg text-electric-blue mb-2">
                    Thesis Project
                  </h4>
                  <p className="font-spaceGrotesk text-sm sm:text-base text-text-secondary">
                    {academicData.thesis}
                  </p>
                </div>
              </div>
            </div>

            {/* Coursework Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {academicData.categories.map((category, idx) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ delay: idx * 0.15 + 0.3, duration: 0.5 }}
                  className="bg-deep-space/30 border border-electric-blue/20 rounded-lg p-4 sm:p-5"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <FontAwesomeIcon
                        icon={category.icon}
                        className="text-base sm:text-lg"
                        style={{ color: category.color }}
                      />
                    </div>
                    <h4 className="font-orbitron text-sm sm:text-base text-electric-blue">
                      {category.title}
                    </h4>
                  </div>

                  <ul className="space-y-1.5 sm:space-y-2">
                    {category.courses.map((course, courseIdx) => (
                      <li
                        key={courseIdx}
                        className="flex items-start space-x-2"
                      >
                        <div
                          className="mt-1.5 sm:mt-2 w-1 h-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-spaceGrotesk text-xs sm:text-sm text-text-secondary">
                          {course}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Awards Section */}
            <div className="border-t border-electric-blue/20 pt-4 sm:pt-6">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <FontAwesomeIcon
                  icon={faAward}
                  className="text-electric-blue text-lg sm:text-xl"
                />
                <h4 className="font-orbitron text-base sm:text-lg text-electric-blue">
                  Scholarships & Awards
                </h4>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3">
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
                    className="bg-gradient-to-r from-electric-blue/20 to-neon-purple/20 border border-electric-blue/30 rounded-full px-3 py-1.5 sm:px-5 sm:py-2 flex items-center space-x-1.5 sm:space-x-2"
                  >
                    <FontAwesomeIcon
                      icon={faTrophy}
                      className="text-electric-blue text-xs sm:text-sm flex-shrink-0"
                    />
                    <span className="font-spaceGrotesk text-xs sm:text-sm text-text-primary">
                      {award}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative corner accents */}
          <div
            className="hidden sm:block absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-electric-blue/5 to-neon-purple/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />
          <div
            className="hidden sm:block absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-neon-purple/5 to-electric-blue/5 rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />
        </motion.article>
      </motion.div>
    </section>
  );
};

export default Academic;
