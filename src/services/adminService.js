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