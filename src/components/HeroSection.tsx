import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const fullText = "Welcome to My Portfolio";
  const [textDone, setTextDone] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const [layers, setLayers] = useState<boolean[]>(Array(10).fill(false));
  const [light, setLight] = useState(false);
  const [light1, setLight1] = useState(false);
  const [hologram, setHologram] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTimeout(() => {
        if (index < fullText.length && textRef.current) {
          textRef.current.innerHTML += fullText[index];
          index++;
        } else {
          setTextDone(true);
          clearInterval(interval);
        }
      }, 700);
    }, 50);

    // Sequentially reveal each layer
    [...Array(10)].forEach((_, i) => {
      const wait = i === 0 ? 1000 : 0;
      setTimeout(() => {
        setLayers((prev) => {
          const updated = [...prev];
          updated[i] = true;
          return updated;
        });
      }, i * 100 + 150 + wait);
    });

    // Sequential light/hologram
    const light1Timeout = setTimeout(() => setLight1(true), 1000);
    const lightTimeout = setTimeout(() => setLight(true), 1300);
    const hologramTimeout = setTimeout(() => setHologram(true), 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(light1Timeout);
      clearTimeout(lightTimeout);
      clearTimeout(hologramTimeout);
    };
  }, []);

  return (
    <section
      className="min-h-[80vh] mt-5 w-11/12 mx-auto max-w-7xl flex md:flex-col items-center justify-center"
      aria-label="Hero Section"
    >
      <div
        className="relative top-35 md:top-60 w-1/2 flex justify-center md:w-full"
        role="presentation"
        aria-hidden="true"
      >
        {/* Lights and hologram */}
        <img
          src="/assets/img/hologram/light.png"
          alt="Decorative light effect"
          className={`absolute -bottom-20 max-w-96 ${
            light ? "opacity-100" : "opacity-0"
          } transition-opacity duration-200`}
          loading="lazy"
        />
        <img
          src="/assets/img/hologram/light2.png"
          alt="Secondary light effect"
          className={`absolute -bottom-20 ${
            light1 ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
          loading="lazy"
        />
        <img
          src="/assets/img/hologram/hologram.png"
          alt="Holographic effect"
          className={`absolute -bottom-10 max-w-96 ${
            hologram ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
          loading="lazy"
        />

        {/* Layers */}
        <div
          className="absolute -bottom-32"
          role="presentation"
          aria-hidden="true"
        >
          {[...Array(10)].map((_, i) => {
            let scale = 1 - (i + 1) * 0.1 + 0.5;
            let bottomOffset = (i + 1) * 3.85;
            if (i === 0) {
              scale = 1.8;
              bottomOffset = 12;
            }

            return (
              <img
                key={i}
                src={`/assets/img/hologram/layer${i + 1}.png`}
                alt={`Decorative layer ${i + 1}`}
                className={`absolute h-13 md:h-10 max-w-96 transition-opacity duration-300 ${
                  layers[i] ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  bottom: `${bottomOffset}px`,
                  left: "50%",
                  transform: `translateX(-50%) scale(${scale})`,
                  zIndex: i,
                }}
                loading="lazy"
              />
            );
          })}
        </div>
      </div>

      <div
        className="relative text-center w-1/2 md:w-10/12 space-y-6 z-50 md:bg-black/60 p-4 rounded-2xl md:backdrop-blur-sm"
        role="banner"
      >
        <h1
          className="relative font-orbitron text-7xl md:text-5xl font-bold tracking-wider text-shadow-lg"
          aria-label={fullText}
        >
          <span className="relative inline-block md:min-h-27">
            <span
              className="bg-gradient-to-r from-electric-blue via-neon-purple to-cyan bg-clip-text text-transparent"
              ref={textRef}
              aria-live="polite"
            ></span>
            <span
              className={`${
                textDone ? "hidden" : "inline-block"
              } w-[2px] bg-white ml-1 animate-pulse`}
              style={{ height: "1em", verticalAlign: "bottom" }}
              aria-hidden="true"
            />
          </span>
        </h1>
        <p
          className="font-spaceGrotesk text-text-secondary text-2xl md:text-xl max-w-2xl mx-auto text-shadow"
          role="doc-subtitle"
        >
          Exploring the intersection of creativity and technology
        </p>
      </div>

      {/* Add structured data for the hero section */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Rinor Rexhaj - Full Stack Developer Portfolio",
          description:
            "Welcome to my portfolio showcasing my work in full-stack development, AI/ML, and data science",
          mainEntity: {
            "@type": "Person",
            name: "Rinor Rexhaj",
            jobTitle: "Full Stack Developer",
            description:
              "Exploring the intersection of creativity and technology",
          },
        })}
      </script>
    </section>
  );
};

export default HeroSection;
