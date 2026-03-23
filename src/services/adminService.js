import api from "./api";

// GET /admin/stats
export const fetchAdminStats = async () => {
  // const response = await api.get("/admin/stats");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { title: "Total Users", value: "1,284", icon: "👥", trend: "up", trendValue: "+48", colorType: "info" },
        { title: "Active Jobs", value: "342", icon: "💼", trend: "up", trendValue: "+12", colorType: "success" },
        { title: "Applications", value: "5,621", icon: "📄", trend: "up", trendValue: "+234", colorType: "info" },
        { title: "Revenue", value: "$28,450", icon: "💰", trend: "up", trendValue: "+$2,100", colorType: "success" },
        { title: "Employers", value: "186", icon: "🏢", trend: "up", trendValue: "+8", colorType: "warning" },
        { title: "Candidates", value: "1,098", icon: "🎓", trend: "up", trendValue: "+40", colorType: "info" },
        { title: "Pro Subscribers", value: "94", icon: "👑", trend: "up", trendValue: "+6", colorType: "success" },
        { title: "Support Tickets", value: "12", icon: "🎫", trend: "down", trendValue: "-3", colorType: "warning" },
      ]);
    }, 1000);
  });
};

// GET /admin/recent-users
export const fetchRecentUsers = async () => {
  // const response = await api.get("/admin/recent-users");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Sarah Johnson", email: "sarah@email.com", role: "candidate", joinedDate: "2026-03-01", status: "Active", plan: "Pro" },
        { id: 2, name: "Tech Corp Ltd", email: "hr@techcorp.com", role: "employer", joinedDate: "2026-03-02", status: "Active", plan: "Enterprise" },
        { id: 3, name: "Mike Chen", email: "mike@email.com", role: "candidate", joinedDate: "2026-03-03", status: "Active", plan: "Free" },
        { id: 4, name: "Creative Agency", email: "jobs@creative.com", role: "employer", joinedDate: "2026-03-04", status: "Active", plan: "Pro" },
        { id: 5, name: "Emily Davis", email: "emily@email.com", role: "candidate", joinedDate: "2026-03-05", status: "Inactive", plan: "Free" },
      ]);
    }, 1200);
  });
};

// GET /admin/platform-activity
export const fetchPlatformActivity = async () => {
  // const response = await api.get("/admin/platform-activity");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, type: "user", message: "New employer registered: Tech Corp Ltd", time: "5 min ago", icon: "🏢" },
        { id: 2, type: "payment", message: "Pro plan purchased by Sarah Johnson", time: "12 min ago", icon: "💰" },
        { id: 3, type: "job", message: "New job posted: Senior React Developer", time: "25 min ago", icon: "💼" },
        { id: 4, type: "application", message: "156 new applications in last 24 hours", time: "1h ago", icon: "📄" },
        { id: 5, type: "support", message: "Support ticket #1042 resolved", time: "2h ago", icon: "✅" },
      ]);
    }, 800);
  });
};

// PUT /admin/users/:id/status — suspend or activate user
export const updateUserStatus = async (userId, status) => {
  // const response = await api.put(`/admin/users/${userId}/status`, { status });
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, userId, status, updatedAt: new Date().toISOString() });
    }, 600);
  });
};

// GET /admin/users/all — full user list with more data
export const fetchAllUsers = async () => {
  // const response = await api.get("/admin/users");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Sarah Johnson", email: "sarah@email.com", role: "candidate", joinedDate: "2026-03-01", status: "Active", plan: "Pro", applications: 12, location: "New York, NY" },
        { id: 2, name: "Tech Corp Ltd", email: "hr@techcorp.com", role: "employer", joinedDate: "2026-03-02", status: "Active", plan: "Enterprise", applications: 0, location: "San Francisco, CA" },
        { id: 3, name: "Mike Chen", email: "mike@email.com", role: "candidate", joinedDate: "2026-03-03", status: "Active", plan: "Free", applications: 5, location: "Remote" },
        { id: 4, name: "Creative Agency", email: "jobs@creative.com", role: "employer", joinedDate: "2026-03-04", status: "Active", plan: "Pro", applications: 0, location: "Chicago, IL" },
        { id: 5, name: "Emily Davis", email: "emily@email.com", role: "candidate", joinedDate: "2026-03-05", status: "Inactive", plan: "Free", applications: 3, location: "Austin, TX" },
        { id: 6, name: "Alex Kumar", email: "alex@email.com", role: "candidate", joinedDate: "2026-03-06", status: "Active", plan: "Pro", applications: 8, location: "Seattle, WA" },
        { id: 7, name: "StartupXYZ", email: "hr@startup.com", role: "employer", joinedDate: "2026-03-07", status: "Active", plan: "Pro", applications: 0, location: "Boston, MA" },
        { id: 8, name: "Priya Sharma", email: "priya@email.com", role: "candidate", joinedDate: "2026-03-08", status: "Active", plan: "Free", applications: 2, location: "Remote" },
        { id: 9, name: "InnovateCorp", email: "jobs@innovate.com", role: "employer", joinedDate: "2026-03-09", status: "Inactive", plan: "Enterprise", applications: 0, location: "Los Angeles, CA" },
        { id: 10, name: "James Wilson", email: "james@email.com", role: "candidate", joinedDate: "2026-03-10", status: "Active", plan: "Pro", applications: 15, location: "Denver, CO" },
      ]);
    }, 1000);
  });
};

