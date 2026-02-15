import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, onApply, onSave, showActions = true }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div
      className={`${theme.cardBg} p-4 md:p-6 rounded-xl ${theme.border} border ${theme.hover} transition-all cursor-pointer`}
      onClick={() => navigate(`/app/jobs/${job.id}`)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Company Logo */}
          <div
            className={`w-12 h-12 md:w-14 md:h-14 ${theme.infoBg} rounded-lg flex items-center justify-center flex-shrink-0`}
          >
            <span className={`text-xl font-bold ${theme.infoText}`}>
              {job.company?.charAt(0) || job.company_name?.charAt(0) || "C"}
            </span>
          </div>

          {/* Job Info */}
          <div className="flex-1 min-w-0">
            <h3 className={`text-base md:text-lg font-semibold ${theme.textPrimary} mb-1 truncate`}>
              {job.title}
            </h3>
            <p className={`text-sm ${theme.textSecondary} truncate`}>
              {job.company || job.company_name}
            </p>
            <div className={`flex flex-wrap items-center gap-2 mt-2 text-xs ${theme.textMuted}`}>
              <span className="flex items-center gap-1">
                📍 {job.location}
              </span>
              {job.workMode && (
                <span className={`px-2 py-0.5 ${theme.infoBg} ${theme.infoText} rounded-full`}>
                  {job.workMode}
                </span>
              )}
              {job.jobType && (
                <span className={`px-2 py-0.5 ${theme.successBg} ${theme.successText} rounded-full`}>
                  {job.jobType}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bookmark Icon */}
        {showActions && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSave && onSave(job.id);
            }}
            className={`${theme.textMuted} hover:${theme.primaryText} transition-colors`}
          >
            🔖
          </button>
        )}
      </div>

      {/* Salary & Experience */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {job.salary && (
          <div className="flex items-center gap-2">
            <span className={`text-lg ${theme.successText}`}>💰</span>
            <span className={`text-sm font-semibold ${theme.textPrimary}`}>
              {job.currency || "$"} {job.salary}
            </span>
          </div>
        )}
        {job.experience && (
          <div className="flex items-center gap-2">
            <span className="text-lg">💼</span>
            <span className={`text-sm ${theme.textSecondary}`}>{job.experience}</span>
          </div>
        )}
        {job.postedDate && (
          <span className={`text-xs ${theme.textMuted}`}>
            Posted {getTimeAgo(job.postedDate)}
          </span>
        )}
      </div>

      {/* Skills/Tags */}
      {job.skills && job.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.slice(0, 5).map((skill, index) => (
            <span
              key={index}
              className={`px-3 py-1 ${theme.bg} ${theme.textSecondary} text-xs rounded-full font-medium`}
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 5 && (
            <span className={`px-3 py-1 ${theme.bg} ${theme.textMuted} text-xs rounded-full`}>
              +{job.skills.length - 5} more
            </span>
          )}
        </div>
      )}

      {/* Description Preview */}
      {job.description && (
        <p className={`text-sm ${theme.textSecondary} line-clamp-2 mb-4`}>
          {job.description}
        </p>
      )}

      {/* Actions */}
      {showActions && (
        <div className="flex gap-3 pt-4 border-t">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onApply && onApply(job.id);
            }}
            className={`flex-1 sm:flex-none px-6 py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium text-sm`}
          >
            Apply Now
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/app/jobs/${job.id}`);
            }}
            className={`flex-1 sm:flex-none px-6 py-2 ${theme.border} border rounded-lg ${theme.hover} font-medium text-sm`}
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );
};

export default JobCard;