import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../utils/Projects";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

interface DisplayProps {
  currentIndex: number;
}

const Display: React.FC<DisplayProps> = ({ currentIndex }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const images = projects[currentIndex].images || [];

  const nextFullscreenImage = () => {
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevFullscreenImage = () => {
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
      else if (e.key === "ArrowRight") nextFullscreenImage();
      else if (e.key === "ArrowLeft") prevFullscreenImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, images.length]);

  useEffect(() => {
    setImageIndex(0);
  }, [currentIndex]);

  // Preload next set of images
  useEffect(() => {
    const currentProject = projects[currentIndex];
    if (currentProject.images) {
      const nextImages = getVisibleImages();
      nextImages.forEach((image) => {
        if (!loadedImages.has(image.src)) {
          const img = new Image();
          img.src = image.src;
          img.onload = () => {
            setLoadedImages((prev) => new Set([...prev, image.src]));
          };
        }
      });
    }
  }, [currentIndex, imageIndex]);

  // Auto-rotate images if there are more than 3
  useEffect(() => {
    const currentProject = projects[currentIndex];
    if (
      currentProject.images &&
      currentProject.images.length > 3 &&
      !isFullscreen
    ) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % currentProject.images!.length);
      }, 3000);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [currentIndex, isFullscreen]);

  const getVisibleImages = () => {
    const currentProject = projects[currentIndex];
    if (!currentProject.images) return [];

    const images = currentProject.images;
    if (images.length <= 3) return images.slice(0, 3);

    return [
      images[imageIndex],
      images[(imageIndex + 1) % images.length],
      images[(imageIndex + 2) % images.length],
    ];
  };

  return (
    <>
      {projects[currentIndex].images &&
        projects[currentIndex].images.length > 0 && (
          <div className="w-full flex md:flex-col gap-4 items-start">
            {/* Main Image */}
            <div className="flex-1 h-96 aspect-video relative rounded-lg overflow-hidden w-9/12 md:w-full bg-deep-space/30">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${
                    projects[currentIndex].images[imageIndex].src || ""
                  }-${imageIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0`}
                >
                  {projects[currentIndex].images &&
                  loadedImages.has(
                    projects[currentIndex].images[imageIndex]?.src
                  ) ? (
                    <button
                      type="button"
                      onClick={() => setIsFullscreen(true)}
                      className="w-full h-full cursor-zoom-in"
                      aria-label="View image fullscreen"
                    >
                      <img
                        src={projects[currentIndex].images[imageIndex].src}
                        alt={projects[currentIndex].images[imageIndex].alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            {
              <div className="flex flex-wrap w-4/12 gap-2 md:gap-1 md:w-full max-h-[400px] md:h-fit md:overflow-y-auto">
                {projects[currentIndex].images &&
                  projects[currentIndex].images.map((img, idx) => (
                    <button
                      key={img.src}
                      onClick={() => {
                        setImageIndex(idx);
                        if (intervalRef.current) {
                          clearInterval(intervalRef.current);
                          intervalRef.current = setInterval(() => {
                            setImageIndex(
                              (prev) =>
                                (prev + 1) %
                                projects[currentIndex].images!.length
                            );
                          }, 3000);
                        }
                      }}
                      className={`relative w-16 h-9 sm:w-8 sm:h-6 overflow-hidden rounded-sm border ${
                        idx === imageIndex
                          ? "border-electric-blue"
                          : "border-transparent hover:border-electric-blue/50"
                      } transition-all`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
              </div>
            }
          </div>
        )}

      {createPortal(
        <AnimatePresence>
          {isFullscreen && images.length > 0 && (
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
                    prevFullscreenImage();
                  }}
                  className="absolute left-4 md:left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 text-electric-blue bg-deep-space/80 border border-electric-blue/30 rounded-full hover:bg-electric-blue/20 transition-colors duration-300"
                  aria-label="Previous image"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
                </button>
              )}

              <AnimatePresence mode="wait">
                <motion.img
                  key={images[imageIndex].src}
                  src={images[imageIndex].src}
                  alt={images[imageIndex].alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                />
              </AnimatePresence>

              {images.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextFullscreenImage();
                  }}
                  className="absolute right-4 md:right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 text-electric-blue bg-deep-space/80 border border-electric-blue/30 rounded-full hover:bg-electric-blue/20 transition-colors duration-300"
                  aria-label="Next image"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
                </button>
              )}

              {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-text-secondary font-spaceGrotesk text-sm">
                  {imageIndex + 1} / {images.length}
                </div>
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
