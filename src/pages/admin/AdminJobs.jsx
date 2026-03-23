import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../ui/toast/useToast";
import Loader from "../../ui/Loader";
import ApiError from "../../ui/ApiError";
import Sidebar from "../../components/Dashboard/Sidebar";
import { fetchAllAdminJobs, updateJobStatus } from "../../services/adminService";
import usePagination from "../../hooks/usePagination";
import useDebounce from "../../hooks/useDebounce";

const AdminJobs = () => {
  const { theme } = useTheme();
  const { showToast } = useToast();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [actionMenuId, setActionMenuId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const actionMenuRef = useRef(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target)) {
        setActionMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllAdminJobs();
      setJobs(data);
    } catch (err) {
      setError(err.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      !debouncedSearch ||
      j.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      j.company.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      j.location.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesStatus = statusFilter === "all" || j.status === statusFilter;
    const matchesType = typeFilter === "all" || j.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const { paginatedItems, currentPage, totalPages, pageNumbers, goToPage, goToNext, goToPrev, summaryText } = usePagination(filteredJobs, 5);

  const handleStatusChange = async (jobId, newStatus) => {
    const job = jobs.find((j) => j.id === jobId);
    const oldStatus = job?.status;
    try {
      setUpdatingId(jobId);
      setJobs((prev) => prev.map((j) => j.id === jobId ? { ...j, status: newStatus } : j));
      setActionMenuId(null);
      await updateJobStatus(jobId, newStatus);
      showToast(`Job ${newStatus.toLowerCase()} successfully`, "success");
    } catch {
      setJobs((prev) => prev.map((j) => j.id === jobId ? { ...j, status: oldStatus } : j));
      showToast("Failed to update job status", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active": return `${theme.successBg} ${theme.successText}`;
      case "Closed": return `${theme.dangerBg} ${theme.dangerText}`;
      case "Flagged": return `${theme.warningBg} ${theme.warningText}`;
      default: return `${theme.infoBg} ${theme.infoText}`;
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader size="lg" /></div>;
  if (error) return <ApiError message={error} onRetry={loadJobs} />;

  return (
    <div className="space-y-6 px-2 sm:px-0">
      <Sidebar />

      {/* Header */}
      <div className={`${theme.cardBg} p-4 sm:p-6 rounded-xl ${theme.border} border`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold ${theme.textPrimary}`}>Job Management</h1>
            <p className={`${theme.textSecondary} mt-1 text-sm`}>
              {jobs.length} total jobs · {jobs.filter(j => j.status === "Active").length} active · {jobs.filter(j => j.status === "Flagged").length} flagged
            </p>
          </div>
          <div className={`px-3 py-1 ${theme.dangerBg} ${theme.dangerText} rounded-full text-xs font-bold`}>ADMIN</div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Active", count: jobs.filter(j => j.status === "Active").length, style: `${theme.successBg} ${theme.successText}` },
          { label: "Closed", count: jobs.filter(j => j.status === "Closed").length, style: `${theme.dangerBg} ${theme.dangerText}` },
          { label: "Flagged", count: jobs.filter(j => j.status === "Flagged").length, style: `${theme.warningBg} ${theme.warningText}` },
        ].map((s) => (
          <div key={s.label} className={`${theme.cardBg} ${theme.border} border rounded-xl p-4 text-center`}>
            <p className={`text-2xl font-bold ${s.style.split(" ")[1]}`}>{s.count}</p>
            <p className={`text-xs ${theme.textMuted} mt-1`}>{s.label} Jobs</p>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by title, company or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-2.5 pl-10 ${theme.border} border rounded-lg ${theme.cardBg} ${theme.textPrimary} text-sm outline-none`}
            />
            <svg className={`w-4 h-4 ${theme.textMuted} absolute left-3 top-3`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={`px-3 py-2.5 ${theme.border} border rounded-lg ${theme.cardBg} ${theme.textPrimary} text-sm outline-none`}>
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
            <option value="Flagged">Flagged</option>
          </select>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={`px-3 py-2.5 ${theme.border} border rounded-lg ${theme.cardBg} ${theme.textPrimary} text-sm outline-none`}>
            <option value="all">All Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Contract">Contract</option>
            <option value="Part Time">Part Time</option>
          </select>
        </div>
        <p className={`text-xs ${theme.textMuted} mt-3`}>{summaryText}</p>
      </div>

      {/* Jobs Table */}
      <div className={`${theme.cardBg} rounded-xl ${theme.border} border overflow-hidden`}>
        {/* Mobile Cards */}
        <div className="block md:hidden divide-y">
          {paginatedItems.map((j) => (
            <div key={j.id} className={`p-4 ${theme.hover} ${updatingId === j.id ? "opacity-60" : ""}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${theme.textPrimary}`}>{j.title}</p>
                  <p className={`text-xs ${theme.textSecondary}`}>{j.company}</p>
                  <p className={`text-xs ${theme.textMuted}`}>{j.location} · {j.type}</p>
                </div>
                <div className="relative" ref={actionMenuId === j.id ? actionMenuRef : null}>
                  <button onClick={() => setActionMenuId(actionMenuId === j.id ? null : j.id)} className={`p-1.5 ${theme.hover} ${theme.textMuted} rounded-lg font-bold`}>⋮</button>
                  {actionMenuId === j.id && (
                    <div className={`absolute right-0 top-8 w-36 ${theme.cardBg} ${theme.border} border rounded-lg ${theme.shadowMd} py-1 z-10`}>
                      {j.status !== "Active" && <button onClick={() => handleStatusChange(j.id, "Active")} className={`w-full text-left px-3 py-2 text-xs ${theme.successText} ${theme.hover}`}>✅ Activate</button>}
                      {j.status !== "Closed" && <button onClick={() => handleStatusChange(j.id, "Closed")} className={`w-full text-left px-3 py-2 text-xs ${theme.dangerText} ${theme.hover}`}>🚫 Close Job</button>}
                      {j.status !== "Flagged" && <button onClick={() => handleStatusChange(j.id, "Flagged")} className={`w-full text-left px-3 py-2 text-xs ${theme.warningText} ${theme.hover}`}>⚠️ Flag</button>}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusStyle(j.status)}`}>{j.status}</span>
                <span className={`text-xs ${theme.textMuted}`}>{j.applicants} applicants · {j.postedDate}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className={theme.bg}>
              <tr>
                {["Job Title", "Company", "Location", "Type", "Applicants", "Posted", "Status", "Actions"].map((h) => (
                  <th key={h} className={`px-4 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${theme.border}`}>
              {paginatedItems.map((j) => (
                <tr key={j.id} className={`${theme.hover} ${updatingId === j.id ? "opacity-60" : ""}`}>
                  <td className="px-4 py-4">
                    <p className={`text-sm font-medium ${theme.textPrimary}`}>{j.title}</p>
                    <p className={`text-xs ${theme.textMuted}`}>{j.employer}</p>
                  </td>
                  <td className={`px-4 py-4 text-sm ${theme.textSecondary}`}>{j.company}</td>
                  <td className={`px-4 py-4 text-sm ${theme.textMuted}`}>{j.location}</td>
                  <td className={`px-4 py-4 text-sm ${theme.textMuted}`}>{j.type}</td>
                  <td className={`px-4 py-4 text-sm ${theme.textSecondary} text-center font-medium`}>{j.applicants}</td>
                  <td className={`px-4 py-4 text-sm ${theme.textMuted}`}>{j.postedDate}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusStyle(j.status)}`}>{j.status}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="relative" ref={actionMenuId === j.id ? actionMenuRef : null}>
                      <button onClick={() => setActionMenuId(actionMenuId === j.id ? null : j.id)} className={`p-1.5 ${theme.hover} ${theme.textMuted} rounded-lg font-bold text-lg`}>⋮</button>
                      {actionMenuId === j.id && (
                        <div className={`absolute right-0 top-8 w-36 ${theme.cardBg} ${theme.border} border rounded-lg ${theme.shadowMd} py-1 z-10`}>
                          {j.status !== "Active" && <button onClick={() => handleStatusChange(j.id, "Active")} className={`w-full text-left px-3 py-2 text-xs ${theme.successText} ${theme.hover}`}>✅ Activate</button>}
                          {j.status !== "Closed" && <button onClick={() => handleStatusChange(j.id, "Closed")} className={`w-full text-left px-3 py-2 text-xs ${theme.dangerText} ${theme.hover}`}>🚫 Close Job</button>}
                          {j.status !== "Flagged" && <button onClick={() => handleStatusChange(j.id, "Flagged")} className={`w-full text-left px-3 py-2 text-xs ${theme.warningText} ${theme.hover}`}>⚠️ Flag</button>}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredJobs.length === 0 && (
          <div className="p-12 text-center">
            <p className={`text-lg font-semibold ${theme.textPrimary} mb-2`}>No jobs found</p>
            <p className={`text-sm ${theme.textMuted}`}>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={goToPrev} disabled={currentPage === 1} className={`px-3 py-2 rounded-lg text-sm ${theme.border} border ${theme.textPrimary} ${theme.hover} disabled:opacity-40`}>← Prev</button>
          {pageNumbers.map((page) => (
            <button key={page} onClick={() => goToPage(page)} className={`w-9 h-9 rounded-lg text-sm font-medium ${page === currentPage ? `${theme.primary} text-white` : `${theme.border} border ${theme.textPrimary} ${theme.hover}`}`}>{page}</button>
          ))}
          <button onClick={goToNext} disabled={currentPage === totalPages} className={`px-3 py-2 rounded-lg text-sm ${theme.border} border ${theme.textPrimary} ${theme.hover} disabled:opacity-40`}>Next →</button>
        </div>
      )}
    </div>
  );
};

export default AdminJobs;