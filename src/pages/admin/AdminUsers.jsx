import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../ui/toast/useToast";
import Loader from "../../ui/Loader";
import ApiError from "../../ui/ApiError";
import Sidebar from "../../components/Dashboard/Sidebar";
import { fetchAllUsers, updateUserStatus, deleteUser } from "../../services/adminService";
import usePagination from "../../hooks/usePagination";
import useDebounce from "../../hooks/useDebounce";

const AdminUsers = () => {
  const { theme } = useTheme();
  const { showToast } = useToast();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionMenuId, setActionMenuId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const actionMenuRef = useRef(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    loadUsers();
  }, []);

  // Close action menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target)) {
        setActionMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // Filter logic
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      !debouncedSearch ||
      u.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      u.location?.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const { paginatedItems, currentPage, totalPages, pageNumbers, goToPage, goToNext, goToPrev, summaryText } = usePagination(filteredUsers, 5);

  const handleStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      setUpdatingId(userId);
      setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, status: newStatus } : u));
      setActionMenuId(null);
      await updateUserStatus(userId, newStatus);
      showToast(`User ${newStatus.toLowerCase()} successfully`, "success");
    } catch {
      setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, status: currentStatus } : u));
      showToast("Failed to update user status", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (userId, userName) => {
    try {
      setUpdatingId(userId);
      setActionMenuId(null);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      await deleteUser(userId);
      showToast(`${userName} deleted successfully`, "success");
    } catch {
      loadUsers();
      showToast("Failed to delete user", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader size="lg" /></div>;
  if (error) return <ApiError message={error} onRetry={loadUsers} />;

  return (
    <div className="space-y-6 px-2 sm:px-0">
      <Sidebar />

      {/* Header */}
      <div className={`${theme.cardBg} p-4 sm:p-6 rounded-xl ${theme.border} border`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold ${theme.textPrimary}`}>User Management</h1>
            <p className={`${theme.textSecondary} mt-1 text-sm`}>
              {users.length} total users · {users.filter(u => u.status === "Active").length} active
            </p>
          </div>
          <div className={`px-3 py-1 ${theme.dangerBg} ${theme.dangerText} rounded-full text-xs font-bold`}>ADMIN</div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by name, email or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-2.5 pl-10 ${theme.border} border rounded-lg ${theme.cardBg} ${theme.textPrimary} text-sm outline-none`}
            />
            <svg className={`w-4 h-4 ${theme.textMuted} absolute left-3 top-3`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className={`px-3 py-2.5 ${theme.border} border rounded-lg ${theme.cardBg} ${theme.textPrimary} text-sm outline-none`}
          >
            <option value="all">All Roles</option>
            <option value="candidate">Candidates</option>
            <option value="employer">Employers</option>
            <option value="admin">Admins</option>
          </select>
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3 py-2.5 ${theme.border} border rounded-lg ${theme.cardBg} ${theme.textPrimary} text-sm outline-none`}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Results count */}
        <p className={`text-xs ${theme.textMuted} mt-3`}>{summaryText}</p>
      </div>

      {/* Users Table */}
      <div className={`${theme.cardBg} rounded-xl ${theme.border} border overflow-hidden`}>
        {/* Mobile Cards */}
        <div className="block md:hidden divide-y">
          {paginatedItems.map((u) => (
            <div key={u.id} className={`p-4 ${theme.hover}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${theme.infoBg} rounded-full flex items-center justify-center ${theme.infoText} font-bold`}>
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${theme.textPrimary}`}>{u.name}</p>
                    <p className={`text-xs ${theme.textMuted}`}>{u.email}</p>
                    <p className={`text-xs ${theme.textMuted}`}>{u.location}</p>
                  </div>
                </div>
                {/* Action menu button */}
                <div className="relative" ref={actionMenuId === u.id ? actionMenuRef : null}>
                  <button
                    onClick={() => setActionMenuId(actionMenuId === u.id ? null : u.id)}
                    className={`p-1.5 rounded-lg ${theme.hover} ${theme.textMuted}`}
                  >
                    ⋮
                  </button>
                  {actionMenuId === u.id && (
                    <div className={`absolute right-0 top-8 w-36 ${theme.cardBg} ${theme.border} border rounded-lg ${theme.shadowMd} py-1 z-10`}>
                      <button
                        onClick={() => handleStatusToggle(u.id, u.status)}
                        className={`w-full text-left px-3 py-2 text-xs ${u.status === "Active" ? theme.dangerText : theme.successText} ${theme.hover}`}
                      >
                        {u.status === "Active" ? "🚫 Suspend" : "✅ Activate"}
                      </button>
                      <button
                        onClick={() => handleDelete(u.id, u.name)}
                        className={`w-full text-left px-3 py-2 text-xs ${theme.dangerText} ${theme.hover}`}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full capitalize ${
                  u.role === "employer" ? `${theme.warningBg} ${theme.warningText}` : `${theme.infoBg} ${theme.infoText}`
                }`}>{u.role}</span>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                  u.status === "Active" ? `${theme.successBg} ${theme.successText}` : `${theme.dangerBg} ${theme.dangerText}`
                }`}>{u.status}</span>
                <span className={`text-xs ${theme.textMuted}`}>{u.plan} · {u.joinedDate}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className={theme.bg}>
              <tr>
                {["User", "Role", "Plan", "Location", "Applications", "Joined", "Status", "Actions"].map((h) => (
                  <th key={h} className={`px-4 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${theme.border}`}>
              {paginatedItems.map((u) => (
                <tr key={u.id} className={`${theme.hover} ${updatingId === u.id ? "opacity-60" : ""}`}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 ${theme.infoBg} rounded-full flex items-center justify-center ${theme.infoText} font-bold text-sm flex-shrink-0`}>
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${theme.textPrimary}`}>{u.name}</p>
                        <p className={`text-xs ${theme.textMuted}`}>{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full capitalize ${
                      u.role === "admin" ? `${theme.dangerBg} ${theme.dangerText}` :
                      u.role === "employer" ? `${theme.warningBg} ${theme.warningText}` :
                      `${theme.infoBg} ${theme.infoText}`
                    }`}>{u.role}</span>
                  </td>
                  <td className={`px-4 py-4 text-sm ${theme.textSecondary}`}>{u.plan}</td>
                  <td className={`px-4 py-4 text-sm ${theme.textMuted}`}>{u.location}</td>
                  <td className={`px-4 py-4 text-sm ${theme.textSecondary} text-center`}>
                    {u.role === "candidate" ? u.applications : "—"}
                  </td>
                  <td className={`px-4 py-4 text-sm ${theme.textMuted}`}>{u.joinedDate}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      u.status === "Active" ? `${theme.successBg} ${theme.successText}` : `${theme.dangerBg} ${theme.dangerText}`
                    }`}>{u.status}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="relative" ref={actionMenuId === u.id ? actionMenuRef : null}>
                      <button
                        onClick={() => setActionMenuId(actionMenuId === u.id ? null : u.id)}
                        className={`p-1.5 rounded-lg ${theme.hover} ${theme.textMuted} font-bold text-lg`}
                      >
                        ⋮
                      </button>
                      {actionMenuId === u.id && (
                        <div className={`absolute right-0 top-8 w-36 ${theme.cardBg} ${theme.border} border rounded-lg ${theme.shadowMd} py-1 z-10`}>
                          <button
                            onClick={() => handleStatusToggle(u.id, u.status)}
                            className={`w-full text-left px-3 py-2 text-xs ${u.status === "Active" ? theme.dangerText : theme.successText} ${theme.hover}`}
                          >
                            {u.status === "Active" ? "🚫 Suspend" : "✅ Activate"}
                          </button>
                          <button
                            onClick={() => handleDelete(u.id, u.name)}
                            className={`w-full text-left px-3 py-2 text-xs ${theme.dangerText} ${theme.hover}`}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <p className={`text-lg font-semibold ${theme.textPrimary} mb-2`}>No users found</p>
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

export default AdminUsers;