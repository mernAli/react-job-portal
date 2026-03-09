import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "./useDebounce";

const useJobFilters = (jobs) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filters from URL params
  const [filters, setFilters] = useState({
    keyword: searchParams.get("keyword") || "",
    location: searchParams.get("location") || "",
    experience: searchParams.get("experience") || "",
    salary: searchParams.get("salary") || "",
    jobType: searchParams.get("jobType")?.split(",").filter(Boolean) || [],
    workMode: searchParams.get("workMode")?.split(",").filter(Boolean) || [],
  });

  // Debounce keyword and location (text inputs)
  const debouncedKeyword = useDebounce(filters.keyword, 400);
  const debouncedLocation = useDebounce(filters.location, 400);

  // Sync filters to URL params
  useEffect(() => {
    const params = {};
    if (filters.keyword) params.keyword = filters.keyword;
    if (filters.location) params.location = filters.location;
    if (filters.experience) params.experience = filters.experience;
    if (filters.salary) params.salary = filters.salary;
    if (filters.jobType.length > 0) params.jobType = filters.jobType.join(",");
    if (filters.workMode.length > 0) params.workMode = filters.workMode.join(",");
    setSearchParams(params, { replace: true });
  }, [filters]);

  // Update a single filter value
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Toggle checkbox filters (jobType, workMode)
  const toggleArrayFilter = (key, value) => {
    setFilters((prev) => {
      const current = prev[key];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      keyword: "",
      location: "",
      experience: "",
      salary: "",
      jobType: [],
      workMode: [],
    });
  };

  // Active filters for chips display
  const activeFilters = useMemo(() => {
    const active = [];
    if (debouncedKeyword) active.push({ key: "keyword", label: `Keyword: ${debouncedKeyword}` });
    if (debouncedLocation) active.push({ key: "location", label: `Location: ${debouncedLocation}` });
    if (filters.experience) active.push({ key: "experience", label: `Experience: ${filters.experience}` });
    if (filters.salary) active.push({ key: "salary", label: `Salary: ${filters.salary}` });
    filters.jobType.forEach((v) => active.push({ key: "jobType", value: v, label: `Type: ${v}` }));
    filters.workMode.forEach((v) => active.push({ key: "workMode", value: v, label: `Mode: ${v}` }));
    return active;
  }, [debouncedKeyword, debouncedLocation, filters]);

  // Remove a single active filter chip
  const removeFilter = (key, value) => {
    if (Array.isArray(filters[key])) {
      toggleArrayFilter(key, value);
    } else {
      updateFilter(key, "");
    }
  };

  // Apply all filters to jobs array
  const filteredJobs = useMemo(() => {
    if (!jobs.length) return [];

    return jobs.filter((job) => {
      // Keyword — uses debounced value
      if (debouncedKeyword) {
        const kw = debouncedKeyword.toLowerCase();
        const matchesKeyword =
          job.title?.toLowerCase().includes(kw) ||
          job.company?.toLowerCase().includes(kw) ||
          job.skills?.some((s) => s.toLowerCase().includes(kw)) ||
          job.tags?.some((t) => t.toLowerCase().includes(kw));
        if (!matchesKeyword) return false;
      }

      // Location — uses debounced value
      if (debouncedLocation) {
        if (!job.location?.toLowerCase().includes(debouncedLocation.toLowerCase()))
          return false;
      }

      // Experience
      if (filters.experience) {
        const expMap = {
          entry: "Entry Level",
          mid: "Mid Level",
          senior: "Senior Level",
        };
        if (job.experience !== expMap[filters.experience]) return false;
      }

      // Salary
      if (filters.salary) {
        const salaryMatch = job.salary?.match(/(\d+)k?\s*-\s*(\d+)k?/i);
        if (salaryMatch) {
          const jobMin = parseInt(salaryMatch[1]);
          const jobMax = parseInt(salaryMatch[2]);
          switch (filters.salary) {
            case "0-50k":
              if (jobMax > 50) return false;
              break;
            case "50k-100k":
              if (jobMin > 100 || jobMax < 50) return false;
              break;
            case "100k-150k":
              if (jobMin > 150 || jobMax < 100) return false;
              break;
            case "150k+":
              if (jobMax < 150) return false;
              break;
            default:
              break;
          }
        }
      }

      // Job Type
      if (filters.jobType.length > 0) {
        if (!filters.jobType.includes(job.jobType)) return false;
      }

      // Work Mode
      if (filters.workMode.length > 0) {
        if (!filters.workMode.includes(job.workMode)) return false;
      }

      return true;
    });
  }, [jobs, debouncedKeyword, debouncedLocation, filters]);

  return {
    filters,
    filteredJobs,
    activeFilters,
    updateFilter,
    toggleArrayFilter,
    resetFilters,
    removeFilter,
  };
};

export default useJobFilters;