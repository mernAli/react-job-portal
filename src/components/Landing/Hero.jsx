const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Find Your Dream Job  
          <span className="text-blue-500"> Faster</span>
        </h1>

        <p className="mt-6 text-lg text-slate-400">
          A modern job portal built for developers, designers, and creators.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
            Browse Jobs
          </button>

          <button className="px-6 py-3 rounded-lg border border-slate-700 hover:bg-slate-800 transition">
            Post a Job
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
