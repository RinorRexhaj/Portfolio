import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedinIn,
  faGithub as faGithubBrand,
} from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
  const contactLinks = [
    {
      name: "Email",
      icon: faEnvelope,
      url: "mailto:rinorrexhaj10@gmail.com",
      color: "#EA4335",
      delay: 0,
    },
    {
      name: "LinkedIn",
      icon: faLinkedinIn,
      url: "https://www.linkedin.com/in/rinor-rexhaj-4484181a8/",
      color: "#0077B5",
      delay: 0.2,
    },
    {
      name: "GitHub",
      icon: faGithubBrand,
      url: "https://github.com/RinorRexhaj/",
      color: "#333",
      delay: 0.4,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-20 w-11/12 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-orbitron text-4xl mb-12 text-center"
      >
        Get in Touch
      </motion.h2>
      <motion.div
        className="max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-3 gap-8 md:gap-4 sm:grid-cols-2 flex-wrap">
          {contactLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                transition: { type: "spring", stiffness: 400 },
              }}
              className="group relative flex flex-col items-center justify-center p-6 bg-deep-space/50 backdrop-blur-sm border border-electric-blue/30 rounded-lg transition-all duration-300 hover:shadow-holographic-hover"
            >
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon container */}
              <div className="relative z-10">
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-full mb-4"
                  style={{ backgroundColor: `${link.color}20` }}
                >
                  <FontAwesomeIcon
                    icon={link.icon}
                    className="text-3xl"
                    style={{ color: link.color }}
                  />
                </div>
                <h3 className="font-orbitron text-xl text-electric-blue text-center">
                  {link.name}
                </h3>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-electric-blue/5 to-neon-purple/5 rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-electric-blue/5 to-neon-purple/5 rounded-tr-full" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
