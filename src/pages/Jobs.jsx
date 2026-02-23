import { useState, useEffect } from "react";
import { fetchJobs } from "../services/JobService";
import { useTheme } from "../context/ThemeContext";
import Loader from "../ui/Loader";
import { useToast } from "../ui/toast/useToast";
import SideBarJobs from "../components/Dashboard/SideBarJobs";
import PreferencesModal from "../components/Jobs/PreferencesModal";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const { theme } = useTheme();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [userPreferences, setUserPreferences] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { showToast } = useToast();

  const navigate = useNavigate()

  useEffect(() => {
    loadJobs();
    // Load saved preferences from localStorage
    const savedPreferences = localStorage.getItem('jobPreferences');
    if (savedPreferences) {
      const parsed = JSON.parse(savedPreferences);
      setUserPreferences(parsed);
    }
  }, []);

  useEffect(() => {
    // Apply preferences whenever they change
    if (userPreferences && jobs.length > 0) {
      applyPreferences();
    } else if (jobs.length > 0) {
      setFilteredJobs(jobs);
    }
  }, [userPreferences, jobs]);

  const loadJobs = async () => {
    try {
      setLoading(true);

      // Fetch and timer run in parallel
      const [data] = await Promise.all([
        fetchJobs(),
        new Promise((resolve) => setTimeout(resolve, 3000)),
      ]);

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
        experience: ["Entry Level", "Mid Level", "Senior Level"][
          Math.floor(Math.random() * 3)
        ],
        salary: `${Math.floor(Math.random() * 50 + 50)}k - ${Math.floor(Math.random() * 50 + 100)}k`,
        skills: job.tags?.slice(0, 5) || [],
        applicationDeadline: new Date(
          Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000,
        ).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        postedDate: new Date(job.created_at * 1000).toLocaleDateString(
          "en-US",
          { day: "numeric", month: "long", year: "numeric" },
        ),
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

  const applyPreferences = () => {
    if (!userPreferences) {
      setFilteredJobs(jobs);
      return;
    }

    let filtered = [...jobs];

    // Filter by job types
    if (userPreferences.jobTypes?.length > 0) {
      filtered = filtered.filter(job =>
        userPreferences.jobTypes.includes(job.jobType)
      );
    }

    // Filter by work modes
    if (userPreferences.workModes?.length > 0) {
      filtered = filtered.filter(job =>
        userPreferences.workModes.includes(job.workMode)
      );
    }

    // Filter by experience levels
    if (userPreferences.experienceLevels?.length > 0) {
      const experienceMap = {
        entry: "Entry Level",
        mid: "Mid Level",
        senior: "Senior Level",
      };
      filtered = filtered.filter(job =>
        userPreferences.experienceLevels.some(
          level => job.experience === experienceMap[level]
        )
      );
    }

    // Filter by salary range
    if (userPreferences.salaryRange?.min || userPreferences.salaryRange?.max) {
      filtered = filtered.filter(job => {
        const salaryMatch = job.salary?.match(/(\d+)k\s*-\s*(\d+)k/);
        if (!salaryMatch) return true;
        
        const jobMin = parseInt(salaryMatch[1]) * 1000;
        const jobMax = parseInt(salaryMatch[2]) * 1000;
        const prefMin = userPreferences.salaryRange.min ? parseInt(userPreferences.salaryRange.min) : 0;
        const prefMax = userPreferences.salaryRange.max ? parseInt(userPreferences.salaryRange.max) : Infinity;
        
        return jobMax >= prefMin && jobMin <= prefMax;
      });
    }

    // Filter by skills
    if (userPreferences.skills?.length > 0) {
      filtered = filtered.filter(job =>
        userPreferences.skills.some(skill =>
          job.skills?.some(jobSkill =>
            jobSkill.toLowerCase().includes(skill.toLowerCase())
          ) || job.tags?.some(tag =>
            tag.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    // Filter by locations
    if (userPreferences.locations?.length > 0) {
      filtered = filtered.filter(job =>
        userPreferences.locations.some(location =>
          job.location?.toLowerCase().includes(location.toLowerCase())
        )
      );
    }

    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to first page when preferences change
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      if (userPreferences) {
        applyPreferences();
      } else {
        setFilteredJobs(jobs);
      }
      return;
    }

    const baseJobs = userPreferences ? filteredJobs : jobs;
    const filtered = baseJobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(value.toLowerCase()) ||
        job.company?.toLowerCase().includes(value.toLowerCase()) ||
        job.location?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredJobs(filtered);
  };

  const handleSavePreferences = (preferences) => {
    setUserPreferences(preferences);
    localStorage.setItem('jobPreferences', JSON.stringify(preferences));
    showToast("Preferences saved successfully!", "success");
  };

  const handleClearPreferences = () => {
    setUserPreferences(null);
    localStorage.removeItem('jobPreferences');
    setFilteredJobs(jobs);
    setCurrentPage(1);
    showToast("Preferences cleared", "success");
  };

  const handleApply = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    navigate(`/app/jobs/${jobId}`, { state: { job } });
  };

  //  const handleCardClick = (job) => {
  //   // Pass job data through navigation state for immediate display
  //   navigate(`/app/jobs/${job.id}`, { state: { job } });
  // };


  const jobsPerPage = 5;
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader theme={theme} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Desktop Sidebar */}
      <SideBarJobs onPreferencesClick={() => setIsPreferencesOpen(true)} />
      
      {/* Preferences Modal */}
      <PreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        onSave={handleSavePreferences}
        initialPreferences={userPreferences}
      />

      {/* Mobile: Search Bar */}
      <div className="lg:hidden px-4 py-4 flex items-center gap-3 w-150 h-25 mb-10"> 
        <div className="text-3xl mr-3">🔎︎</div>
        <div className="flex-1 relative">
          
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className={`w-full text-center py-4 ${theme.cardBg} ${theme.textPrimary} rounded-3xl outline-none text-lg ${theme.shadow}`}
          />
        </div>

        <button 
          onClick={() => setIsPreferencesOpen(true)}
          className={`p-3 ${theme.cardBg} rounded-lg ${theme.shadow} flex-shrink-0`}
        >
          <svg
            className={`w-5 h-5 ${theme.textPrimary}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </button>
      </div>

      <div className="lg:flex lg:gap-6 lg:px-6">
        {/* Main Content */}
        <div className="flex-1 px-4 lg:px-0 lg:w-220 w-150">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <h1 className={`text-3xl lg:text-2xl font-bold ${theme.textPrimary}`}>
                  Top job picks for you
                </h1>
                {userPreferences && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-3 py-1 ${theme.infoBg} ${theme.infoText} rounded-full text-xs font-medium`}>
                      🎯 Preferences Active
                    </span>
                    <button
                      onClick={handleClearPreferences}
                      className={`text-xs ${theme.textMuted} ${theme.hover} underline`}
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
              <div className={`${theme.primary} ${theme.secondaryText} px-3 lg:px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium flex-shrink-0`}>
                page {currentPage} of {totalPages}
              </div>
            </div>
            <p className={`text-xl lg:text-base ${theme.textSecondary} mt-2`}>
              Based on your profile, preference, and recent activity
            </p>
          </div>

          {/* Job Cards */}
          <div className="space-y-4">
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                
                <div
                  key={job.id}
                  
                  className={`${theme.cardBg} rounded-xl ${theme.shadow} p-4 lg:p-6 transition-transform hover:scale-[1.01] lg:w-200 w-140`}
                >
                  <h3 className={`text-xl  lg:text-lg font-semibold ${theme.textPrimary} mb-3`}>
                    {job.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <span className={`text-lg lg:text-sm ${theme.textSecondary} min-w-[100px] lg:min-w-[140px]`}>
                        Job Type:
                      </span>
                      <span className={`text-lg lg:text-sm ${theme.textPrimary} font-medium`}>
                        {job.jobType}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className={`text-lg lg:text-sm ${theme.textSecondary} min-w-[100px] lg:min-w-[140px]`}>
                        Work Mode:
                      </span>
                      <span className={`text-lg lg:text-sm ${theme.textPrimary} font-medium`}>
                        {job.workMode}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className={`text-lg lg:text-sm ${theme.textSecondary} min-w-[100px] lg:min-w-[140px]`}>
                        Experience:
                      </span>
                      <span className={`text-lg lg:text-sm ${theme.textPrimary} font-medium`}>
                        {job.experience}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className={`text-lg lg:text-sm ${theme.textSecondary} min-w-[100px] lg:min-w-[140px]`}>
                        Application Deadline:
                      </span>
                      <span className={`text-lg lg:text-sm ${theme.textPrimary} font-medium`}>
                        {job.applicationDeadline}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleApply(job.id)}
                    className={`w-full lg:w-auto px-6 py-2.5 ${theme.primary} ${theme.secondaryText} rounded-lg ${theme.primaryHover} font-medium text-lg transition-colors`}
                  >
                    Apply Now
                  </button>

                  <p className={`text-xs ${theme.textMuted} mt-3`}>
                    Posted On: {job.postedDate}
                  </p>
                </div>
               
              ))
            ) : (
              <div className={`${theme.cardBg} p-12 rounded-xl ${theme.shadow} text-center`}>
                <div className="mb-4">
                  <svg className={`w-16 h-16 ${theme.textMuted} mx-auto`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className={`${theme.textPrimary} text-lg font-semibold mb-2`}>
                  No jobs found
                </p>
                <p className={`${theme.textMuted} text-sm mb-4`}>
                  {userPreferences 
                    ? "Try adjusting your preferences to see more opportunities"
                    : "Try adjusting your search"
                  }
                </p>
                {userPreferences && (
                  <button
                    onClick={handleClearPreferences}
                    className={`px-6 py-2 ${theme.primary} ${theme.secondaryText} rounded-lg ${theme.primaryHover} font-medium text-sm`}
                  >
                    Clear Preferences
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && currentJobs.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-8 w-full overflow-x-auto px-4 lg:px-0">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`flex-shrink-0 px-3 lg:px-4 py-2 ${theme.cardBg} ${theme.textPrimary} rounded-lg ${theme.hover} font-medium text-xs lg:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
              >
                Previous
              </button>

              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-lg font-medium text-xs lg:text-sm transition-colors ${
                      currentPage === index + 1
                        ? `${theme.primary} ${theme.secondaryText}`
                        : `${theme.cardBg} ${theme.textPrimary} ${theme.hover}`
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className={`flex-shrink-0 px-3 lg:px-4 py-2 ${theme.cardBg} ${theme.textPrimary} rounded-lg ${theme.hover} font-medium text-xs lg:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 ${theme.primary} border-t ${theme.border} z-50`}>
        <div className="flex items-center justify-around py-3 px-2">
          <button className="flex flex-col items-center gap-1 text-white opacity-60">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-[10px]">Home</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-white opacity-60">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="text-[10px]">My Network</span>
          </button>

          <button className="flex flex-col items-center gap-1 relative text-white opacity-60">
            <div className="relative">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
              </svg>
            </div>
          </button>

          <button className="flex flex-col items-center gap-1 text-white opacity-60">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span className="text-[10px]">Notification</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-white opacity-100">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
            <span className="text-[10px]">Jobs</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Jobs;