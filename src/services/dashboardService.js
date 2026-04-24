import api from "./api";

// ─── EMPLOYER DASHBOARD ──────────────────────────────────

export const fetchEmployerStats = async () => {
  // const response = await api.get("/employer/stats");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { title: "Total Jobs Posted", value: "24", icon: "💼", trend: "up", trendValue: "+3", colorType: "info" },
        { title: "Active Applications", value: "156", icon: "📄", trend: "up", trendValue: "+12", colorType: "success" },
        { title: "Hired Candidates", value: "8", icon: "✅", trend: "up", trendValue: "+2", colorType: "info" },
        { title: "Pending Reviews", value: "42", icon: "⏳", trend: "down", trendValue: "-5", colorType: "warning" },
      ]);
    }, 1000);
  });
};

export const fetchRecentApplications = async () => {
  // const response = await api.get("/employer/applications/recent");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, candidateName: "John Doe", position: "Frontend Developer", appliedDate: "2026-02-08", status: "Under Review" },
        { id: 2, candidateName: "Sarah Johnson", position: "UI/UX Designer", appliedDate: "2026-02-07", status: "Shortlisted" },
        { id: 3, candidateName: "Mike Chen", position: "Backend Developer", appliedDate: "2026-02-06", status: "Interview Scheduled" },
        { id: 4, candidateName: "Emily Davis", position: "Product Manager", appliedDate: "2026-02-05", status: "Under Review" },
      ]);
    }, 1200);
  });
};

export const fetchEmployerActivity = async () => {
  // const response = await api.get("/employer/activity");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, type: "application", message: "New application received for Frontend Developer", time: "2 hours ago", icon: "📄" },
        { id: 2, type: "shortlist", message: "Sarah Johnson shortlisted for UI/UX Designer", time: "5 hours ago", icon: "⭐" },
        { id: 3, type: "job", message: "Your job post 'Backend Developer' is now live", time: "1 day ago", icon: "💼" },
        { id: 4, type: "hired", message: "Mike Chen accepted the offer for React Developer", time: "2 days ago", icon: "✅" },
      ]);
    }, 800);
  });
};

// ─── EMPLOYER ANALYTICS CHARTS ───────────────────────────

// GET /employer/analytics/applications-trend
// Line chart — applications received per week over last 8 weeks
export const fetchApplicationTrend = async () => {
  // const response = await api.get("/employer/analytics/applications-trend");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { week: "Week 1", applications: 12, shortlisted: 4, hired: 1 },
        { week: "Week 2", applications: 19, shortlisted: 6, hired: 2 },
        { week: "Week 3", applications: 15, shortlisted: 5, hired: 1 },
        { week: "Week 4", applications: 28, shortlisted: 9, hired: 3 },
        { week: "Week 5", applications: 22, shortlisted: 8, hired: 2 },
        { week: "Week 6", applications: 35, shortlisted: 12, hired: 4 },
        { week: "Week 7", applications: 30, shortlisted: 10, hired: 3 },
        { week: "Week 8", applications: 42, shortlisted: 15, hired: 5 },
      ]);
    }, 900);
  });
};

// GET /employer/analytics/hiring-funnel
// Funnel chart — how many candidates move through each stage
export const fetchHiringFunnel = async () => {
  // const response = await api.get("/employer/analytics/hiring-funnel");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { stage: "Total Applied",        value: 156, fill: "#3B82F6" },
        { stage: "Reviewed",             value: 98,  fill: "#8B5CF6" },
        { stage: "Shortlisted",          value: 54,  fill: "#F59E0B" },
        { stage: "Interview Scheduled",  value: 28,  fill: "#10B981" },
        { stage: "Offer Sent",           value: 12,  fill: "#06B6D4" },
        { stage: "Hired",                value: 8,   fill: "#22C55E" },
      ]);
    }, 700);
  });
};

// GET /employer/analytics/candidate-pipeline
// Bar chart — candidates per job position
export const fetchCandidatePipeline = async () => {
  // const response = await api.get("/employer/analytics/candidate-pipeline");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { position: "React Dev",      applied: 45, shortlisted: 12, hired: 3 },
        { position: "UI/UX Designer", applied: 32, shortlisted: 8,  hired: 2 },
        { position: "Backend Dev",    applied: 28, shortlisted: 7,  hired: 1 },
        { position: "Product Mgr",    applied: 22, shortlisted: 5,  hired: 1 },
        { position: "DevOps",         applied: 18, shortlisted: 4,  hired: 1 },
      ]);
    }, 800);
  });
};

// ─── CANDIDATE DASHBOARD ─────────────────────────────────

