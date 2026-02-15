import { useState, useEffect } from "react";
import { fetchJobs } from "../services/JobService";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/useAuth";
import Loader from "../ui/Loader";
import { useToast } from "../ui/toast/useToast";
import JobCard from "../components/Jobs/JobCard";

const Jobs = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const { showToast } = useToast();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await fetchJobs();

      // Transform API data
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
        experience: ["Entry Level", "Mid Level", "Senior Level"][Math.floor(Math.random() * 3)],
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

  const handleApply = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    showToast(`Applied to ${job?.title} successfully!`, "success");
  };

  const handleSave = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    showToast(`${job?.title} saved!`, "success");
  };

  const tabs = [
    { id: "all", label: "All Jobs", count: jobs.length },
    { id: "recommended", label: "Recommended", count: Math.floor(jobs.length / 3) },
    { id: "saved", label: "Saved", count: 0 },
  ];

  const filteredJobs = activeTab === "all" ? jobs : jobs.slice(0, Math.floor(jobs.length / 3));

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
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>
          Jobs for {user?.name}
        </h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Explore opportunities tailored to your profile
        </p>
      </div>

      {/* Tabs */}
      <div className={`${theme.cardBg} rounded-xl ${theme.border} border`}>
        <div className="flex border-b overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? `${theme.primaryText} border-b-2 ${theme.primaryBorder}`
                  : `${theme.textMuted} hover:${theme.textSecondary}`
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3">
        {["Remote", "Full Time", "Part Time", "Contract"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 ${theme.bg} ${theme.textSecondary} rounded-full text-sm font-medium ${theme.hover} transition-colors`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Job List */}
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

      {/* Load More */}
      {filteredJobs.length > 0 && (
        <div className="flex justify-center pt-4">
          <button
            className={`px-6 py-3 ${theme.border} border rounded-lg ${theme.hover} font-medium`}
          >
            Load More Jobs
          </button>
        </div>
      )}
    </div>
  );
};

export default Jobs;