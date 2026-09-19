import { useEffect, useRef, useState } from "react";
import ResponsiveImage from "./ResponsiveImage";

/**
 * Hero art geometry, measured from the composition itself.
 *
 * Every piece is absolutely positioned against a single horizontal anchor
 * line. Measured against that line the art reaches 397px above and 137px
 * below, and is 552px wide. The wrapper therefore reserves 397+137=534px of
 * real height instead of collapsing to zero and overlapping the copy, which
 * is what the old markup hid behind a black scrim.
 *
 * Mobile scales the whole composition about the anchor (0.62, chosen so
 * 552px fits a 375px viewport) rather than resizing individual pieces, so
 * the proportions stay identical to desktop:
 *   above 397*0.62 = 246   below 137*0.62 = 85   height = 331
 *
 * These literals live in the classes below because Tailwind arbitrary values
 * have to be static strings.
 */
const LAYER_COUNT = 10;

const HeroSection = () => {
  const fullText = "AI & Software Engineer";
  const [textDone, setTextDone] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const [layers, setLayers] = useState<boolean[]>(
    Array(LAYER_COUNT).fill(false)
  );
  const [light, setLight] = useState(false);
  const [light1, setLight1] = useState(false);
  const [hologram, setHologram] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTimeout(() => {
        if (index < fullText.length && textRef.current) {
          textRef.current.textContent += fullText[index];
          index++;
        } else {
          setTextDone(true);
          clearInterval(interval);
        }
      }, 700);
    }, 50);

    // Sequentially reveal each layer
    const layerTimeouts = [...Array(LAYER_COUNT)].map((_, i) => {
      const wait = i === 0 ? 1000 : 0;
      return window.setTimeout(() => {
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
      layerTimeouts.forEach(window.clearTimeout);
      clearTimeout(light1Timeout);
      clearTimeout(lightTimeout);
      clearTimeout(hologramTimeout);
    };
  }, []);

  return (
    <section
      id="about"
      className="min-h-[80vh] mt-5 w-11/12 mx-auto max-w-7xl flex md:flex-col items-center justify-center md:gap-4"
      aria-label="Introduction"
    >
      {/* Art column — reserves real height so nothing overlaps the copy. */}
      <div
        className="relative w-1/2 md:w-full shrink-0 h-[534px] md:h-[331px]"
        aria-hidden="true"
      >
        {/* The anchor line. Full width + centered so each absolutely
            positioned piece keeps its flex static position. */}
        <div className="absolute inset-x-0 top-[397px] md:top-[246px] md:scale-[0.62]">
          <ResponsiveImage
            src="/assets/img/hologram/light.png"
            alt=""
            sizes="246px"
            loading="eager"
            className={`absolute -bottom-20 left-1/2 -translate-x-1/2 max-w-96 ${
              light ? "opacity-100" : "opacity-0"
            } transition-opacity duration-200`}
          />
          <ResponsiveImage
            src="/assets/img/hologram/light2.png"
            alt=""
            sizes="552px"
            loading="eager"
            // max-w-none: this glow is the widest piece at 552px, and
            // preflight's img{max-width:100%} would otherwise clamp it to the
            // column on mobile, inverting its ratio against the base rings.
            className={`absolute -bottom-20 left-1/2 -translate-x-1/2 max-w-none ${
              light1 ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          />
          <ResponsiveImage
            src="/assets/img/hologram/hologram.png"
            alt=""
            sizes="384px"
            loading="eager"
            fetchPriority="high"
            className={`absolute -bottom-10 left-1/2 -translate-x-1/2 max-w-96 ${
              hologram ? "opacity-100" : "opacity-0"
            } transition-opacity duration-500`}
          />

          {/* Base rings */}
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2">
            {[...Array(LAYER_COUNT)].map((_, i) => {
              const scale = i === 0 ? 1.8 : 1 - (i + 1) * 0.1 + 0.5;
              const bottomOffset = i === 0 ? 12 : (i + 1) * 3.85;

              return (
                <ResponsiveImage
                  key={i}
                  src={`/assets/img/hologram/layer${i + 1}.png`}
                  alt=""
                  sizes="465px"
                  loading="eager"
                  // w-auto: the width/height attributes act as a
                  // presentational hint that would otherwise beat the
                  // aspect-ratio sizing h-13 depends on, squashing the ring.
                  className={`absolute h-13 w-auto max-w-96 transition-opacity duration-300 ${
                    layers[i] ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    bottom: `${bottomOffset}px`,
                    left: "50%",
                    transform: `translateX(-50%) scale(${scale})`,
                    zIndex: i,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative text-center w-1/2 md:w-full space-y-6 p-4">
        <h1 className="relative font-orbitron text-7xl md:text-5xl font-bold tracking-wider text-shadow-lg">
          <span className="bg-gradient-to-r from-electric-blue via-neon-purple to-cyan bg-clip-text text-transparent">
            Rinor Rexhaj
          </span>
        </h1>

        {/* Role, typed out. Screen readers get it whole; the animation is decorative. */}
        <p className="font-orbitron text-3xl md:text-2xl font-medium text-text-primary min-h-[1.4em] text-shadow">
          <span className="sr-only">{fullText}</span>
          <span className="relative inline-block" aria-hidden="true">
            <span ref={textRef} />
            <span
              className={`${
                textDone ? "hidden" : "inline-block"
              } w-[2px] bg-white ml-1 animate-pulse`}
              style={{ height: "1em", verticalAlign: "bottom" }}
            />
          </span>
        </p>

        <p className="font-spaceGrotesk text-text-secondary text-2xl md:text-xl max-w-2xl mx-auto text-shadow">
          Exploring the intersection of creativity and technology
        </p>
      </div>

      {/* Structured data for the hero section */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Rinor Rexhaj - AI & Software Engineer Portfolio",
          description:
            "Portfolio of Rinor Rexhaj, AI & Software Engineer, showcasing AI/ML and full-stack engineering work",
          mainEntity: {
            "@type": "Person",
            name: "Rinor Rexhaj",
            jobTitle: "AI & Software Engineer",
            description:
              "Exploring the intersection of creativity and technology",
          },
        })}
      </script>
    </section>
  );
};

export default HeroSection;
