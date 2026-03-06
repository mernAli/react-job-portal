import api from "./api";

// ─── CANDIDATE ───────────────────────────────────────────

// GET all jobs
export const fetchJobs = async () => {
  const response = await api.get("/job-board-api");
  return response.data.data;
};

// GET single job by ID
export const fetchJobById = async (jobId) => {
  const response = await api.get("/job-board-api");
  const job = response.data.data.find((job) => job.slug === jobId);
  if (!job) throw new Error("Job not found");
  return job;
};

// POST /jobs/:id/apply
export const applyJob = async (jobId, applicantData) => {
  // When real backend is ready, uncomment:
  // const response = await api.post(`/jobs/${jobId}/apply`, applicantData);
  // return response.data;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (jobId) {
        resolve({
          success: true,
          message: "Application submitted successfully!",
          applicationId: `APP-${Date.now()}`,
          jobId,
          appliedAt: new Date().toISOString(),
        });
      } else {
        reject(new Error("Invalid job ID"));
      }
    }, 1500);
  });
};

// ─── EMPLOYER ────────────────────────────────────────────

// POST /jobs — create a new job
export const createJob = async (jobData) => {
  // When real backend is ready, uncomment:
  // const response = await api.post("/jobs", jobData);
  // return response.data;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (jobData.title && jobData.company) {
        resolve({
          success: true,
          message: "Job posted successfully!",
          job: {
            id: `JOB-${Date.now()}`,
            ...jobData,
            createdAt: new Date().toISOString(),
            status: "active",
            applicants: 0,
          },
        });
      } else {
        reject(new Error("Job title and company are required"));
      }
    }, 1500);
  });
};

// PUT /jobs/:id — update existing job
export const updateJob = async (jobId, jobData) => {
  // When real backend is ready, uncomment:
  // const response = await api.put(`/jobs/${jobId}`, jobData);
  // return response.data;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (jobId && jobData.title) {
        resolve({
          success: true,
          message: "Job updated successfully!",
          job: {
            id: jobId,
            ...jobData,
            updatedAt: new Date().toISOString(),
          },
        });
      } else {
        reject(new Error("Job ID and title are required"));
      }
    }, 1500);
  });
};

// DELETE /jobs/:id
export const deleteJob = async (jobId) => {
  // When real backend is ready, uncomment:
  // const response = await api.delete(`/jobs/${jobId}`);
  // return response.data;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (jobId) {
        resolve({
          success: true,
          message: "Job deleted successfully!",
          jobId,
        });
      } else {
        reject(new Error("Job ID is required"));
      }
    }, 1000);
  });
};