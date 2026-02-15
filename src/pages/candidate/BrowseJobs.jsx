import { useState, useEffect } from "react";
import { fetchJobs } from "../../services/JobService";
import { useTheme } from "../../context/ThemeContext";
import Loader from "../../ui/Loader";
import { useToast } from "../../ui/toast/useToast";
import JobCard from "../../components/Jobs/JobCard";
import FilterPanel from "../../components/Jobs/FilterPanel";

const BrowseJobs = () => {
  const { theme } = useTheme();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const { showToast } = useToast();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await fetchJobs();
      
      // Transform API data to match our structure
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
        // Add simulated fields for demo
        workMode: job.remote ? "remote" : "onsite",
        jobType: job.job_types?.[0] || "full-time",
        salary: `${Math.floor(Math.random() * 50 + 50)}k - ${Math.floor(Math.random() * 50 + 100)}k`,
        currency: "$",
        experience: ["Entry Level", "Mid Level", "Senior Level"][Math.floor(Math.random() * 3)],
        skills: job.tags?.slice(0, 5) || [],
        postedDate: new Date(job.created_at * 1000).toISOString(),
      }));

      setJobs(transformedJobs);
      setFilteredJobs(transformedJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      showToast("Failed to load jobs", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    showToast(`Applied to ${job?.title} successfully!`, "success");
  };

  const handleSave = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    showToast(`${job?.title} saved to your list`, "success");
  };

  const handleFilterChange = (filters) => {
    let filtered = [...jobs];

    // Search term
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Location
    if (filters.location) {
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Job Type
    if (filters.jobType.length > 0) {
      filtered = filtered.filter((job) =>
        filters.jobType.includes(job.jobType)
      );
    }

    // Work Mode
    if (filters.workMode.length > 0) {
      filtered = filtered.filter((job) =>
        filters.workMode.includes(job.workMode)
      );
    }

    // Experience Level
    if (filters.experienceLevel.length > 0) {
      const experienceMap = {
        entry: "Entry Level",
        mid: "Mid Level",
        senior: "Senior Level",
      };
      filtered = filtered.filter((job) =>
        filters.experienceLevel.some(
          (level) => job.experience === experienceMap[level]
        )
      );
    }

    setFilteredJobs(filtered);
    showToast(`Found ${filtered.length} jobs`, "success");
  };

  const handleResetFilters = () => {
    setFilteredJobs(jobs);
    setSearchTerm("");
    showToast("Filters reset", "success");
  };

  const handleSort = (value) => {
    setSortBy(value);
    let sorted = [...filteredJobs];

    switch (value) {
      case "latest":
        sorted.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      case "oldest":
        sorted.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
        break;
      case "salary-high":
        sorted.sort((a, b) => {
          const aMax = parseInt(a.salary.split("-")[1]);
          const bMax = parseInt(b.salary.split("-")[1]);
          return bMax - aMax;
        });
        break;
      case "salary-low":
        sorted.sort((a, b) => {
          const aMin = parseInt(a.salary.split("-")[0]);
          const bMin = parseInt(b.salary.split("-")[0]);
          return aMin - bMin;
        });
        break;
      default:
        break;
    }

    setFilteredJobs(sorted);
  };

  // Search handler
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      setFilteredJobs(jobs);
      return;
    }

    const filtered = jobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(value.toLowerCase()) ||
        job.company?.toLowerCase().includes(value.toLowerCase()) ||
        job.location?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredJobs(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className={`${theme.cardBg} p-4 md:p-6 rounded-xl ${theme.border} border mb-6`}>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>Browse Jobs</h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Discover {filteredJobs.length} opportunities that match your skills
        </p>
      </div>

      {/* Search and Sort Bar */}
      <div className={`${theme.cardBg} p-4 md:p-6 rounded-xl ${theme.border} border mb-6`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by job title, company, or location..."
                value={searchTerm}
                onChange={handleSearch}
                className={`w-full px-4 py-3 pl-10 ${theme.border} border rounded-lg ${theme.focus} ${theme.textPrimary} ${theme.cardBg} text-sm outline-none`}
              />
              <svg
                className={`w-5 h-5 ${theme.textMuted} absolute left-3 top-3.5`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Sort */}
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

        {/* Results Count */}
        <div className={`mt-4 text-sm ${theme.textSecondary}`}>
          Showing <span className="font-semibold">{filteredJobs.length}</span> of{" "}
          <span className="font-semibold">{jobs.length}</span> jobs
        </div>
      </div>

      {/* Main Content: Filter Panel + Job List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Panel - Left Sidebar */}
        <div className="lg:col-span-1">
          <FilterPanel
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Job List - Main Area */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={handleApply}
                onSave={handleSave}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <div className={`${theme.cardBg} p-12 rounded-xl ${theme.border} border text-center`}>
              <p className={`${theme.textMuted} text-lg mb-2`}>
                No jobs found matching your criteria
              </p>
              <p className={`${theme.textMuted} text-sm mb-4`}>
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={handleResetFilters}
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