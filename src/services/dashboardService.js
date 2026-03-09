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

// ─── ATS (Application Tracking System) ───────────────────

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