import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/ThemeContext";
import StatCard from "../../components/Dashboard/StatCard";

const CandidateDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  // Placeholder statistics data
  const stats = [
    {
      title: "Jobs Applied",
      value: "12",
      icon: "📋",
      trend: "up",
      trendValue: "+3",
      colorType: "info",
    },
    {
      title: "Profile Views",
      value: "48",
      icon: "👁️",
      trend: "up",
      trendValue: "+8",
      colorType: "success",
    },
    {
      title: "Saved Jobs",
      value: "7",
      icon: "⭐",
      trend: "down",
      trendValue: "-2",
      colorType: "warning",
    },
    {
      title: "Interview Invites",
      value: "3",
      icon: "📅",
      trend: "up",
      trendValue: "+1",
      colorType: "info",
    },
  ];

  // Recent applications placeholder data
  const recentApplications = [
    {
      id: 1,
      jobTitle: "Senior React Developer",
      company: "Tech Solutions Inc.",
      appliedDate: "2026-02-08",
      status: "Under Review",
    },
    {
      id: 2,
      jobTitle: "Frontend Engineer",
      company: "StartupXYZ",
      appliedDate: "2026-02-06",
      status: "Interview Scheduled",
    },
    {
      id: 3,
      jobTitle: "Full Stack Developer",
      company: "InnovateCorp",
      appliedDate: "2026-02-04",
      status: "Rejected",
    },
  ];

  // Recommended jobs placeholder data
  const recommendedJobs = [
    {
      id: 1,
      title: "React Developer",
      company: "Creative Agency",
      location: "Remote",
      type: "Full Time",
      salary: "$80k - $120k",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Design Studio",
      location: "New York, NY",
      type: "Full Time",
      salary: "$70k - $100k",
    },
    {
      id: 3,
      title: "Product Manager",
      company: "Tech Ventures",
      location: "San Francisco, CA",
      type: "Full Time",
      salary: "$100k - $150k",
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
          Track your applications and discover new opportunities.
        </p>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications - Left Side (2 columns) */}
        <div className={`lg:col-span-2 ${theme.cardBg} rounded-xl ${theme.border} border`}>
          <div className={`p-6 ${theme.border} border-b`}>
            <h2 className={`text-lg font-semibold ${theme.textPrimary}`}>
              Recent Applications
            </h2>
            <p className={`text-sm ${theme.textMuted} mt-1`}>
              Your latest job applications
            </p>
          </div>

          <div className={`divide-y ${theme.border}`}>
            {recentApplications.map((application) => (
              <div
                key={application.id}
                className={`p-6 ${theme.hover} transition-colors`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`font-semibold ${theme.textPrimary}`}>
                      {application.jobTitle}
                    </h3>
                    <p className={`text-sm ${theme.textSecondary} mt-1`}>
                      {application.company}
                    </p>
                    <p className={`text-xs ${theme.textMuted} mt-2`}>
                      Applied: {application.appliedDate}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      application.status === "Interview Scheduled"
                        ? `${theme.infoBg} ${theme.infoText}`
                        : application.status === "Rejected"
                        ? `${theme.dangerBg} ${theme.dangerText}`
                        : `${theme.warningBg} ${theme.warningText}`
                    }`}
                  >
                    {application.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={`p-4 ${theme.border} border-t`}>
            <button className={`w-full py-2 text-sm ${theme.primaryText} font-medium ${theme.hover} rounded-lg transition-colors`}>
              View All Applications →
            </button>
          </div>
        </div>

        {/* Recommended Jobs - Right Side (1 column) */}
        <div className={`${theme.cardBg} rounded-xl ${theme.border} border`}>
          <div className={`p-6 ${theme.border} border-b`}>
            <h2 className={`text-lg font-semibold ${theme.textPrimary}`}>
              Recommended for You
            </h2>
            <p className={`text-sm ${theme.textMuted} mt-1`}>Based on your profile</p>
          </div>

          <div className={`divide-y ${theme.border}`}>
            {recommendedJobs.map((job) => (
              <div key={job.id} className={`p-4 ${theme.hover} transition-colors`}>
                <h3 className={`font-semibold ${theme.textPrimary} text-sm`}>
                  {job.title}
                </h3>
                <p className={`text-xs ${theme.textSecondary} mt-1`}>{job.company}</p>
                <div className={`flex items-center gap-2 mt-2 text-xs ${theme.textMuted}`}>
                  <span>📍 {job.location}</span>
                </div>
                <p className={`text-xs ${theme.successText} font-semibold mt-2`}>
                  {job.salary}
                </p>
                <button className={`w-full mt-3 py-2 text-xs ${theme.primary} text-white rounded-lg ${theme.primaryHover} transition-colors font-medium`}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Completion */}
      <div className={`${theme.primary} rounded-xl p-6 text-white`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Complete Your Profile
            </h3>
            <p className="text-white/80 text-sm">
              A complete profile increases your chances of getting hired by 40%
            </p>
          </div>
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="text-right">
              <div className="text-3xl font-bold">75%</div>
              <div className="text-xs text-white/70">Complete</div>
            </div>
            <button className={`bg-white ${theme.primaryText} px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap`}>
              Update Profile
            </button>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="mt-4 bg-white/30 rounded-full h-2">
          <div className="bg-white h-2 rounded-full" style={{ width: "75%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;