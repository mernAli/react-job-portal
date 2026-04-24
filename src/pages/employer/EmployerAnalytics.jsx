import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import Loader from "../../ui/Loader";
import ApiError from "../../ui/ApiError";
import Sidebar from "../../components/Dashboard/Sidebar";
import {
  fetchApplicationTrend,
  fetchHiringFunnel,
  fetchCandidatePipeline,
} from "../../services/dashboardService";
import {
  LineChart, Line, BarChart, Bar, FunnelChart, Funnel, LabelList,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from "recharts";

// ─── Shared tooltip style ─────────────────────────────────
const TooltipStyle = {
  borderRadius: "8px",
  border: "none",
  fontSize: "12px",
};

// ─── Analytics Card wrapper ───────────────────────────────
const ChartCard = ({ title, subtitle, children, theme }) => (
  <div className={`${theme.cardBg} rounded-xl ${theme.border} border p-4 sm:p-6`}>
    <div className="mb-4">
      <h3 className={`text-base font-semibold ${theme.textPrimary}`}>{title}</h3>
      {subtitle && <p className={`text-xs ${theme.textMuted} mt-1`}>{subtitle}</p>}
    </div>
    {children}
  </div>
);

// ─── Summary stat chip ────────────────────────────────────
const StatChip = ({ label, value, color, theme }) => (
  <div className={`${theme.cardBg} ${theme.border} border rounded-lg p-4 text-center`}>
    <p className={`text-xs ${theme.textMuted} mb-1`}>{label}</p>
    <p className={`text-2xl font-bold`} style={{ color }}>{value}</p>
  </div>
);

const EmployerAnalytics = () => {
  const { theme } = useTheme();

  const [trend, setTrend]       = useState([]);
  const [funnel, setFunnel]     = useState([]);
  const [pipeline, setPipeline] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const loadAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const [trendData, funnelData, pipelineData] = await Promise.all([
        fetchApplicationTrend(),
        fetchHiringFunnel(),
        fetchCandidatePipeline(),
      ]);
      setTrend(trendData);
      setFunnel(funnelData);
      setPipeline(pipelineData);
    } catch (err) {
      setError(err.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader size="lg" />
    </div>
  );

  if (error) return <ApiError message={error} onRetry={loadAll} />;

  // Summary numbers derived from data
  const totalApps     = trend.reduce((s, d) => s + d.applications, 0);
  const totalHired    = trend.reduce((s, d) => s + d.hired, 0);
  const conversionRate = funnel.length
    ? Math.round((funnel[funnel.length - 1].value / funnel[0].value) * 100)
    : 0;
  const avgTimeToHire = 18; // days — static for now, replace with real API field

  return (
    <div className="space-y-6 px-2 sm:px-0">
      <Sidebar />

      {/* Page Header */}
      <div className={`${theme.cardBg} p-4 sm:p-6 rounded-xl ${theme.border} border`}>
        <h1 className={`text-xl sm:text-2xl font-bold ${theme.textPrimary}`}>
          Hiring Analytics
        </h1>
        <p className={`${theme.textSecondary} mt-1 text-sm`}>
          Visual insights into your recruitment performance — last 8 weeks
        </p>
      </div>

      {/* Summary chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <StatChip label="Total Applications" value={totalApps}       color="#3B82F6" theme={theme} />
        <StatChip label="Hired"              value={totalHired}      color="#22C55E" theme={theme} />
        <StatChip label="Conversion Rate"   value={`${conversionRate}%`} color="#8B5CF6" theme={theme} />
        <StatChip label="Avg. Time to Hire" value={`${avgTimeToHire}d`}  color="#F59E0B" theme={theme} />
      </div>

      {/* ── Chart 1 — Application Trend (Line Chart) ──────── */}
      <ChartCard
        title="Application Trend"
        subtitle="Applications, shortlists, and hires per week"
        theme={theme}
      >
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={trend} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.border?.replace("border-", "") || "#e5e7eb"} opacity={0.4} />
            <XAxis dataKey="week" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={TooltipStyle} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Line
              type="monotone"
              dataKey="applications"
              name="Applications"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="shortlisted"
              name="Shortlisted"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="hired"
              name="Hired"
              stroke="#22C55E"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ── Chart 2 — Hiring Funnel (Horizontal Bar) ──────── */}
      <ChartCard
        title="Hiring Funnel"
        subtitle="Candidates moving through each recruitment stage"
        theme={theme}
      >
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={funnel}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 110, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.4} />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="stage"
              tick={{ fontSize: 11 }}
              width={105}
            />
            <Tooltip contentStyle={TooltipStyle} />
            <Bar dataKey="value" name="Candidates" radius={[0, 4, 4, 0]}>
              {funnel.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <LabelList dataKey="value" position="right" style={{ fontSize: 11, fontWeight: 600 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Conversion rate row below funnel */}
        <div className={`mt-4 p-3 ${theme.bg} rounded-lg`}>
          <p className={`text-xs ${theme.textMuted} text-center`}>
            Overall conversion:{" "}
            <span className={`font-bold ${theme.successText}`}>
              {conversionRate}%
            </span>{" "}
            of applicants are hired
          </p>
        </div>
      </ChartCard>

      {/* ── Chart 3 — Candidate Pipeline (Grouped Bar) ────── */}
      <ChartCard
        title="Candidate Pipeline by Position"
        subtitle="Applied vs shortlisted vs hired per job role"
        theme={theme}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pipeline} margin={{ top: 5, right: 10, left: -10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
            <XAxis
              dataKey="position"
              tick={{ fontSize: 11 }}
              angle={-25}
              textAnchor="end"
              interval={0}
            />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={TooltipStyle} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="applied"     name="Applied"     fill="#3B82F6" radius={[3, 3, 0, 0]} />
            <Bar dataKey="shortlisted" name="Shortlisted" fill="#F59E0B" radius={[3, 3, 0, 0]} />
            <Bar dataKey="hired"       name="Hired"       fill="#22C55E" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default EmployerAnalytics;