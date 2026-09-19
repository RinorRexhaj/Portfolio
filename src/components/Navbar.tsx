import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const links = [
  "About",
  "Experience",
  "Academic",
  "Projects",
  "Skills",
  "Contact",
];

const BRAND = "Rinor Rexhaj";

/** Active is bright and on-palette; inactive is muted. */
const linkClasses = (isActive: boolean) =>
  `cursor-pointer rounded transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-blue ${
    isActive
      ? "text-electric-blue font-semibold"
      : "text-text-secondary/70 hover:text-electric-blue"
  }`;

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id.toLowerCase());
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
        setIsMobileMenuOpen(false); // Close mobile menu on click
      }
    }, 100);
  };

  useEffect(() => {
    setActiveLink("About");
    const handleScrollEvent = () => {
      let current = "";
      for (const link of links) {
        const section = document.getElementById(link.toLowerCase());
        if (section) {
          const offset = section.offsetTop - 350;
          if (window.scrollY >= offset) {
            current = link;
          }
        }
      }
      if (current !== activeLink) {
        setActiveLink(current);
      }

      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScrollEvent);
    handleScrollEvent();
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return (
    <nav
      className={`w-full py-4 fixed top-0 left-0 z-50 font-orbitron transition-all duration-300 ${
        scrolled
          ? "bg-white/5 backdrop-blur-md shadow-md border-b border-white/10"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="w-11/12 max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand — a link back to the top, not a heading. The page has one <h1>. */}
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            handleScroll("About");
          }}
          className="flex text-3xl md:text-2xl font-semibold text-text-primary overflow-hidden rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-blue"
          aria-label={`${BRAND} — back to top`}
        >
          {BRAND.split("").map((char, index) => (
            <span
              className="animate-textReveal [animation-fill-mode:backwards]"
              style={{ animationDelay: `${index * 0.05}s` }}
              key={`${char}-${index}`}
              aria-hidden="true"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </a>

        {/* Desktop Links */}
        <ul className="md:hidden flex space-x-6 font-medium">
          {links.map((link, index) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(link);
                }}
                className={`${linkClasses(
                  activeLink === link
                )} text-lg animate-slideIn [animation-fill-mode:backwards]`}
                style={{ animationDelay: `${index * 0.3 + 0.5}s` }}
                aria-current={activeLink === link ? "page" : undefined}
                title={`Go to ${link} section`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="hidden md:block text-text-primary rounded animate-fade [animation-fill-mode:backwards] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-blue"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile navigation menu"
          aria-expanded={isMobileMenuOpen}
          title="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <FontAwesomeIcon className="w-7 h-7" icon={faXmark} />
          ) : (
            <FontAwesomeIcon className="w-7 h-7" icon={faBars} />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <ul className="hidden md:flex mt-4 px-6 py-4 flex-col space-y-4 font-medium bg-white/5 backdrop-blur-sm border-t border-white/10 animate-fade [animation-fill-mode:backwards]">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(link);
                }}
                className={`${linkClasses(activeLink === link)} text-lg`}
                aria-current={activeLink === link ? "page" : undefined}
                title={`Go to ${link} section`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
