import { useEffect, useState } from "react";
import { fetchJobs } from "../services/JobService.js";
import JobCard from "./JobCard";
import Loader from "./Loader";
import "./Job.css";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadJobs = async () => {
    try {
      setLoading(true);
      const jobsData = await fetchJobs();
      setJobs(jobsData.slice(0, 20));
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
    const interval = setInterval(loadJobs, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard 
          key={job.id}
          title={job.title}
          company={job.company_name}
          location={job.location}
          type={job.type}
          remote={job.remote}
        />
      ))}
    </div>
  );
};

export default JobList;