// DELETE /admin/users/:id
export const deleteUser = async (userId) => {
  // const response = await api.delete(`/admin/users/${userId}`);
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, userId });
    }, 500);
  });
};

// GET /admin/jobs/all — full job list for admin
export const fetchAllAdminJobs = async () => {
  // const response = await api.get("/admin/jobs");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Senior React Developer", company: "Tech Corp Ltd", location: "Remote", type: "Full Time", postedDate: "2026-03-01", applicants: 45, status: "Active", employer: "hr@techcorp.com" },
        { id: 2, title: "UI/UX Designer", company: "Creative Agency", location: "New York, NY", type: "Full Time", postedDate: "2026-03-02", applicants: 32, status: "Active", employer: "jobs@creative.com" },
        { id: 3, title: "Backend Developer", company: "StartupXYZ", location: "San Francisco, CA", type: "Contract", postedDate: "2026-03-03", applicants: 28, status: "Active", employer: "hr@startup.com" },
        { id: 4, title: "Product Manager", company: "InnovateCorp", location: "Remote", type: "Full Time", postedDate: "2026-03-04", applicants: 67, status: "Active", employer: "jobs@innovate.com" },
        { id: 5, title: "DevOps Engineer", company: "Tech Corp Ltd", location: "Chicago, IL", type: "Full Time", postedDate: "2026-03-05", applicants: 19, status: "Closed", employer: "hr@techcorp.com" },
        { id: 6, title: "Data Scientist", company: "Creative Agency", location: "Remote", type: "Full Time", postedDate: "2026-03-06", applicants: 54, status: "Active", employer: "jobs@creative.com" },
        { id: 7, title: "Mobile Developer", company: "StartupXYZ", location: "Austin, TX", type: "Contract", postedDate: "2026-03-07", applicants: 23, status: "Active", employer: "hr@startup.com" },
        { id: 8, title: "QA Engineer", company: "InnovateCorp", location: "Boston, MA", type: "Full Time", postedDate: "2026-03-08", applicants: 11, status: "Flagged", employer: "jobs@innovate.com" },
      ]);
    }, 1000);
  });
};

// PUT /admin/jobs/:id/status
export const updateJobStatus = async (jobId, status) => {
  // const response = await api.put(`/admin/jobs/${jobId}/status`, { status });
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, jobId, status });
    }, 500);
  });
};

// GET /admin/analytics
export const fetchAnalytics = async () => {
  // const response = await api.get("/admin/analytics");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        userGrowth: [
          { month: "Oct", users: 820 },
          { month: "Nov", users: 940 },
          { month: "Dec", users: 1020 },
          { month: "Jan", users: 1100 },
          { month: "Feb", users: 1210 },
          { month: "Mar", users: 1284 },
        ],
        revenue: [
          { month: "Oct", amount: 18200 },
          { month: "Nov", amount: 21400 },
          { month: "Dec", amount: 23100 },
          { month: "Jan", amount: 24800 },
          { month: "Feb", amount: 26900 },
          { month: "Mar", amount: 28450 },
        ],
        roleDistribution: {
          candidates: 1098,
          employers: 186,
        },
        planDistribution: {
          free: 1043,
          pro: 187,
          enterprise: 54,
        },
        topLocations: [
          { city: "Remote", count: 312 },
          { city: "New York", count: 198 },
          { city: "San Francisco", count: 176 },
          { city: "Austin", count: 143 },
          { city: "Chicago", count: 128 },
        ],
        jobsByType: {
          fullTime: 198,
          contract: 87,
          partTime: 42,
          internship: 15,
        },
        dailyApplications: [42, 58, 71, 49, 63, 88, 52, 74, 91, 67, 83, 55, 78, 95],
      });
    }, 1200);
  });
};