import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

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
  `inline-block py-1 cursor-pointer rounded transition-colors ${
    isActive
      ? "text-electric-blue font-semibold"
      : "text-text-secondary/70 hover:text-electric-blue"
  }`;

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>("About");
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleScroll = (id: string) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMobileMenuOpen(false);
  };

  // Scroll spy. An observer replaces the old scroll listener, which read
  // offsetTop for every section on every scroll event (forcing a reflow each
  // time) and compared against an `activeLink` its empty dep array had frozen
  // at "".
  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.toLowerCase()))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];
        if (!visible) return;
        const id = visible.target.id;
        setActiveLink(id.charAt(0).toUpperCase() + id.slice(1));
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // E13: Escape closes the menu and returns focus to the control that opened it.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

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
          className="flex text-3xl md:text-2xl font-semibold text-text-primary overflow-hidden rounded"
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
          ref={menuButtonRef}
          className="hidden md:grid place-items-center w-11 h-11 shrink-0 -mr-2 text-text-primary rounded animate-fade [animation-fill-mode:backwards]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
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
        <ul id="mobile-menu" className="hidden md:flex mt-4 px-6 py-4 flex-col space-y-4 font-medium bg-white/5 backdrop-blur-sm border-t border-white/10 animate-fade [animation-fill-mode:backwards]">
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
