import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../ui/toast/useToast";
import Loader from "../../ui/Loader";
import ApiError from "../../ui/ApiError";
import StatCard from "../../components/Dashboard/StatCard";
import Sidebar from "../../components/Dashboard/Sidebar";
import {
  fetchAdminStats,
  fetchRecentUsers,
  updateUserStatus,
} from "../../services/adminService";
import { SectionErrorBoundary } from "../../components/ErrorBoundary";
import LiveActivityFeed from "../../components/Dashboard/LiveActivityFeed";
import { useWebSocket } from "../../context/WebSocketContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // WebSocket real-time data
  const { connected, activityFeed, interviewUpdates } = useWebSocket();

  const [stats, setStats] = useState([]);
  const [users, setUsers] = useState([]);

  const [statsLoading, setStatsLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);

  const [statsError, setStatsError] = useState(null);
  const [usersError, setUsersError] = useState(null);

  const [updatingUserId, setUpdatingUserId] = useState(null);

  useEffect(() => {
    loadStats();
    loadUsers();
  }, []);

  const loadStats = async () => {
    try {
      setStatsLoading(true);
      setStatsError(null);
      const data = await fetchAdminStats();
      setStats(data);
    } catch (err) {
      setStatsError(err.message || "Failed to load stats");
    } finally {
      setStatsLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      setUsersLoading(true);
      setUsersError(null);
      const data = await fetchRecentUsers();
      setUsers(data);
    } catch (err) {
      setUsersError(err.message || "Failed to load users");
    } finally {
      setUsersLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      setUpdatingUserId(userId);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
      );
      await updateUserStatus(userId, newStatus);
      showToast(`User ${newStatus.toLowerCase()} successfully`, "success");
    } catch (err) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: currentStatus } : u))
      );
      showToast("Failed to update user status", "error");
    } finally {
      setUpdatingUserId(null);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <Sidebar />

      {/* Header */}
      <div className={`${theme.cardBg} p-4 sm:p-6 rounded-xl ${theme.border} border`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold ${theme.textPrimary}`}>
              Admin Dashboard 🛡️
            </h1>
            <p className={`${theme.textSecondary} mt-1 text-sm`}>
              Welcome back, {user?.name}. Here's your platform overview.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Live connection pill in header */}
            <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
              connected
                ? `${theme.successBg} ${theme.successText}`
                : `${theme.dangerBg} ${theme.dangerText}`
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-green-500 animate-pulse" : "bg-red-400"}`} />
              {connected ? "Live" : "Offline"}
            </div>
            <div className={`px-3 py-1 ${theme.dangerBg} ${theme.dangerText} rounded-full text-xs font-bold`}>
              ADMIN
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <SectionErrorBoundary>
        {statsLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader size="md" />
          </div>
        ) : statsError ? (
          <ApiError message={statsError} onRetry={loadStats} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        )}
      </SectionErrorBoundary>

      {/* Recent Users Table */}
      <SectionErrorBoundary>
        <div className={`${theme.cardBg} rounded-xl ${theme.border} border`}>
          <div className={`p-4 sm:p-6 border-b ${theme.border} flex items-center justify-between`}>
            <div>
              <h2 className={`text-base sm:text-lg font-semibold ${theme.textPrimary}`}>
                Recent Users
              </h2>
              <p className={`text-xs sm:text-sm ${theme.textMuted} mt-1`}>
                Latest registered users on the platform
              </p>
            </div>
            <button
              onClick={() => navigate("/app/admin/users")}
              className={`text-xs ${theme.primaryText} font-medium`}
            >
              View all →
            </button>
          </div>

          {usersLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader size="md" />
            </div>
          ) : usersError ? (
            <div className="p-4">
              <ApiError message={usersError} onRetry={loadUsers} />
            </div>
          ) : (
            <>
              {/* Mobile Card List */}
              <div className="block md:hidden divide-y divide-gray-100">
                {users.map((u) => (
                  <div key={u.id} className={`p-4 ${theme.hover}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 ${theme.infoBg} rounded-full flex items-center justify-center ${theme.infoText} font-semibold text-sm`}>
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${theme.textPrimary}`}>{u.name}</p>
                          <p className={`text-xs ${theme.textMuted}`}>{u.email}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                        u.role === "admin" ? `${theme.dangerBg} ${theme.dangerText}` :
                        u.role === "employer" ? `${theme.warningBg} ${theme.warningText}` :
                        `${theme.infoBg} ${theme.infoText}`
                      }`}>
                        {u.role}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${theme.textMuted}`}>{u.plan} · {u.joinedDate}</span>
                      <button
                        onClick={() => handleToggleUserStatus(u.id, u.status)}
                        disabled={updatingUserId === u.id}
                        className={`text-xs font-medium px-3 py-1 rounded-lg border ${
                          u.status === "Active"
                            ? `${theme.dangerText} ${theme.border}`
                            : `${theme.successText} ${theme.border}`
                        } disabled:opacity-50`}
                      >
                        {updatingUserId === u.id ? "..." : u.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className={theme.bg}>
                    <tr>
                      {["User", "Role", "Plan", "Joined", "Status", "Action"].map((h) => (
                        <th key={h} className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme.border}`}>
                    {users.map((u) => (
                      <tr key={u.id} className={theme.hover}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 ${theme.infoBg} rounded-full flex items-center justify-center ${theme.infoText} font-semibold text-sm`}>
                              {u.name.charAt(0)}
                            </div>
                            <div>
                              <p className={`text-sm font-medium ${theme.textPrimary}`}>{u.name}</p>
                              <p className={`text-xs ${theme.textMuted}`}>{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                            u.role === "admin" ? `${theme.dangerBg} ${theme.dangerText}` :
                            u.role === "employer" ? `${theme.warningBg} ${theme.warningText}` :
                            `${theme.infoBg} ${theme.infoText}`
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className={`px-6 py-4 text-sm ${theme.textSecondary}`}>{u.plan}</td>
                        <td className={`px-6 py-4 text-sm ${theme.textMuted}`}>{u.joinedDate}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            u.status === "Active"
                              ? `${theme.successBg} ${theme.successText}`
                              : `${theme.dangerBg} ${theme.dangerText}`
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleUserStatus(u.id, u.status)}
                            disabled={updatingUserId === u.id}
                            className={`text-xs font-medium px-3 py-1.5 rounded-lg border ${
                              u.status === "Active"
                                ? `${theme.dangerText} ${theme.border}`
                                : `${theme.successText} ${theme.border}`
                            } disabled:opacity-50`}
                          >
                            {updatingUserId === u.id ? "..." : u.status === "Active" ? "Suspend" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </SectionErrorBoundary>

      {/* ── Platform Pulse — Real-time monitoring ──────── */}
      <SectionErrorBoundary>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Live Feed — 2/3 width */}
          <div className="lg:col-span-2">
            <LiveActivityFeed maxItems={10} />
          </div>

          {/* Right panel — System Status + Interview Updates */}
          <div className="space-y-4">

            {/* System Status card */}
            <div className={`${theme.cardBg} rounded-xl ${theme.border} border p-4`}>
              <h3 className={`text-sm font-semibold ${theme.textPrimary} mb-3`}>
                🛰️ System Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${theme.textMuted}`}>WebSocket</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${connected ? "bg-green-500 animate-pulse" : "bg-red-400"}`} />
                    <span className={`text-xs font-medium ${connected ? theme.successText : theme.dangerText}`}>
                      {connected ? "Connected" : "Offline"}
                    </span>
                  </div>
                </div>
                <div className={`h-px ${theme.border} border-t`} />
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${theme.textMuted}`}>Live Events</span>
                  <span className={`text-xs font-bold ${theme.textPrimary} px-2 py-0.5 ${theme.infoBg} ${theme.infoText} rounded-full`}>
                    {activityFeed.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${theme.textMuted}`}>Interview Updates</span>
                  <span className={`text-xs font-bold px-2 py-0.5 ${theme.successBg} ${theme.successText} rounded-full`}>
                    {interviewUpdates.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Latest Interview Updates card */}
            <div className={`${theme.cardBg} rounded-xl ${theme.border} border p-4`}>
              <h3 className={`text-sm font-semibold ${theme.textPrimary} mb-3`}>
                📋 Interview Updates
              </h3>
              {interviewUpdates.length === 0 ? (
                <div className="text-center py-4">
                  <p className={`text-xs ${theme.textMuted}`}>
                    {connected ? "Waiting for updates..." : "Connecting..."}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {interviewUpdates.slice(0, 3).map((update) => (
                    <div key={update.id} className={`p-2.5 ${theme.bg} rounded-lg`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className={`text-xs font-medium ${theme.textPrimary} truncate`}>
                            {update.candidateName}
                          </p>
                          <p className={`text-xs ${theme.textMuted} mt-0.5 truncate`}>
                            {update.role}
                          </p>
                        </div>
                        <span className={`flex-shrink-0 inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                          update.status === "Shortlisted"
                            ? `${theme.successBg} ${theme.successText}`
                            : update.status === "Interview Scheduled"
                            ? `${theme.infoBg} ${theme.infoText}`
                            : update.status === "Rejected"
                            ? `${theme.dangerBg} ${theme.dangerText}`
                            : `${theme.warningBg} ${theme.warningText}`
                        }`}>
                          {update.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </SectionErrorBoundary>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`${theme.primary} rounded-xl p-5 text-white`}>
          <h3 className="font-semibold mb-1">Manage Users</h3>
          <p className="text-white/80 text-xs mb-3">View and manage all platform users</p>
          <button
            onClick={() => navigate("/app/admin/users")}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100"
          >
            View Users
          </button>
        </div>
        <div className={`${theme.primary} rounded-xl p-5 text-white`}>
          <h3 className="font-semibold mb-1">Manage Analytics</h3>
          <p className="text-white/80 text-xs mb-3">View and manage platform analytics</p>
          <button
            onClick={() => navigate("/app/admin/analytics")}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100"
          >
            View Analytics
          </button>
        </div>
        <div className={`${theme.info} rounded-xl p-5 text-white`}>
          <h3 className="font-semibold mb-1">Review Payments</h3>
          <p className="text-white/80 text-xs mb-3">Monitor subscription and payment activity</p>
          <button
            onClick={() => navigate("/app/employer-pricing")}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100"
          >
            View Plans
          </button>
        </div>
        <div className="bg-green-600 rounded-xl p-5 text-white">
          <h3 className="font-semibold mb-1">Job Listings</h3>
          <p className="text-white/80 text-xs mb-3">Review and moderate all job postings</p>
          <button
            onClick={() => navigate("/app/admin/jobs")}
            className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100"
          >
            View Jobs
          </button>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;