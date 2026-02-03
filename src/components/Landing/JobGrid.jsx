import JobCard from "./JobCard";

const JobGrid = () => {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Remote",
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "StartupX",
      location: "Bangalore",
    },
    {
      id: 3,
      title: "UI Designer",
      company: "DesignHub",
      location: "Remote",
    },
    {
      id: 4,
      title: "MERN Developer",
      company: "Innovate",
      location: "Chennai",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-bold text-white mb-8">
        Latest Jobs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </section>
  );
};

export default JobGrid;
