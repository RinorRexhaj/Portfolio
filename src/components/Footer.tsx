import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";

const socials = [
  {
    name: "GitHub",
    icon: faGithub,
    url: "https://github.com/RinorRexhaj/",
    label: "GitHub",
  },
  {
    name: "LinkedIn",
    icon: faLinkedinIn,
    url: "https://www.linkedin.com/in/rinor-rexhaj-4484181a8/",
    label: "LinkedIn",
  },
  {
    name: "Email",
    icon: faEnvelope,
    url: "mailto:rinorrexhaj10@gmail.com",
    label: "Email",
  },
];

const Footer = () => (
  <footer className="relative z-10 border-t border-electric-blue/20 bg-deep-space/60 backdrop-blur-sm">
    <div className="mx-auto flex w-11/12 max-w-7xl flex-wrap items-center justify-between gap-4 py-8 md:justify-center md:text-center">
      <p className="font-spaceGrotesk text-sm text-text-secondary/70">
        © {new Date().getFullYear()} Rinor Rexhaj
      </p>

      {/* Labelled so a screen-reader user landing here knows this is the
          footer strip, not a repeat of the Contact section above it. */}
      <nav aria-label="Social links">
        <ul className="flex list-none items-center gap-5">
          {socials.map((social) => (
            <li key={social.name}>
              <a
                href={social.url}
                target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-electric-blue/30 text-electric-blue transition-colors hover:bg-electric-blue/20 hover:text-neon-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue"
              >
                <FontAwesomeIcon icon={social.icon} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
