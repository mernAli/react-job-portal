import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const Applications = () => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState("all");

  // Placeholder applications data
  const applications = [
    {
      id: 1,
      candidateName: "John Doe",
      email: "john.doe@email.com",
      position: "Senior React Developer",
      appliedDate: "2026-02-08",
      status: "Under Review",
      experience: "5 years",
      phone: "+1 234 567 8901",
    },
    {
      id: 2,
      candidateName: "Sarah Johnson",
      email: "sarah.j@email.com",
      position: "UI/UX Designer",
      appliedDate: "2026-02-07",
      status: "Shortlisted",
      experience: "3 years",
      phone: "+1 234 567 8902",
    },
    {
      id: 3,
      candidateName: "Mike Chen",
      email: "mike.chen@email.com",
      position: "Backend Developer",
      appliedDate: "2026-02-06",
      status: "Interview Scheduled",
      experience: "4 years",
      phone: "+1 234 567 8903",
    },
    {
      id: 4,
      candidateName: "Emily Davis",
      email: "emily.d@email.com",
      position: "Product Manager",
      appliedDate: "2026-02-05",
      status: "Rejected",
      experience: "6 years",
      phone: "+1 234 567 8904",
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
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>Applications</h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Review and manage candidate applications
        </p>
      </div>

      {/* Filter Buttons - Responsive */}
      <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
        <div className="flex gap-2 lg:gap-3 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-colors ${
              filter === "all"
                ? `${theme.primary} text-white`
                : `${theme.bg} ${theme.textPrimary} ${theme.hover}`
            }`}
          >
            All ({applications.length})
          </button>
          <button
            onClick={() => setFilter("under review")}
            className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-colors ${
              filter === "under review"
                ? `${theme.warning} text-white`
                : `${theme.bg} ${theme.textPrimary} ${theme.hover}`
            }`}
          >
            <span className="hidden sm:inline">Under Review</span>
            <span className="sm:hidden">Review</span>
          </button>
          <button
            onClick={() => setFilter("shortlisted")}
            className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-colors ${
              filter === "shortlisted"
                ? `${theme.success} text-white`
                : `${theme.bg} ${theme.textPrimary} ${theme.hover}`
            }`}
          >
            Shortlisted
          </button>
          <button
            onClick={() => setFilter("interview")}
            className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-colors ${
              filter === "interview"
                ? `${theme.info} text-white`
                : `${theme.bg} ${theme.textPrimary} ${theme.hover}`
            }`}
          >
            <span className="hidden sm:inline">Interview</span>
            <span className="sm:hidden">Int.</span>
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-colors ${
              filter === "rejected"
                ? `${theme.danger} text-white`
                : `${theme.bg} ${theme.textPrimary} ${theme.hover}`
            }`}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* Applications List - Mobile Optimized */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div
            key={application.id}
            className={`${theme.cardBg} p-4 lg:p-6 rounded-xl ${theme.border} border ${theme.hover} transition-all`}
          >
            <div className="flex flex-col gap-4">
              {/* Header Section */}
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className={`w-12 h-12 ${theme.infoBg} rounded-full flex items-center justify-center ${theme.infoText} font-semibold text-lg flex-shrink-0`}>
                  {application.candidateName.charAt(0)}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className={`text-base lg:text-lg font-semibold ${theme.textPrimary} truncate`}>
                      {application.candidateName}
                    </h3>
                    {/* Status Badge - Mobile */}
                    <span
                      className={`lg:hidden px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                        application.status === "Shortlisted"
                          ? `${theme.successBg} ${theme.successText}`
                          : application.status === "Interview Scheduled"
                          ? `${theme.infoBg} ${theme.infoText}`
                          : application.status === "Rejected"
                          ? `${theme.dangerBg} ${theme.dangerText}`
                          : `${theme.warningBg} ${theme.warningText}`
                      }`}
                    >
                      {application.status === "Interview Scheduled" ? "Interview" : application.status}
                    </span>
                  </div>

                  <p className={`text-sm ${theme.textSecondary} mb-2`}>
                    Applied for: <span className="font-medium">{application.position}</span>
                  </p>

                  {/* Contact Info - Responsive Grid */}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs lg:text-sm ${theme.textMuted}`}>
                    <span className="flex items-center gap-1 truncate">
                      <span>📧</span>
                      <span className="truncate">{application.email}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>📞</span>
                      <span>{application.phone}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>💼</span>
                      <span>{application.experience}</span>
                    </span>
                  </div>

                  <p className={`text-xs ${theme.textMuted} mt-2`}>
                    Applied on: {application.appliedDate}
                  </p>
                </div>
              </div>

              {/* Actions Section */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Status Badge - Desktop */}
                <span
                  className={`hidden lg:inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    application.status === "Shortlisted"
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

                {/* Action Buttons - Responsive */}
                <div className="flex gap-2 flex-1 lg:flex-none lg:ml-auto">
                  <button className={`flex-1 sm:flex-none px-3 py-2 text-xs lg:text-sm ${theme.primaryText} ${theme.border} border rounded-lg ${theme.hover} font-medium whitespace-nowrap`}>
                    View Resume
                  </button>
                  <button className={`flex-1 sm:flex-none px-3 py-2 text-xs lg:text-sm ${theme.successText} ${theme.border} border rounded-lg ${theme.hover} font-medium whitespace-nowrap`}>
                    Shortlist
                  </button>
                  <button className={`flex-1 sm:flex-none px-3 py-2 text-xs lg:text-sm ${theme.dangerText} ${theme.border} border rounded-lg ${theme.hover} font-medium whitespace-nowrap`}>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredApplications.length === 0 && (
        <div className={`${theme.cardBg} p-12 rounded-xl ${theme.border} border text-center`}>
          <p className={theme.textMuted}>No applications found for this filter.</p>
        </div>
      )}
    </div>
  );
};

export default Applications;