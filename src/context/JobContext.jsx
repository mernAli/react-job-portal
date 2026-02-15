import { createContext, useContext, useState, useEffect } from "react";
import { fetchJobs } from "../services/JobService";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [apiJobs, setApiJobs] = useState([]);
  const [employerJobs, setEmployerJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    type: "",
  });

  useEffect(() => {
    loadApiJobs();
  }, []);

  const loadApiJobs = async () => {
    try {
      const data = await fetchJobs();
      setApiJobs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addJob = (jobData) => {
    const newJob = {
      id: Date.now(),
      ...jobData,
      status: "Active",
      postedDate: new Date().toISOString().split("T")[0],
      applicants: 0,
    };

    setEmployerJobs((prev) => [newJob, ...prev]);
  };

  const closeJob = (id) => {
    setEmployerJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: "Closed" } : job
      )
    );
  };

  // Merge jobs for candidate
  const allJobs = [...employerJobs, ...apiJobs];

  const filteredJobs = allJobs.filter((job) => {
    const title = job.title || "";
    const company = job.company || job.company_name || "";
    const location = job.location || "";
    const jobTypes = job.jobType || job.job_types || [];

    const matchesSearch =
      title.toLowerCase().includes(filters.search.toLowerCase()) ||
      company.toLowerCase().includes(filters.search.toLowerCase());

    const matchesLocation =
      !filters.location ||
      location.toLowerCase().includes(filters.location.toLowerCase());

    const matchesType =
      !filters.type ||
      (Array.isArray(jobTypes)
        ? jobTypes.some((t) =>
            t.toLowerCase().includes(filters.type.toLowerCase())
          )
        : jobTypes.toLowerCase().includes(filters.type.toLowerCase()));

    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <JobContext.Provider
      value={{
        loading,
        employerJobs,
        addJob,
        closeJob,
        filters,
        setFilters,
        filteredJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => useContext(JobContext);
