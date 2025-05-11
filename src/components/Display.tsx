import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../utils/Projects";
import { useEffect, useState, useRef } from "react";

interface DisplayProps {
  currentIndex: number;
}

const Display: React.FC<DisplayProps> = ({ currentIndex }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const intervalRef = useRef<number | null>(null);

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
    if (currentProject.images && currentProject.images.length > 3) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % currentProject.images!.length);
      }, 3000);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [currentIndex]);

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
                    <img
                      src={projects[currentIndex].images[imageIndex].src}
                      alt={projects[currentIndex].images[imageIndex].alt}
                      className="w-full h-full object-cover"
                    />
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
    </>
  );
};

export default Display;
