import { memo, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

// ✅ Kept OUTSIDE component — pure function, no need to recreate
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

// ✅ memo — only re-renders when job, isApplied, or callbacks change
const JobCard = memo(({ job, onApply, onSave, showActions = true, isApplied = false }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // ✅ useCallback — stable references, don't recreate on every render
  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/app/jobs/${job.id}`, { state: { job } });
  };

  const handleCardClick = () => {
    navigate(`/app/jobs/${job.id}`, { state: { job } });
  };

  // 🌟 ACCESSIBILITY: Keyboard Interaction Handler for Entire Card Frame
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // Blocks unwanted page shifting when pressing Space bar
      handleCardClick();
    }
  };

  const handleSaveClick = useCallback((e) => {
    e.stopPropagation();
    onSave && onSave(job.id);
  }, [job.id, onSave]);

  const handleApplyClick = useCallback((e) => {
    e.stopPropagation();
    onApply && onApply(job.id);
  }, [job.id, onApply]);

  return (
    <div
      tabIndex={0} // 🌟 Focusable index container
      role="button" // 🌟 Identifies card element as an interactive button to readers
      aria-label={`Job opportunity: ${job.title} at ${job.company || job.company_name}. Location: ${job.location}. Status: ${isApplied ? "Applied" : "Not Applied"}.`}
      onKeyDown={handleKeyDown}
      className={`${theme.cardBg} p-4 md:p-6 rounded-xl ${theme.border} border ${theme.hover} transition-all cursor-pointer duration-200 ease-out 
        hover:-translate-y-1 hover:shadow-lg
        /* 🌟 PREMIUM CONTRAST FOCUS RINGS - Active ONLY during keyboard navigation */
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent`}
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Company Logo */}
          <div 
            className={`w-12 h-12 md:w-14 md:h-14 ${theme.infoBg} rounded-lg flex items-center justify-center flex-shrink-0`}
            aria-hidden="true" // 🌟 Structural fallback logic hides branding canvas from standard screen readers
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
              <span className="flex items-center gap-1" aria-label={`Location: ${job.location}`}>📍 {job.location}</span>
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

        {/* Bookmark */}
        {showActions && (
          <button 
            onClick={handleSaveClick} 
            aria-label={`Bookmark and save ${job.title} position`} // 🌟 Explicit label replaces raw emoji context
            className={`${theme.textMuted} ${theme.hover} p-1 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
          >
            🔖
          </button>
        )}
      </div>

      {/* Salary & Experience */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {job.salary && (
          <div className="flex items-center gap-2" aria-label={`Salary target: ${job.currency || "$"}${job.salary}`}>
            <span className={`text-lg ${theme.successText}`} aria-hidden="true">💰</span>
            <span className={`text-sm font-semibold ${theme.textPrimary}`}>
              {job.currency || "$"} {job.salary}
            </span>
          </div>
        )}
        {job.experience && (
          <div className="flex items-center gap-2" aria-label={`Experience requirement: ${job.experience}`}>
            <span className="text-lg" aria-hidden="true">💼</span>
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
        <div className="flex flex-wrap gap-2 mb-4" aria-label="Required technical skills">
          {job.skills.slice(0, 5).map((skill, index) => (
            <span key={index} className={`px-3 py-1 ${theme.bg} ${theme.textSecondary} text-xs rounded-full font-medium`}>
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
            onClick={handleApplyClick}
            disabled={isApplied}
            aria-live="polite" // 🌟 Forces immediate context announcements if the application status updates
            aria-label={isApplied ? `Application submitted for ${job.title}` : `Submit application for ${job.title}`}
            className={`flex-1 sm:flex-none px-6 py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium text-sm transition-transform duration-100 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-60`}
          >
            {isApplied ? "✓ Applied" : "Apply Now"}
          </button>
          <button
            onClick={handleViewDetails}
            aria-label={`View complete requirements and information for ${job.title}`}
            className={`flex-1 sm:flex-none px-6 py-2 ${theme.border} border rounded-lg ${theme.hover} font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );
});

JobCard.displayName = "JobCard";
export default JobCard;