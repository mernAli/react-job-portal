import api from "./api";

// GET all jobs
export const fetchJobs = async () => {

  const response = await api.get("/job-board-api");
  return response.data.data;
};

// GET single job by ID
export const fetchJobById = async (jobId) => {
  const response = await api.get(`/job-board-api`);
  // Since this is a public API, we filter client-side
  const job = response.data.data.find((job) => job.slug === jobId);
  if (!job) throw new Error("Job not found");
  return job;
};