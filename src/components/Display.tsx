import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../utils/Projects";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import ResponsiveImage from "./ResponsiveImage";
import { useAutoRotate } from "../hooks/useAutoRotate";

interface DisplayProps {
  currentIndex: number;
}

/** Main stage: ~92vw on phones, a little over half the card on desktop. */
const MAIN_SIZES = "(max-width: 768px) 92vw, 55vw";
const THUMB_SIZES = "64px";
const FULLSCREEN_SIZES = "90vw";

const Display: React.FC<DisplayProps> = ({ currentIndex }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const images = projects[currentIndex].images ?? [];

  const {
    index: imageIndex,
    select,
    step,
    reset,
  } = useAutoRotate(images.length, {
    enabled: images.length > 3 && !isFullscreen,
  });

  // New project -> back to its first image.
  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, step]);

  if (images.length === 0) return null;

  const current = images[imageIndex];

  return (
    <>
      <div className="w-full flex md:flex-col gap-4 items-start">
        {/* Main Image */}
        <div className="flex-1 h-96 md:h-56 aspect-video relative rounded-lg overflow-hidden w-9/12 md:w-full bg-deep-space/30">
          <AnimatePresence mode="wait">
            <motion.button
              key={current.src}
              type="button"
              onClick={() => setIsFullscreen(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-electric-blue"
              aria-label={`View "${current.alt}" fullscreen`}
            >
              <ResponsiveImage
                src={current.src}
                alt={current.alt}
                sizes={MAIN_SIZES}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </motion.button>
          </AnimatePresence>
        </div>

        {/* Thumbnails */}
        <div className="flex flex-wrap w-4/12 gap-2 md:gap-1 md:w-full max-h-[400px] md:h-fit md:overflow-y-auto">
          {images.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              onClick={() => select(idx)}
              className={`relative w-16 h-9 overflow-hidden rounded-sm border transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue ${
                idx === imageIndex
                  ? "border-electric-blue"
                  : "border-transparent hover:border-electric-blue/50"
              }`}
              aria-label={`Show image ${idx + 1}: ${img.alt}`}
              aria-current={idx === imageIndex}
            >
              <ResponsiveImage
                src={img.src}
                alt=""
                sizes={THUMB_SIZES}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {isFullscreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[999] bg-deep-space flex items-center justify-center"
              onClick={() => setIsFullscreen(false)}
              role="dialog"
              aria-modal="true"
              aria-label={`${projects[currentIndex].title} image viewer`}
            >
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="absolute top-6 right-6 flex items-center justify-center w-12 h-12 text-electric-blue bg-deep-space/80 border border-electric-blue/30 rounded-full hover:bg-electric-blue/20 transition-colors duration-300"
                aria-label="Close fullscreen view"
              >
                <FontAwesomeIcon icon={faXmark} className="text-xl" />
              </button>

              {images.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  className="absolute left-4 md:left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 text-electric-blue bg-deep-space/80 border border-electric-blue/30 rounded-full hover:bg-electric-blue/20 transition-colors duration-300"
                  aria-label="Previous image"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
                </button>
              )}

              <div onClick={(e) => e.stopPropagation()}>
                <ResponsiveImage
                  src={current.src}
                  alt={current.alt}
                  sizes={FULLSCREEN_SIZES}
                  loading="eager"
                  fetchPriority="high"
                  className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain rounded-lg"
                />
              </div>

              {images.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  className="absolute right-4 md:right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 text-electric-blue bg-deep-space/80 border border-electric-blue/30 rounded-full hover:bg-electric-blue/20 transition-colors duration-300"
                  aria-label="Next image"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
                </button>
              )}

              {images.length > 1 && (
                <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-text-secondary font-spaceGrotesk text-sm">
                  {imageIndex + 1} / {images.length}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Display;
