import { useState, useEffect } from "react";
import { fetchJobs } from "../../services/JobService";
import { useTheme } from "../../context/ThemeContext";
import Loader from "../../ui/Loader";
import { useToast } from "../../ui/toast/useToast";

const BrowseJobs = () => {
  const { theme } = useTheme();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    loadJobs();
  }, []);

  // At the top, add this style tag or import CSS

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await fetchJobs();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      showToast("Failed to load jobs", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (jobId, jobTitle) => {
    showToast(`Applied to ${jobTitle} successfully!`, "success");
    console.log("Applied to job:", jobId);
  };

  const handleSave = (jobId, jobTitle) => {
    showToast(`${jobTitle} saved to your list`, "success");
    console.log("Saved job:", jobId);
  };

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      !locationFilter ||
      job.location?.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesJobType =
      !jobTypeFilter ||
      job.job_types?.some((type) =>
        type.toLowerCase().includes(jobTypeFilter.toLowerCase()),
      );

    return matchesSearch && matchesLocation && matchesJobType;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border w-78 sm:w-150 lg:w-full`}>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>
          Browse Jobs
        </h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Discover opportunities that match your skills
        </p>
      </div>

      {/* Search and Filters */}
      <div
        className={`${theme.cardBg} p-4 lg:p-6 rounded-xl ${theme.border} border w-78 sm:w-150 lg:w-full`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by job title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`px-4 py-3 ${theme.border} border rounded-lg ${theme.focus} ${theme.textPrimary} ${theme.cardBg} text-sm outline-none`}
          />

          {/* Location Filter */}
          <input
            type="text"
            placeholder="Filter by location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className={`px-4 py-3 ${theme.border} border rounded-lg ${theme.focus} ${theme.textPrimary} ${theme.cardBg} text-sm outline-none`}
          />

          {/* Job Type Filter */}
          <select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            className={`px-4 py-3 ${theme.border} border rounded-lg ${theme.focus} ${theme.textPrimary} ${theme.cardBg} text-sm outline-none`}
          >
            <option value="">All Job Types</option>
            <option value="full">Full Time</option>
            <option value="part">Part Time</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
          </select>
        </div>

        {/* Results Count */}
        <div className={`mt-4 text-sm ${theme.textSecondary}`}>
          Showing <span className="font-semibold">{filteredJobs.length}</span>{" "}
          jobs
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4 w-78 sm:w-150 lg:w-240">
        {filteredJobs.map((job) => (
          <div
            key={job.slug}
            className={`${theme.cardBg} p-4 md:p-6 rounded-xl ${theme.border} border ${theme.hover} transition-all`}
          >
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <h3
                  className={`text-base md:text-lg font-semibold ${theme.textPrimary}`}
                >
                  {job.title}
                </h3>
                <p
                  className={`${theme.textSecondary} mt-1 text-sm md:text-base`}
                >
                  {job.company_name}
                </p>

                <div
                  className={`flex flex-wrap items-center gap-2 md:gap-4 mt-3 text-xs md:text-sm ${theme.textMuted}`}
                >
                  <span className="flex items-center gap-1">
                    📍{" "}
                    <span className="truncate max-w-[150px] md:max-w-none">
                      {job.location}
                    </span>
                  </span>
                  {job.job_types && job.job_types.length > 0 && (
                    <span>⏰ {job.job_types.join(", ")}</span>
                  )}
                  {job.created_at && (
                    <span className="hidden sm:inline">
                      📅 Posted:{" "}
                      {new Date(job.created_at * 1000).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Tags */}
                {job.tags && job.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 job-tags">
                    {job.tags.slice(0, 5).map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 md:px-3 py-1 ${theme.infoBg} ${theme.infoText} text-xs rounded-full font-medium`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description Preview */}
                {job.description && (
                  <p
                    className={`text-xs md:text-sm ${theme.textSecondary} mt-3 line-clamp-2`}
                  >
                    {job.description}
                  </p>
                )}
              </div>

              {/* Actions - Stacked on mobile */}
              <div className="flex flex-col sm:flex-row gap-2 job-card-actions">
                <button
                  onClick={() => handleApply(job.slug, job.title)}
                  className={`px-4 py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium text-sm w-full sm:w-auto`}
                >
                  Apply Now
                </button>
                <button
                  onClick={() => handleSave(job.slug, job.title)}
                  className={`px-4 py-2 ${theme.border} border ${theme.textPrimary} rounded-lg ${theme.hover} font-medium text-sm w-full sm:w-auto`}
                >
                  Save Job
                </button>
                {job.url && (
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 ${theme.primaryText} text-sm text-center ${theme.hover} rounded-lg font-medium w-full sm:w-auto`}
                  >
                    View Details →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div
          className={`${theme.cardBg} p-12 rounded-xl ${theme.border} border text-center`}
        >
          <p className={`${theme.textMuted} text-lg`}>
            No jobs found matching your filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setLocationFilter("");
              setJobTypeFilter("");
            }}
            className={`mt-4 px-4 py-2 ${theme.primaryText} font-medium ${theme.hover} rounded-lg`}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default BrowseJobs;
