import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const links = ["About", "Projects", "Skills", "Contact"];

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
      className={`w-screen py-4 fixed top-0 left-0 z-50 font-orbitron transition-all duration-300 ${
        scrolled
          ? "bg-white/5 backdrop-blur-md shadow-md border-b border-white/10"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="w-11/12 max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <h1
          className="flex text-3xl md:text-2xl font-semibold text-gray-800 overflow-hidden"
          aria-label="Rinor Rexhaj logo"
        >
          {"Rinor Rexhaj".split("").map((char, index) => (
            <p
              className="animate-textReveal [animation-fill-mode:backwards]"
              style={{ animationDelay: `${index * 0.05}s` }}
              key={`${char}-${index}`}
            >
              {char === " " ? "\u00A0" : char}
            </p>
          ))}
        </h1>

        {/* Desktop Links */}
        <ul className="md:hidden flex space-x-6 text-gray-700 font-medium">
          {links.map((link, index) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(link);
                }}
                className={`cursor-pointer transition text-lg animate-slideIn [animation-fill-mode:backwards] ${
                  activeLink === link
                    ? "text-meta-5 font-semibold"
                    : "hover:text-meta-5"
                }`}
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
          className="hidden md:block text-gray-700 animate-fade [animation-fill-mode:backwards]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile navigation menu"
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
        <ul className="hidden md:flex mt-4 px-6 py-4 flex-col space-y-4 text-gray-700 font-medium bg-white/5 backdrop-blur-sm border-t border-white/10 animate-fade [animation-fill-mode:backwards]">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(link);
                }}
                className={`cursor-pointer text-lg ${
                  activeLink === link
                    ? "text-meta-5 font-semibold"
                    : "hover:text-meta-5"
                }`}
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
