import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const MyApplications = () => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState("all");

  // Placeholder applications data
  const applications = [
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
  ];

  const filteredApplications =
    filter === "all"
      ? applications
      : applications.filter((app) => app.status.toLowerCase().includes(filter));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>My Applications</h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Track the status of your job applications
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
          <p className={`text-xs ${theme.textMuted} font-medium`}>Total</p>
          <h3 className={`text-2xl font-bold ${theme.textPrimary} mt-1`}>
            {applications.length}
          </h3>
        </div>
        <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
          <p className={`text-xs ${theme.textMuted} font-medium`}>Under Review</p>
          <h3 className={`text-2xl font-bold ${theme.warningText} mt-1`}>
            {applications.filter((a) => a.status === "Under Review").length}
          </h3>
        </div>
        <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
          <p className={`text-xs ${theme.textMuted} font-medium`}>Interviews</p>
          <h3 className={`text-2xl font-bold ${theme.infoText} mt-1`}>
            {
              applications.filter((a) => a.status === "Interview Scheduled")
                .length
            }
          </h3>
        </div>
        <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
          <p className={`text-xs ${theme.textMuted} font-medium`}>Offers</p>
          <h3 className={`text-2xl font-bold ${theme.successText} mt-1`}>
            {applications.filter((a) => a.status === "Offer Received").length}
          </h3>
        </div>
        <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
          <p className={`text-xs ${theme.textMuted} font-medium`}>Rejected</p>
          <h3 className={`text-2xl font-bold ${theme.dangerText} mt-1`}>
            {applications.filter((a) => a.status === "Rejected").length}
          </h3>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === "all"
                ? `${theme.primary} text-white`
                : `${theme.bg} ${theme.textPrimary} ${theme.hover}`
            }`}
          >
            All ({applications.length})
          </button>
          <button
            onClick={() => setFilter("under review")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === "under review"
                ? `${theme.warning} text-white`
                : `${theme.bg} ${theme.textPrimary} ${theme.hover}`
            }`}
          >
            Under Review
          </button>
          <button
            onClick={() => setFilter("interview")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === "interview"
                ? `${theme.info} text-white`
                : `${theme.bg} ${theme.textPrimary} ${theme.hover}`
            }`}
          >
            Interview Scheduled
          </button>
          <button
            onClick={() => setFilter("offer")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === "offer"
                ? `${theme.success} text-white`
                : `${theme.bg} ${theme.textPrimary} ${theme.hover}`
            }`}
          >
            Offer Received
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === "rejected"
                ? `${theme.danger} text-white`
                : `${theme.bg} ${theme.textPrimary} ${theme.hover}`
            }`}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div
            key={application.id}
            className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border ${theme.hover} transition-all`}
          >
            <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${theme.textPrimary}`}>
                  {application.jobTitle}
                </h3>
                <p className={`${theme.textSecondary} mt-1`}>{application.company}</p>

                <div className={`flex flex-wrap items-center gap-4 mt-3 text-sm ${theme.textMuted}`}>
                  <span>📍 {application.location}</span>
                  <span>💰 {application.salary}</span>
                  <span>📅 Applied: {application.appliedDate}</span>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    application.status === "Offer Received"
                      ? `${theme.successBg} ${theme.successText}`
                      : application.status === "Interview Scheduled"
                      ? `${theme.infoBg} ${theme.infoText}`
                      : application.status === "Rejected"
                      ? `${theme.dangerBg} ${theme.dangerText}`
                      : `${theme.warningBg} ${theme.warningText}`
                  }`}
                >
                  {application.status}
                </span>

                <div className="flex gap-2 w-full lg:w-auto">
                  <button className={`flex-1 lg:flex-none px-3 py-1.5 text-sm ${theme.primaryText} ${theme.border} border rounded-lg ${theme.hover} font-medium`}>
                    View Details
                  </button>
                  {application.status !== "Rejected" && (
                    <button className={`flex-1 lg:flex-none px-3 py-1.5 text-sm ${theme.dangerText} ${theme.border} border rounded-lg ${theme.hover} font-medium`}>
                      Withdraw
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredApplications.length === 0 && (
        <div className={`${theme.cardBg} p-12 rounded-xl ${theme.border} border text-center`}>
          <p className={`${theme.textMuted}`}>No applications found for this filter.</p>
        </div>
      )}
    </div>
  );
};

export default MyApplications;