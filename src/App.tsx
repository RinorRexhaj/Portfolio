import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Academic from "./components/Academic";
import LoadingAnimation from "./components/LoadingAnimation";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

/** Hard ceiling on the intro overlay. Content is never gated on it. */
const LOADER_MAX_MS = 900;

const App = () => {
  // The overlay starts hidden when the tab is already backgrounded: timers are
  // throttled there, so anything waiting on one would leave a blank page.
  const [isLoading, setIsLoading] = useState(
    () => typeof document === "undefined" || !document.hidden
  );

  useEffect(() => {
    if (!isLoading) return;

    let done = false;
    const dismiss = () => {
      if (done) return;
      done = true;
      setIsLoading(false);
    };

    // Whichever comes first: fonts settled, the cap, or the tab losing focus.
    const cap = window.setTimeout(dismiss, LOADER_MAX_MS);
    document.fonts?.ready.then(dismiss).catch(dismiss);
    document.addEventListener("visibilitychange", dismiss);

    return () => {
      window.clearTimeout(cap);
      document.removeEventListener("visibilitychange", dismiss);
    };
    // Runs once: isLoading only ever goes true -> false.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Custom cursor. Pointer-coarse devices have no cursor to decorate.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cursor = document.createElement("div");
    cursor.className =
      "fixed w-4 h-4 rounded-full border-2 border-electric-blue pointer-events-none z-50 transition-transform duration-100 ease-out";
    document.body.appendChild(cursor);

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 16}px, ${
        e.clientY - 16
      }px)`;
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cursor.remove();
    };
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isLoading ? "max-h-screen overflow-hidden" : ""
      } bg-deep-space text-text-primary relative overflow-hidden`}
    >
      <Analytics />

      {/* Intro overlay. Purely on top of the content, never in place of it. */}
      {isLoading && <LoadingAnimation />}

      <Navbar />

      {/* Content renders immediately. Each section owns its own entry
          animation, so there is no page-level reveal to get stuck. */}
      <div className="relative z-10">
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-20 md:space-y-10">
            <HeroSection />
            <Experience />
            <Academic />
            <Projects />
            <Skills />
            <Contact />
          </div>
        </main>
        <Footer />
      </div>

      {/* Background grid pattern */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-40"
        aria-hidden="true"
      ></div>

      {/* Scan line effect */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-electric-blue/0 via-electric-blue/5 to-electric-blue/0 animate-scan pointer-events-none motion-reduce:animate-none"
        aria-hidden="true"
      ></div>
    </div>
  );
};

export default App;
