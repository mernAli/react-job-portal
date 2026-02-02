const features = [
  {
    title: "Real Job Listings",
    desc: "Jobs fetched from trusted public APIs.",
  },
  {
    title: "Fast & Responsive",
    desc: "Optimized UI for all devices.",
  },
  {
    title: "Modern Stack",
    desc: "Built with React and Tailwind CSS.",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Why Choose Our Platform?
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-600 transition"
            >
              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
