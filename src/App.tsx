import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import LoadingAnimation from "./components/LoadingAnimation";
import Contact from "./components/Contact";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Add custom cursor effect
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

    // Handle loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Add a small delay before showing content
      setTimeout(() => {
        setShowContent(true);
      }, 500);
    }, 2000);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cursor.remove();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isLoading && "max-h-screen overflow-hidden"
      } bg-deep-space text-text-primary relative overflow-hidden`}
    >
      {/* Loading Animation */}
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          {/* Main content */}
          <Navbar />
          <div
            className="relative z-10 transition-all duration-1000"
            style={{
              opacity: showContent ? 1 : 0,
              transform: showContent ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <main className="container mx-auto px-4 py-8">
              <div className="space-y-20 md:space-y-10">
                <div
                  style={{
                    opacity: showContent ? 1 : 0,
                    transition: "all 0.8s ease-out 0.2s",
                  }}
                  id="about"
                >
                  <HeroSection />
                </div>

                <div
                  style={{
                    opacity: showContent ? 1 : 0,
                    transition: "all 0.8s ease-out 0.4s",
                  }}
                  id="projects"
                >
                  <Projects />
                </div>

                <div
                  style={{
                    opacity: showContent ? 1 : 0,
                    transition: "all 0.8s ease-out 0.6s",
                  }}
                  id="skills"
                >
                  <Skills />
                </div>

                {/* Contact Section */}
                <div
                  style={{
                    opacity: showContent ? 1 : 0,
                    transition: "all 0.8s ease-out 0.6s",
                  }}
                  id="contact"
                >
                  <Contact />
                </div>
              </div>
            </main>
          </div>
        </>
      )}

      {/* Background grid pattern */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 transition-opacity duration-1000"
        style={{ opacity: showContent ? 0.2 : 0 }}
      ></div>

      {/* Scan line effect */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-electric-blue/0 via-electric-blue/5 to-electric-blue/0 animate-scan pointer-events-none transition-opacity duration-1000"
        style={{ opacity: showContent ? 1 : 0 }}
      ></div>
    </div>
  );
};

export default App;
