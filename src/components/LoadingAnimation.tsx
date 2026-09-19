import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const GEARS = [
  { angle: 0, distance: 50, size: 72 },
  { angle: 120, distance: 40, size: 96 },
  { angle: 240, distance: 50, size: 80 },
];

/**
 * Purely presentational overlay. App owns when this mounts and unmounts — this
 * component holds no dismissal timer of its own.
 */
const LoadingAnimation = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-deep-space z-50 flex items-center justify-center"
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Grid lines */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20"></div>

      {/* Scanning effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-electric-blue/0 via-electric-blue/5 to-electric-blue/0 animate-scan motion-reduce:animate-none"></div>

      {/* Assembly animation container */}
      <div className="relative w-64 h-64" aria-hidden="true">
        {/* Outer ring */}
        <div
          className="absolute inset-0 border-2 border-electric-blue rounded-full animate-[rotating_3s_linear_infinite] motion-reduce:animate-none"
          style={{
            clipPath: `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0 100%)`,
          }}
        />

        {/* Orbiting elements */}
        <div className="absolute inset-4 flex items-center justify-center">
          {GEARS.map((gear, index) => (
            <div
              key={`gear-${index}`}
              className="absolute text-cyan rounded-full"
              style={{
                rotate: `${gear.angle}deg`,
                transform: `translateX(${(progress / 100) * gear.distance}px)`,
              }}
            >
              <FontAwesomeIcon
                icon={faGear}
                spin
                style={{
                  width: `${gear.size}px`,
                  height: `${gear.size}px`,
                  opacity: progress / 100,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Loading text */}
      <p
        className="absolute bottom-20 font-orbitron text-electric-blue text-xl"
        style={{
          opacity: progress / 100,
          transform: `translateY(${20 - progress / 5}px)`,
        }}
      >
        SYSTEM INITIALIZING
      </p>

      {/* Progress bar */}
      <div
        className="absolute bottom-10 w-64 h-1 bg-deep-space/50 rounded-full overflow-hidden"
        style={{ opacity: progress / 100 }}
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-electric-blue to-neon-purple transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingAnimation;
