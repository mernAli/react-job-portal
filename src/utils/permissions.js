// Central permission system — single source of truth for all role checks

export const ROLES = {
  ADMIN: "admin",
  EMPLOYER: "employer",
  CANDIDATE: "candidate",
};

// Role-based dashboard paths
export const getDashboardPath = (role) => {
  switch (role) {
    case ROLES.ADMIN:     return "/app/admin-dashboard";
    case ROLES.EMPLOYER:  return "/app/employer-dashboard";
    case ROLES.CANDIDATE: return "/app/candidate-dashboard";
    default:              return "/app/home";
  }
};

// Permission checks — use these everywhere instead of role string comparisons
export const getPermissions = (user) => ({
  // Job permissions
  canPostJob:        ["employer", "admin"].includes(user?.role),
  canBrowseJobs:     ["candidate", "admin"].includes(user?.role),
  canApplyJob:       user?.role === "candidate",
  canViewATS:        ["employer", "admin"].includes(user?.role),
  canManageJobs:     ["employer", "admin"].includes(user?.role),

  // Dashboard permissions
  canViewAdminDash:     user?.role === "admin",
  canViewEmployerDash:  ["employer", "admin"].includes(user?.role),
  canViewCandidateDash: ["candidate", "admin"].includes(user?.role),

  // Admin only
  canManageUsers:    user?.role === "admin",
  canViewAllData:    user?.role === "admin",
  canManagePayments: user?.role === "admin",

  // Profile
  canUploadResume:   user?.role === "candidate",
  canViewPricing:    ["employer", "candidate"].includes(user?.role),
});