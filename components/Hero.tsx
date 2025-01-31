const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-[60vh] py-10 px-6 overflow-hidden">
      {/* Main Heading */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 font-bold mb-6 leading-tight animate-fade-in-up">
        Tell Your Story, <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
          Where Stories Begin
        </span>
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-gray-100 max-w-3xl mb-8 animate-fade-in-up delay-100">
        Express Your Creativity, Share Your Journey, and Inspire Others.
      </p>
    </section>
  );
};

export default Hero