export const fetchCandidateStats = async () => {
  // const response = await api.get("/candidate/stats");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { title: "Jobs Applied", value: "12", icon: "📋", trend: "up", trendValue: "+3", colorType: "info" },
        { title: "Profile Views", value: "48", icon: "👁️", trend: "up", trendValue: "+8", colorType: "success" },
        { title: "Saved Jobs", value: "7", icon: "⭐", trend: "down", trendValue: "-2", colorType: "warning" },
        { title: "Interview Invites", value: "3", icon: "📅", trend: "up", trendValue: "+1", colorType: "info" },
      ]);
    }, 1000);
  });
};

export const fetchCandidateApplications = async () => {
  // const response = await api.get("/candidate/applications");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, jobTitle: "Senior React Developer", company: "Tech Solutions Inc.", appliedDate: "2026-02-08", status: "Under Review" },
        { id: 2, jobTitle: "Frontend Engineer", company: "StartupXYZ", appliedDate: "2026-02-06", status: "Interview Scheduled" },
        { id: 3, jobTitle: "Full Stack Developer", company: "InnovateCorp", appliedDate: "2026-02-04", status: "Rejected" },
      ]);
    }, 1200);
  });
};

export const fetchRecommendedJobs = async () => {
  // const response = await api.get("/candidate/recommended-jobs");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "React Developer", company: "Creative Agency", location: "Remote", type: "Full Time", salary: "$80k - $120k" },
        { id: 2, title: "UI/UX Designer", company: "Design Studio", location: "New York, NY", type: "Full Time", salary: "$70k - $100k" },
        { id: 3, title: "Product Manager", company: "Tech Ventures", location: "San Francisco, CA", type: "Full Time", salary: "$100k - $150k" },
      ]);
    }, 900);
  });
};

// ─── ATS ─────────────────────────────────────────────────

export const fetchAllApplications = async () => {
  // const response = await api.get("/employer/applications");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, candidateName: "John Doe", email: "john.doe@email.com", position: "Senior React Developer", appliedDate: "2026-02-08", status: "Under Review", experience: "5 years", phone: "+1 234 567 8901" },
        { id: 2, candidateName: "Sarah Johnson", email: "sarah.j@email.com", position: "UI/UX Designer", appliedDate: "2026-02-07", status: "Shortlisted", experience: "3 years", phone: "+1 234 567 8902" },
        { id: 3, candidateName: "Mike Chen", email: "mike.chen@email.com", position: "Backend Developer", appliedDate: "2026-02-06", status: "Interview Scheduled", experience: "4 years", phone: "+1 234 567 8903" },
        { id: 4, candidateName: "Emily Davis", email: "emily.d@email.com", position: "Product Manager", appliedDate: "2026-02-05", status: "Rejected", experience: "6 years", phone: "+1 234 567 8904" },
        { id: 5, candidateName: "Alex Kumar", email: "alex.k@email.com", position: "Senior React Developer", appliedDate: "2026-02-09", status: "Under Review", experience: "3 years", phone: "+1 234 567 8905" },
        { id: 6, candidateName: "Priya Sharma", email: "priya.s@email.com", position: "UI/UX Designer", appliedDate: "2026-02-09", status: "Under Review", experience: "2 years", phone: "+1 234 567 8906" },
      ]);
    }, 1000);
  });
};

export const updateApplicationStatus = async (applicationId, newStatus) => {
  // const response = await api.put(`/applications/${applicationId}/status`, { status: newStatus });
  // return response.data;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (applicationId && newStatus) {
        resolve({ success: true, applicationId, status: newStatus, updatedAt: new Date().toISOString() });
      } else {
        reject(new Error("Invalid application ID or status"));
      }
    }, 600);
  });
};

export const fetchEmployerJobs = async () => {
  // const response = await api.get("/employer/jobs");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Senior React Developer", company: "Tech Solutions Inc.", location: "Remote", type: "Full Time", postedDate: "2026-02-01", applicants: 45, status: "Active" },
        { id: 2, title: "UI/UX Designer", company: "Creative Agency", location: "New York, NY", type: "Full Time", postedDate: "2026-01-28", applicants: 32, status: "Active" },
        { id: 3, title: "Backend Developer", company: "StartupXYZ", location: "San Francisco, CA", type: "Contract", postedDate: "2026-01-20", applicants: 28, status: "Closed" },
        { id: 4, title: "Product Manager", company: "InnovateCorp", location: "Remote", type: "Full Time", postedDate: "2026-01-15", applicants: 67, status: "Active" },
      ]);
    }, 800);
  });
};