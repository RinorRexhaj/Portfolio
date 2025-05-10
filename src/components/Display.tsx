import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../utils/Projects";

interface DisplayProps {
  currentIndex: number;
  imageIndex: number;
  loadedImages: Set<string>;
  setImageIndex: (index: number) => void;
}

const Display: React.FC<DisplayProps> = ({
  currentIndex,
  imageIndex,
  loadedImages,
  setImageIndex,
}) => {
  return (
    <>
      {projects[currentIndex].images &&
        projects[currentIndex].images.length > 0 && (
          <div className="w-full flex md:flex-col gap-6 items-start">
            {/* Main Image */}
            <div className="flex-1 aspect-video relative rounded-lg overflow-hidden w-8/12 md:w-full bg-deep-space/30">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${
                    projects[currentIndex].images[imageIndex].src || ""
                  }-${imageIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  {loadedImages.has(
                    projects[currentIndex].images[imageIndex].src
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
            <div className="flex flex-wrap w-4/12 gap-2 md:gap-1 md:w-full max-h-[400px] md:h-fit md:overflow-y-auto">
              {projects[currentIndex].images.map((img, idx) => (
                <button
                  key={img.src}
                  onClick={() => setImageIndex(idx)}
                  className={`relative w-16 h-9 sm:w-8 sm:h-4 overflow-hidden rounded-sm border ${
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
          </div>
        )}
    </>
  );
};

export default Display;
