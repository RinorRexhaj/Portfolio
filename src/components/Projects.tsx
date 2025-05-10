import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../utils/Projects";
import Display from "./Display";

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

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
      const interval = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % currentProject.images!.length);
      }, 3000);

      return () => clearInterval(interval);
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
    <section className="py-20 w-11/12 mx-auto max-w-7xl">
      <h2 className="font-orbitron text-4xl mb-12 text-center">
        Featured Projects
      </h2>

      {/* Main Project Display */}
      <div className="relative mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="group relative bg-deep-space/50 backdrop-blur-sm border border-electric-blue/30 rounded-lg p-8 transition-all duration-300 hover:shadow-holographic-hover"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <h3 className="font-orbitron text-3xl mb-6 text-electric-blue">
                {projects[currentIndex].title}
              </h3>
              <p className="font-spaceGrotesk text-text-secondary text-lg mb-8">
                {projects[currentIndex].description}
              </p>

              <Display
                currentIndex={currentIndex}
                imageIndex={imageIndex}
                loadedImages={loadedImages}
                setImageIndex={setImageIndex}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevProject}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-deep-space/80 backdrop-blur-sm border border-electric-blue/30 rounded-full p-3 text-electric-blue hover:bg-electric-blue/20 transition-colors duration-300"
        >
          ←
        </button>
        <button
          onClick={nextProject}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-deep-space/80 backdrop-blur-sm border border-electric-blue/30 rounded-full p-3 text-electric-blue hover:bg-electric-blue/20 transition-colors duration-300"
        >
          →
        </button>
      </div>

      {/* Project Navigation */}
      <div className="flex justify-center gap-4">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-electric-blue scale-125"
                : "bg-electric-blue/30 hover:bg-electric-blue/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
