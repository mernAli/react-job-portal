import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import Loader from "../../ui/Loader";
import ApiError from "../../ui/ApiError";
import Sidebar from "../../components/Dashboard/Sidebar";
import { fetchAnalytics } from "../../services/adminService";

// Mini sparkline bar chart using divs
const SparkBar = ({ data, color = "bg-blue-500" }) => {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-0.5 h-12">
      {data.map((val, i) => (
        <div
          key={i}
          className={`flex-1 ${color} rounded-sm opacity-80 hover:opacity-100 transition-opacity`}
          style={{ height: `${(val / max) * 100}%` }}
          title={val}
        />
      ))}
    </div>
  );
};

// Distribution bar
const DistBar = ({ label, value, total, color, theme }) => {
  const pct = Math.round((value / total) * 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className={`text-sm ${theme.textSecondary}`}>{label}</span>
        <span className={`text-sm font-semibold ${theme.textPrimary}`}>{value.toLocaleString()} ({pct}%)</span>
      </div>
      <div className={`w-full h-2 ${theme.bg} rounded-full overflow-hidden`}>
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const AdminAnalytics = () => {
  const { theme } = useTheme();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAnalytics();
      setAnalytics(data);
    } catch (err) {
      setError(err.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader size="lg" /></div>;
  if (error) return <ApiError message={error} onRetry={loadAnalytics} />;

  const totalUsers = analytics.roleDistribution.candidates + analytics.roleDistribution.employers;
  const totalPlans = Object.values(analytics.planDistribution).reduce((a, b) => a + b, 0);
  const totalJobTypes = Object.values(analytics.jobsByType).reduce((a, b) => a + b, 0);

  // Calculate growth percentage
  const userGrowthPct = Math.round(
    ((analytics.userGrowth[5].users - analytics.userGrowth[0].users) / analytics.userGrowth[0].users) * 100
  );
  const revGrowthPct = Math.round(
    ((analytics.revenue[5].amount - analytics.revenue[0].amount) / analytics.revenue[0].amount) * 100
  );

  return (
    <div className="space-y-6 px-2 sm:px-0">
      <Sidebar />

      {/* Header */}
      <div className={`${theme.cardBg} p-4 sm:p-6 rounded-xl ${theme.border} border`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold ${theme.textPrimary}`}>Analytics</h1>
            <p className={`${theme.textSecondary} mt-1 text-sm`}>Platform performance overview — last 6 months</p>
          </div>
          <div className={`px-3 py-1 ${theme.dangerBg} ${theme.dangerText} rounded-full text-xs font-bold`}>ADMIN</div>
        </div>
      </div>

      {/* Growth Charts Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* User Growth */}
        <div className={`${theme.cardBg} p-5 rounded-xl ${theme.border} border`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className={`text-sm font-medium ${theme.textMuted}`}>User Growth</p>
              <p className={`text-2xl font-bold ${theme.textPrimary} mt-1`}>
                {analytics.userGrowth[5].users.toLocaleString()}
              </p>
            </div>
            <span className={`px-2 py-1 ${theme.successBg} ${theme.successText} text-xs font-bold rounded-full`}>
              +{userGrowthPct}%
            </span>
          </div>
          <SparkBar data={analytics.userGrowth.map(d => d.users)} color="bg-blue-500" />
          <div className="flex justify-between mt-2">
            {analytics.userGrowth.map((d) => (
              <span key={d.month} className={`text-xs ${theme.textMuted}`}>{d.month}</span>
            ))}
          </div>
        </div>

        {/* Revenue */}
        <div className={`${theme.cardBg} p-5 rounded-xl ${theme.border} border`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className={`text-sm font-medium ${theme.textMuted}`}>Revenue</p>
              <p className={`text-2xl font-bold ${theme.textPrimary} mt-1`}>
                ${analytics.revenue[5].amount.toLocaleString()}
              </p>
            </div>
            <span className={`px-2 py-1 ${theme.successBg} ${theme.successText} text-xs font-bold rounded-full`}>
              +{revGrowthPct}%
            </span>
          </div>
          <SparkBar data={analytics.revenue.map(d => d.amount)} color="bg-green-500" />
          <div className="flex justify-between mt-2">
            {analytics.revenue.map((d) => (
              <span key={d.month} className={`text-xs ${theme.textMuted}`}>{d.month}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Applications Sparkline */}
      <div className={`${theme.cardBg} p-5 rounded-xl ${theme.border} border`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className={`text-sm font-medium ${theme.textMuted}`}>Daily Applications (last 14 days)</p>
            <p className={`text-2xl font-bold ${theme.textPrimary} mt-1`}>
              {analytics.dailyApplications.reduce((a, b) => a + b, 0).toLocaleString()} total
            </p>
          </div>
          <span className={`text-sm ${theme.textMuted}`}>
            avg {Math.round(analytics.dailyApplications.reduce((a, b) => a + b, 0) / analytics.dailyApplications.length)}/day
          </span>
        </div>
        <SparkBar data={analytics.dailyApplications} color="bg-purple-500" />
      </div>

      {/* Distribution Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Role Distribution */}
        <div className={`${theme.cardBg} p-5 rounded-xl ${theme.border} border`}>
          <h3 className={`text-sm font-semibold ${theme.textPrimary} mb-4`}>User Roles</h3>
          <DistBar label="Candidates" value={analytics.roleDistribution.candidates} total={totalUsers} color="bg-blue-500" theme={theme} />
          <DistBar label="Employers" value={analytics.roleDistribution.employers} total={totalUsers} color="bg-yellow-500" theme={theme} />
        </div>

        {/* Plan Distribution */}
        <div className={`${theme.cardBg} p-5 rounded-xl ${theme.border} border`}>
          <h3 className={`text-sm font-semibold ${theme.textPrimary} mb-4`}>Subscription Plans</h3>
          <DistBar label="Free" value={analytics.planDistribution.free} total={totalPlans} color="bg-gray-400" theme={theme} />
          <DistBar label="Pro" value={analytics.planDistribution.pro} total={totalPlans} color="bg-blue-500" theme={theme} />
          <DistBar label="Enterprise" value={analytics.planDistribution.enterprise} total={totalPlans} color="bg-purple-500" theme={theme} />
        </div>

        {/* Job Types */}
        <div className={`${theme.cardBg} p-5 rounded-xl ${theme.border} border`}>
          <h3 className={`text-sm font-semibold ${theme.textPrimary} mb-4`}>Job Types</h3>
          <DistBar label="Full Time" value={analytics.jobsByType.fullTime} total={totalJobTypes} color="bg-green-500" theme={theme} />
          <DistBar label="Contract" value={analytics.jobsByType.contract} total={totalJobTypes} color="bg-orange-500" theme={theme} />
          <DistBar label="Part Time" value={analytics.jobsByType.partTime} total={totalJobTypes} color="bg-pink-500" theme={theme} />
          <DistBar label="Internship" value={analytics.jobsByType.internship} total={totalJobTypes} color="bg-teal-500" theme={theme} />
        </div>
      </div>

      {/* Top Locations */}
      <div className={`${theme.cardBg} p-5 rounded-xl ${theme.border} border`}>
        <h3 className={`text-sm font-semibold ${theme.textPrimary} mb-4`}>Top Job Locations</h3>
        <div className="space-y-3">
          {analytics.topLocations.map((loc, index) => {
            const maxCount = analytics.topLocations[0].count;
            const pct = Math.round((loc.count / maxCount) * 100);
            return (
              <div key={loc.city} className="flex items-center gap-3">
                <span className={`text-xs font-bold ${theme.textMuted} w-4`}>{index + 1}</span>
                <span className={`text-sm ${theme.textSecondary} w-28 flex-shrink-0`}>{loc.city}</span>
                <div className={`flex-1 h-2 ${theme.bg} rounded-full overflow-hidden`}>
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className={`text-sm font-semibold ${theme.textPrimary} w-10 text-right`}>{loc.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;