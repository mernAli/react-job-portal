import { useState, useEffect } from "react";
import { fetchJobs } from "../../services/JobService";
import { useTheme } from "../../context/ThemeContext";
import Loader from "../../ui/Loader";
import { useToast } from "../../ui/toast/useToast";
import JobCard from "../../components/Jobs/JobCard";
import FilterPanel from "../../components/Jobs/FilterPanel";
import SidebarJobs from "../../components/Dashboard/SideBarJobs";
import { applyJob } from "../../services/JobService.js";
import useJobFilters from "../../hooks/useJobFilters.js";

const BrowseJobs = () => {
  const { theme } = useTheme();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("latest");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const { showToast } = useToast();

  // All filter logic handled by useJobFilters hook
  const {
    filters,
    filteredJobs,
    activeFilters,
    updateFilter,
    toggleArrayFilter,
    resetFilters,
    removeFilter,
  } = useJobFilters(jobs);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await fetchJobs();
      const transformedJobs = data.map((job) => ({
        id: job.slug,
        title: job.title,
        company: job.company_name,
        company_name: job.company_name,
        location: job.location,
        description: job.description,
        tags: job.tags || [],
        job_types: job.job_types || [],
        created_at: job.created_at,
        url: job.url,
        workMode: job.remote ? "remote" : "onsite",
        jobType: job.job_types?.[0] || "full-time",
        salary: `${Math.floor(Math.random() * 50 + 50)}k - ${Math.floor(Math.random() * 50 + 100)}k`,
        currency: "$",
        experience: ["Entry Level", "Mid Level", "Senior Level"][
          Math.floor(Math.random() * 3)
        ],
        skills: job.tags?.slice(0, 5) || [],
        postedDate: new Date(job.created_at * 1000).toISOString(),
      }));
      setJobs(transformedJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      showToast("Failed to load jobs", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    if (appliedJobs.includes(jobId)) {
      showToast("You have already applied to this job!", "info");
      return;
    }
    try {
      setAppliedJobs((prev) => [...prev, jobId]);
      const result = await applyJob(jobId, {
        jobId,
        jobTitle: job?.title,
        company: job?.company,
        appliedAt: new Date().toISOString(),
      });
      showToast(result.message, "success");
    } catch (error) {
      setAppliedJobs((prev) => prev.filter((id) => id !== jobId));
      showToast(error.message || "Failed to apply.", "error");
    }
  };

  const handleSave = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    showToast(`${job?.title} saved to your list`, "success");
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  // Sort filtered jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.postedDate) - new Date(a.postedDate);
      case "oldest":
        return new Date(a.postedDate) - new Date(b.postedDate);
      case "salary-high":
        return parseInt(b.salary?.split("-")[1] || 0) - parseInt(a.salary?.split("-")[1] || 0);
      case "salary-low":
        return parseInt(a.salary?.split("-")[0] || 0) - parseInt(b.salary?.split("-")[0] || 0);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <SidebarJobs />

      {/* Header — UNCHANGED */}
      <div className={`${theme.cardBg} p-4 md:p-6 rounded-xl ${theme.border} border mb-6`}>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>Browse Jobs</h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Discover {sortedJobs.length} opportunities that match your skills
        </p>
      </div>

      {/* Search and Sort Bar — UNCHANGED UI, wired to useJobFilters */}
      <div className={`${theme.cardBg} p-4 md:p-6 rounded-xl ${theme.border} border mb-6`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by job title, company, or location..."
                value={filters.keyword}
                onChange={(e) => updateFilter("keyword", e.target.value)}
                className={`w-full px-4 py-3 pl-10 ${theme.border} border rounded-lg ${theme.focus} ${theme.textPrimary} ${theme.cardBg} text-sm outline-none`}
              />
              <svg
                className={`w-5 h-5 ${theme.textMuted} absolute left-3 top-3.5`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="w-full md:w-48">
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className={`w-full px-4 py-3 ${theme.border} border rounded-lg ${theme.focus} ${theme.textPrimary} ${theme.cardBg} text-sm outline-none`}
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="salary-high">Salary: High to Low</option>
              <option value="salary-low">Salary: Low to High</option>
            </select>
          </div>
        </div>

        {/* Results Count — UNCHANGED */}
        <div className={`mt-4 text-sm ${theme.textSecondary}`}>
          Showing <span className="font-semibold">{sortedJobs.length}</span> of{" "}
          <span className="font-semibold">{jobs.length}</span> jobs
        </div>

        {/* Active Filter Chips — NEW */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {activeFilters.map((filter, index) => (
              <span
                key={index}
                className={`flex items-center gap-1 px-3 py-1 ${theme.infoBg} ${theme.infoText} rounded-full text-xs font-medium`}
              >
                {filter.label}
                <button
                  onClick={() => removeFilter(filter.key, filter.value)}
                  className="ml-1 hover:opacity-70"
                >
                  ×
                </button>
              </span>
            ))}
            <button
              onClick={resetFilters}
              className={`px-3 py-1 ${theme.dangerBg} ${theme.dangerText} rounded-full text-xs font-medium`}
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main Content — UNCHANGED UI */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FilterPanel
            filters={filters}
            onFilterChange={updateFilter}
            onToggleArray={toggleArrayFilter}
            onReset={resetFilters}
          />
        </div>

        <div className="lg:col-span-3">
          <div className="space-y-4">
            {sortedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={handleApply}
                onSave={handleSave}
                isApplied={appliedJobs.includes(job.id)}
              />
            ))}
          </div>

          {sortedJobs.length === 0 && (
            <div className={`${theme.cardBg} p-12 rounded-xl ${theme.border} border text-center`}>
              <p className={`${theme.textMuted} text-lg mb-2`}>
                No jobs found matching your criteria
              </p>
              <p className={`${theme.textMuted} text-sm mb-4`}>
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={resetFilters}
                className={`px-6 py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium`}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseJobs;