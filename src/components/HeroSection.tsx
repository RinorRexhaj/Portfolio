const HeroSection = () => {
  return (
    <section className="min-h-[80vh] w-11/12 mx-auto max-w-7xl flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="font-orbitron text-5xl md:text-7xl font-bold tracking-wider animate-float">
          <span className="bg-gradient-to-r from-electric-blue via-neon-purple to-cyan bg-clip-text text-transparent">
            Welcome to My Portfolio
          </span>
        </h1>
        <p className="font-spaceGrotesk text-text-secondary text-xl md:text-2xl max-w-2xl mx-auto">
          Exploring the intersection of creativity and technology
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
