import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCheck,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedinIn,
  faGithub as faGithubBrand,
} from "@fortawesome/free-brands-svg-icons";

const EMAIL = "rinorrexhaj10@gmail.com";

/*
 * TODO(rinor): drop your CV at public/assets/cv/<name>.pdf and set this to
 * "/assets/cv/<name>.pdf". Left null on purpose — the button only renders once
 * a file exists, so a broken download link cannot ship.
 */
const CV_URL: string | null = null;

/*
 * TODO(rinor): the first line a recruiter reads. Replace the bracketed text
 * with the truth, or set this to null to hide the line entirely.
 *
 * This is public, and you are currently employed. Saying you are open to work
 * is a deliberate choice, not a default — decide it rather than inherit it.
 */
const AVAILABILITY: string | null =
  "[Open to backend and ML engineering roles — Copenhagen or remote]";

const profiles = [
  {
    name: "LinkedIn",
    icon: faLinkedinIn,
    url: "https://www.linkedin.com/in/rinor-rexhaj-4484181a8/",
    color: "#0077B5",
    blurb: "Career history and recommendations",
  },
  {
    name: "GitHub",
    icon: faGithubBrand,
    url: "https://github.com/RinorRexhaj/",
    color: "#8B949E",
    blurb: "Source for the projects above",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const Contact = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      // Clipboard is blocked (insecure origin, permissions). The address is
      // selectable text right next to the button, so there is a manual path.
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 w-11/12 max-w-7xl mx-auto"
    >
      <motion.h2
        id="contact-heading"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-orbitron text-4xl mb-4 text-center"
      >
        Get in Touch
      </motion.h2>

      {AVAILABILITY && (
        <p className="font-spaceGrotesk text-text-secondary text-lg md:text-base text-center mb-10 max-w-2xl mx-auto">
          {AVAILABILITY}
        </p>
      )}

      <motion.div
        className="max-w-2xl mx-auto space-y-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* The ask. Email as selectable text, because recruiters copy it into
            an ATS rather than clicking a mailto. */}
        <motion.div
          variants={itemVariants}
          className="rounded-lg border border-electric-blue/30 bg-deep-space/50 p-6 backdrop-blur-sm"
        >
          <h3 className="font-orbitron text-sm uppercase tracking-widest text-text-secondary/70 mb-3">
            Email
          </h3>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="font-spaceGrotesk text-xl md:text-lg text-electric-blue underline underline-offset-4 decoration-electric-blue/40 transition-colors hover:text-neon-purple break-all"
            >
              {EMAIL}
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-electric-blue/40 px-4 py-2 font-spaceGrotesk text-sm text-electric-blue transition-colors hover:bg-electric-blue/15"
            >
              <FontAwesomeIcon
                icon={copied ? faCheck : faCopy}
                aria-hidden="true"
              />
              {copied ? "Copied" : "Copy"}
            </button>

            <span role="status" aria-live="polite" className="sr-only">
              {copied ? `${EMAIL} copied to clipboard` : ""}
            </span>
          </div>
        </motion.div>

        {/* Primary action. No "email me" button here: the address above is
            already a mailto link, and a second one only pads the tab order. */}
        {CV_URL && (
          <motion.div variants={itemVariants}>
            <a
              href={CV_URL}
              download
              className="inline-flex items-center gap-3 rounded-lg border border-electric-blue bg-electric-blue/15 px-6 py-3 font-orbitron text-electric-blue transition-all duration-300 hover:bg-electric-blue/25 hover:shadow-holographic-hover"
            >
              <FontAwesomeIcon icon={faFileArrowDown} aria-hidden="true" />
              Download CV
            </a>
          </motion.div>
        )}

        {/* Profiles. Not a repeat of the footer's icon strip — these say what
            is on the other end. */}
        <motion.ul
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-1 gap-4 list-none"
          aria-label="Profiles"
        >
          {profiles.map((profile) => (
            <li key={profile.name}>
              <a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full items-center gap-4 rounded-lg border border-electric-blue/30 bg-deep-space/50 p-5 backdrop-blur-sm transition-all duration-300 hover:shadow-holographic-hover"
              >
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full"
                  style={{ backgroundColor: `${profile.color}20` }}
                >
                  <FontAwesomeIcon
                    icon={profile.icon}
                    className="text-2xl"
                    style={{ color: profile.color }}
                    aria-hidden="true"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block font-orbitron text-lg text-electric-blue">
                    {profile.name}
                  </span>
                  <span className="block font-spaceGrotesk text-sm text-text-secondary/80">
                    {profile.blurb}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
};

export default Contact;
