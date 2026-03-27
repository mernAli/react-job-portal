import { memo } from "react";
import { useTheme } from "../../context/ThemeContext";

// ✅ Move filter options OUTSIDE — static data, never changes
const JOB_TYPES = ["full-time", "part-time", "contract", "internship"];
const WORK_MODES = ["remote", "onsite", "hybrid"];
const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior Level" },
];
const SALARY_OPTIONS = [
  { value: "", label: "Any" },
  { value: "0-50k", label: "$0 - $50,000" },
  { value: "50k-100k", label: "$50,000 - $100,000" },
  { value: "100k-150k", label: "$100,000 - $150,000" },
  { value: "150k+", label: "$150,000+" },
];

// ✅ memo on sub-components — they re-render only when their own props change
const FilterSection = memo(({ title, children, theme }) => (
  <div className="mb-6">
    <h3 className={`text-sm font-semibold ${theme.textPrimary} mb-3`}>{title}</h3>
    {children}
  </div>
));
FilterSection.displayName = "FilterSection";

const Checkbox = memo(({ label, checked, onChange, theme }) => (
  <label className="flex items-center gap-2 mb-2 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`w-4 h-4 rounded ${theme.primary}`}
    />
    <span className={`text-sm ${theme.textSecondary}`}>{label}</span>
  </label>
));
Checkbox.displayName = "Checkbox";

// ✅ memo on FilterPanel — only re-renders when filters or callbacks change
const FilterPanel = memo(({ filters, onFilterChange, onToggleArray, onReset }) => {
  const { theme } = useTheme();

  return (
    <div className={`${theme.cardBg} rounded-xl ${theme.border} border p-4 md:p-6 sticky top-20`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-bold ${theme.textPrimary}`}>Filters</h2>
      </div>

      <FilterSection title="Location" theme={theme}>
        <input
          type="text"
          placeholder="Search location..."
          value={filters.location}
          onChange={(e) => onFilterChange("location", e.target.value)}
          className={`w-full px-3 py-2 rounded-lg ${theme.border} border ${theme.cardBg} ${theme.textPrimary} text-sm outline-none ${theme.focus}`}
        />
      </FilterSection>

      <FilterSection title="Job Type" theme={theme}>
        {JOB_TYPES.map((type) => (
          <Checkbox
            key={type}
            label={type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
            checked={filters.jobType.includes(type)}
            onChange={() => onToggleArray("jobType", type)}
            theme={theme}
          />
        ))}
      </FilterSection>

      <FilterSection title="Work Mode" theme={theme}>
        {WORK_MODES.map((mode) => (
          <Checkbox
            key={mode}
            label={mode.charAt(0).toUpperCase() + mode.slice(1)}
            checked={filters.workMode.includes(mode)}
            onChange={() => onToggleArray("workMode", mode)}
            theme={theme}
          />
        ))}
      </FilterSection>

      <FilterSection title="Experience Level" theme={theme}>
        {EXPERIENCE_LEVELS.map(({ value, label }) => (
          <Checkbox
            key={value}
            label={label}
            checked={filters.experience === value}
            onChange={() =>
              onFilterChange("experience", filters.experience === value ? "" : value)
            }
            theme={theme}
          />
        ))}
      </FilterSection>

      <FilterSection title="Salary Range" theme={theme}>
        <select
          value={filters.salary}
          onChange={(e) => onFilterChange("salary", e.target.value)}
          className={`w-full px-3 py-2 rounded-lg ${theme.border} border ${theme.cardBg} ${theme.textPrimary} text-sm outline-none ${theme.focus}`}
        >
          {SALARY_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </FilterSection>

      <div className="space-y-2 pt-4 border-t">
        <button
          onClick={onReset}
          className={`w-full py-2 ${theme.border} border rounded-lg ${theme.hover} font-medium text-sm`}
        >
          Reset All
        </button>
      </div>
    </div>
  );
});

FilterPanel.displayName = "FilterPanel";
export default FilterPanel;