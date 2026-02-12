import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/ThemeContext";
import StatCard from "../../components/Dashboard/StatCard";

const EmployerDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  // Placeholder statistics data
  const stats = [
    {
      title: "Total Jobs Posted",
      value: "24",
      icon: "💼",
      trend: "up",
      trendValue: "+3",
      colorType: "info",
    },
    {
      title: "Active Applications",
      value: "156",
      icon: "📄",
      trend: "up",
      trendValue: "+12",
      colorType: "success",
    },
    {
      title: "Hired Candidates",
      value: "8",
      icon: "✅",
      trend: "up",
      trendValue: "+2",
      colorType: "info",
    },
    {
      title: "Pending Reviews",
      value: "42",
      icon: "⏳",
      trend: "down",
      trendValue: "-5",
      colorType: "warning",
    },
  ];

  // Recent applications placeholder data
  const recentApplications = [
    {
      id: 1,
      candidateName: "John Doe",
      position: "Frontend Developer",
      appliedDate: "2026-02-08",
      status: "Under Review",
    },
    {
      id: 2,
      candidateName: "Sarah Johnson",
      position: "UI/UX Designer",
      appliedDate: "2026-02-07",
      status: "Shortlisted",
    },
    {
      id: 3,
      candidateName: "Mike Chen",
      position: "Backend Developer",
      appliedDate: "2026-02-06",
      status: "Interview Scheduled",
    },
    {
      id: 4,
      candidateName: "Emily Davis",
      position: "Product Manager",
      appliedDate: "2026-02-05",
      status: "Under Review",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>
          Welcome back, {user?.name}! 👋
        </h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Here's what's happening with your job postings today.
        </p>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Applications Table */}
      <div className={`${theme.cardBg} rounded-xl ${theme.border} border`}>
        <div className={`p-6 ${theme.border} border-b`}>
          <h2 className={`text-lg font-semibold ${theme.textPrimary}`}>
            Recent Applications
          </h2>
          <p className={`text-sm ${theme.textMuted} mt-1`}>
            Latest candidates who applied for your jobs
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={theme.bg}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Candidate
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Position
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Applied Date
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme.border}`}>
              {recentApplications.map((application) => (
                <tr key={application.id} className={theme.hover}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 ${theme.infoBg} rounded-full flex items-center justify-center ${theme.infoText} font-semibold`}>
                        {application.candidateName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm font-medium ${theme.textPrimary}`}>
                          {application.candidateName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${theme.textPrimary}`}>
                      {application.position}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${theme.textMuted}`}>
                      {application.appliedDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        application.status === "Shortlisted"
                          ? `${theme.successBg} ${theme.successText}`
                          : application.status === "Interview Scheduled"
                          ? `${theme.infoBg} ${theme.infoText}`
                          : `${theme.warningBg} ${theme.warningText}`
                      }`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className={`${theme.primaryText} hover:opacity-80 font-medium`}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${theme.primary} rounded-xl p-6 text-white`}>
          <h3 className="text-lg font-semibold mb-2">Post a New Job</h3>
          <p className="text-white/80 mb-4 text-sm">
            Start hiring by creating a new job posting
          </p>
          <button className={`bg-white ${theme.primaryText} px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors`}>
            Create Job Post
          </button>
        </div>

        <div className={`${theme.info} rounded-xl p-6 text-white`}>
          <h3 className="text-lg font-semibold mb-2">View All Applications</h3>
          <p className="text-white/80 mb-4 text-sm">
            Review and manage candidate applications
          </p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            View Applications
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;