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

// GET /candidate/applications — fetch current user's applications
export const fetchMyApplications = async () => {
  // const response = await api.get("/candidate/applications");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          jobTitle: "Senior React Developer",
          company: "Tech Solutions Inc.",
          location: "Remote",
          appliedDate: "2026-02-08",
          status: "Under Review",
          salary: "$80k - $120k",
        },
        {
          id: 2,
          jobTitle: "Frontend Engineer",
          company: "StartupXYZ",
          location: "San Francisco, CA",
          appliedDate: "2026-02-06",
          status: "Interview Scheduled",
          salary: "$90k - $130k",
        },
        {
          id: 3,
          jobTitle: "Full Stack Developer",
          company: "InnovateCorp",
          location: "New York, NY",
          appliedDate: "2026-02-04",
          status: "Rejected",
          salary: "$85k - $125k",
        },
        {
          id: 4,
          jobTitle: "UI/UX Designer",
          company: "Creative Agency",
          location: "Remote",
          appliedDate: "2026-02-02",
          status: "Under Review",
          salary: "$70k - $100k",
        },
        {
          id: 5,
          jobTitle: "Product Manager",
          company: "Tech Ventures",
          location: "Boston, MA",
          appliedDate: "2026-01-30",
          status: "Offer Received",
          salary: "$100k - $150k",
        },
      ]);
    }, 800);
  });
};

// ─── NEW ─────────────────────────────────────────────────
// GET /candidate/applications/:id/interview
// Returns the interview schedule linked to a specific application.
// When the real backend is ready, uncomment the api call and delete the mock.
export const fetchCandidateInterviewDetails = async (applicationId) => {
  // const response = await api.get(`/candidate/applications/${applicationId}/interview`);
  // return response.data;

  // Mock data — one interview record per "Interview Scheduled" application.
  // applicationId 2 = "Frontend Engineer" at "StartupXYZ"
  const MOCK_INTERVIEWS = {
    2: {
      applicationId:  2,
      jobTitle:       "Frontend Engineer",
      company:        "StartupXYZ",
      location:       "San Francisco, CA",
      salary:         "$90k - $130k",
      jobType:        "Full Time",
      // Interview schedule fields
      date:           "2026-06-10",
      time:           "10:00 AM",
      duration:       60,
      platform:       "Google Meet",
      meetingLink:    "https://meet.google.com/abc-defg-hij",
      interviewerName: "HR Team",
      notes:          "Please prepare a brief portfolio walkthrough.",
      status:         "Scheduled",
      // Job description extras
      skills:         ["React", "JavaScript", "Tailwind CSS", "REST APIs"],
      experience:     "2–4 years",
      about:
        "StartupXYZ is building the next generation of developer tools. " +
        "You will join a small, fast-moving frontend team and own key " +
        "product surfaces end-to-end.",
    },
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const interview = MOCK_INTERVIEWS[applicationId];
      if (interview) {
        resolve(interview);
      } else {
        reject(new Error("No interview details found for this application."));
      }
    }, 600);
  });
};
// ─────────────────────────────────────────────────────────

// DELETE /candidate/applications/:id — withdraw an application
export const withdrawApplication = async (applicationId) => {
  // const response = await api.delete(`/candidate/applications/${applicationId}`);
  // return response.data;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (applicationId) {
        resolve({ success: true, applicationId });
      } else {
        reject(new Error("Invalid application ID"));
      }
    }, 800);
  });
};

// ─── EMPLOYER ────────────────────────────────────────────

// POST /jobs — create a new job
export const createJob = async (jobData) => {
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