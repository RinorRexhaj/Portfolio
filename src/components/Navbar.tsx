import React, { useEffect, useState } from "react";

const links = ["About", "Projects", "Skills", "Contact"];

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>("About");
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
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
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, [activeLink]);

  return (
    <nav
      className={`w-screen py-4 fixed top-0 left-0 z-50 font-orbitron transition-all duration-300 ${
        scrolled
          ? "bg-white/5 backdrop-blur-md shadow-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="w-11/12 max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="flex text-3xl font-semibold text-gray-800 overflow-hidden">
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
        <ul className="flex space-x-6 text-gray-700 font-medium">
          {links.map((link: string, index: number) => (
            <li
              key={link}
              onClick={() => handleScroll(link)}
              className={`cursor-pointer transition text-lg animate-slideIn [animation-fill-mode:backwards] ${
                activeLink === link
                  ? "text-meta-5 font-semibold"
                  : "hover:text-meta-5"
              }`}
              style={{ animationDelay: `${index * 0.3 + 0.5}s` }}
            >
              {link}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
