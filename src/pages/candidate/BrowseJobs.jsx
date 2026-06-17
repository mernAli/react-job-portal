import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchJobs } from "../../services/JobService";
import { useTheme } from "../../context/ThemeContext";
import Loader from "../../ui/Loader";
import { useToast } from "../../ui/toast/useToast";
import JobCard from "../../components/Jobs/JobCard";
import FilterPanel from "../../components/Jobs/FilterPanel";
import SidebarJobs from "../../components/Dashboard/SideBarJobs";
import { applyJob } from "../../services/JobService.js";
import useJobFilters from "../../hooks/useJobFilters.js";
import usePagination from "../../hooks/usePagination.js";
import useNotifications from "../../context/useNotifications.js";
import { NOTIF_TYPES } from "../../context/NotificationContext.jsx";
import useCache from "../../hooks/useCache.js";
import useAutoRefresh from "../../hooks/useAutoRefresh.js";
import {usePageTransition} from "../../components/ui/PageWrapper.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";

// Cache key for jobs data
const JOBS_CACHE_KEY = "browse-jobs";

const BrowseJobs = () => {
  const { theme } = useTheme();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("latest");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [lastRefreshed, setLastRefreshed] = useState(null);
  const { showToast } = useToast();
  const { addNotification } = useNotifications();

  const transitionRef = usePageTransition(); // Use the custom hook for page transition

  // Cache hook — jobs stay fresh for 60 seconds
  const { getCache, setCache, isFresh, invalidate } = useCache(60000);

  const {
    filters,
    filteredJobs,
    activeFilters,
    updateFilter,
    toggleArrayFilter,
    resetFilters,
    removeFilter,
  } = useJobFilters(jobs);

  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.postedDate) - new Date(a.postedDate);
        case "oldest":
          return new Date(a.postedDate) - new Date(b.postedDate);
        case "salary-high":
          return (
            parseInt(b.salary?.split("-")[1] || 0) -
            parseInt(a.salary?.split("-")[1] || 0)
          );
        case "salary-low":
          return (
            parseInt(a.salary?.split("-")[0] || 0) -
            parseInt(b.salary?.split("-")[0] || 0)
          );
        default:
          return 0;
      }
    });
  }, [filteredJobs, sortBy]);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    pageNumbers,
    itemsPerPage,
    setItemsPerPage,
    goToPage,
    goToNext,
    goToPrev,
    summaryText,
  } = usePagination(sortedJobs, 10);

  // ── Load jobs with cache check ─────────────────────────
  const loadJobs = useCallback(async (forceRefresh = false) => {
    // Serve from cache if fresh and not a forced refresh
    if (!forceRefresh && isFresh(JOBS_CACHE_KEY)) {
      const cached = getCache(JOBS_CACHE_KEY);
      if (cached) {
        setJobs(cached);
        setLoading(false);
        return;
      }
    }

    try {
      // Only show full loader on first load — background refreshes are silent
      if (jobs.length === 0) setLoading(true);

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

      // Store in cache
      setCache(JOBS_CACHE_KEY, transformedJobs);
      setJobs(transformedJobs);
      setLastRefreshed(new Date());
    } catch (error) {
      console.error("Error fetching jobs:", error);
      // Only show error toast on forced refresh — silent fail on background refresh
      if (forceRefresh || jobs.length === 0) {
        showToast("Failed to load jobs", "error");
      }
    } finally {
      setLoading(false);
    }
  }, [jobs.length, isFresh, getCache, setCache, showToast]);

  // Initial load
  useEffect(() => {
    loadJobs();
  }, []);

  // Auto-refresh every 60 seconds — background, silent
  useAutoRefresh(() => loadJobs(true), 60000);

  // ── Manual refresh ─────────────────────────────────────
  const handleManualRefresh = () => {
    invalidate(JOBS_CACHE_KEY);
    loadJobs(true);
    showToast("Jobs refreshed", "info");
  };

  // ── Apply ──────────────────────────────────────────────
  const handleApply = useCallback(async (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    if (appliedJobs.includes(jobId)) {
      showToast("You have already applied to this job!", "info");
      return;
    }
    try {
      // Optimistic update
      setAppliedJobs((prev) => [...prev, jobId]);
      const result = await applyJob(jobId, {
        jobId,
        jobTitle: job?.title,
        company: job?.company,
        appliedAt: new Date().toISOString(),
      });
      showToast(result.message, "success");
      addNotification(
        NOTIF_TYPES.JOB_APPLIED,
        "Application Submitted",
        `You successfully applied for ${job?.title} at ${job?.company}.`
      );
    } catch (error) {
      // Revert on failure
      setAppliedJobs((prev) => prev.filter((id) => id !== jobId));
      showToast(error.message || "Failed to apply.", "error");
    }
  }, [jobs, appliedJobs, showToast, addNotification]);

  const handleSave = useCallback((jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    showToast(`${job?.title} saved to your list`, "success");
  }, [jobs, showToast]);

  const handleSort = useCallback((value) => {
    setSortBy(value);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    
    <div ref={transitionRef}>
      <SidebarJobs />

      {/* Header */}
      <div className={`${theme.cardBg} p-4 md:p-6 rounded-xl ${theme.border} border mb-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>Browse Jobs</h1>
            <p className={`${theme.textSecondary} mt-2`}>
              Discover {sortedJobs.length} opportunities that match your skills
            </p>
          </div>
          {/* Manual refresh button + last updated time */}
          <div className="flex flex-col items-end gap-1">
            <button
              onClick={handleManualRefresh}
              className={`px-3 py-1.5 text-xs ${theme.border} border rounded-lg ${theme.hover} ${theme.textSecondary} flex items-center gap-1`}
            >
              🔄 Refresh
            </button>
            {lastRefreshed && (
              <span className={`text-xs ${theme.textMuted}`}>
                Updated {lastRefreshed.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Search and Sort Bar */}
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

        {/* Results Count + Page Size */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
          <div className={`text-sm ${theme.textSecondary}`}>{summaryText}</div>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${theme.textMuted}`}>Per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className={`px-2 py-1 ${theme.border} border rounded-lg ${theme.textPrimary} ${theme.cardBg} text-sm outline-none`}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {activeFilters.map((filter, index) => (
              <span
                key={index}
                className={`flex items-center gap-1 px-3 py-1 ${theme.infoBg} ${theme.infoText} rounded-full text-xs font-medium`}
              >
                {filter.label}
                <button onClick={() => removeFilter(filter.key, filter.value)} className="ml-1 hover:opacity-70">×</button>
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

      {/* Main Content */}
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
            {paginatedItems.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={handleApply}
                onSave={handleSave}
                isApplied={appliedJobs.includes(job.id)}
              />
            ))}
          </div>

          {/* Empty State */}
          {/* {sortedJobs.length === 0 && (
            <div className={`${theme.cardBg} p-12 rounded-xl ${theme.border} border text-center`}>
              <div className="text-5xl mb-4">🔍</div>
              <h3 className={`text-lg font-semibold ${theme.textPrimary} mb-2`}>No jobs found</h3>
              <p className={`${theme.textMuted} text-sm mb-2`}>No results for your current filters. Try:</p>
              <ul className={`text-sm ${theme.textMuted} mb-6 space-y-1`}>
                <li>• Using fewer or broader keywords</li>
                <li>• Removing the location filter</li>
                <li>• Selecting a different experience level</li>
                <li>• Expanding the salary range</li>
              </ul>
              <button
                onClick={resetFilters}
                className={`px-6 py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium`}
              >
                Clear All Filters
              </button>
            </div>
          )} */}

          {sortedJobs.length === 0 && (
            <EmptyState 
              message="No jobs found matching your search"
              description="Try altering your search keywords, broadening your location criteria, or clearing selected filters."
              buttonText="Clear All Filters"
              onButtonClick={resetFilters}
            />
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <button
                onClick={goToPrev}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${theme.border} border ${theme.textPrimary} ${theme.hover} disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                ← Prev
              </button>

              {pageNumbers[0] > 1 && (
                <>
                  <button onClick={() => goToPage(1)} className={`w-9 h-9 rounded-lg text-sm font-medium ${theme.border} border ${theme.textPrimary} ${theme.hover}`}>1</button>
                  {pageNumbers[0] > 2 && <span className={`px-1 ${theme.textMuted}`}>...</span>}
                </>
              )}

              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                    page === currentPage
                      ? `${theme.primary} text-white`
                      : `${theme.border} border ${theme.textPrimary} ${theme.hover}`
                  }`}
                >
                  {page}
                </button>
              ))}

              {pageNumbers[pageNumbers.length - 1] < totalPages && (
                <>
                  {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span className={`px-1 ${theme.textMuted}`}>...</span>}
                  <button onClick={() => goToPage(totalPages)} className={`w-9 h-9 rounded-lg text-sm font-medium ${theme.border} border ${theme.textPrimary} ${theme.hover}`}>{totalPages}</button>
                </>
              )}

              <button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${theme.border} border ${theme.textPrimary} ${theme.hover} disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                Next →
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <p className={`text-center text-sm ${theme.textMuted} mt-3`}>
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default BrowseJobs;