import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  title: string;
  description: string;
  images?: string[];
}

const projects: Project[] = [
  {
    title: "UrbanCenter",
    description:
      "A modern urban planning and management system that helps cities optimize their resources and improve citizen services.",
  },
  {
    title: "PowerDash",
    description:
      "Real-time energy monitoring and management dashboard for industrial facilities.",
  },
  {
    title: "Villa Vibes",
    description:
      "Luxury property management system with virtual tours and automated booking.",
  },
  {
    title: "Management System",
    description:
      "Comprehensive business management solution with inventory, sales, and customer relationship features.",
    images: [
      "/assets/img/sign-in.jpg",
      "/assets/img/dashboard-1.jpg",
      "/assets/img/dashboard-2.jpg",
      "/assets/img/notifications.jpg",
      "/assets/img/top-cars.jpg",
      "/assets/img/car-sales.jpg",
      "/assets/img/car-dashboard.jpg",
      "/assets/img/cars.jpg",
      "/assets/img/tables.jpg",
      "/assets/img/restaurant.jpg",
      "/assets/img/orders.jpg",
      "/assets/img/reservations.jpg",
      "/assets/img/reservation-2.jpg",
      "/assets/img/reservation-1.jpg",
      "/assets/img/settings.jpg",
    ],
  },
  {
    title: "SafeTravels",
    description:
      "Travel safety and emergency response system with real-time alerts and location tracking.",
  },
  {
    title: "AlgoViz",
    description:
      "Interactive algorithm visualization tool for educational purposes.",
  },
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Auto-rotate images if there are more than 3
  useEffect(() => {
    const currentProject = projects[currentIndex];
    if (currentProject.images && currentProject.images.length > 3) {
      const interval = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % currentProject.images!.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [currentIndex]);

  const getVisibleImages = () => {
    const currentProject = projects[currentIndex];
    if (!currentProject.images) return [];

    const images = currentProject.images;
    if (images.length <= 3) return images.slice(0, 3);

    // Get 3 consecutive images starting from imageIndex
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

              {projects[currentIndex].images && (
                <div className="relative">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <AnimatePresence mode="wait">
                      {getVisibleImages().map((image, index) => (
                        <motion.div
                          key={`${image}-${imageIndex}`}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.5 }}
                          className="relative aspect-video rounded-lg overflow-hidden"
                        >
                          <img
                            src={image}
                            alt={`${projects[currentIndex].title} screenshot ${
                              index + 1
                            }`}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Image Navigation Dots */}
                  {projects[currentIndex].images &&
                    projects[currentIndex].images.length > 3 && (
                      <div className="flex justify-center gap-2 mt-4">
                        {projects[currentIndex].images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === imageIndex
                                ? "bg-electric-blue scale-125"
                                : "bg-electric-blue/30"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                </div>
              )}
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
