import { useTheme } from "../../context/ThemeContext";

const FilterSection = ({ title, children, theme }) => (
  <div className="mb-6">
    <h3 className={`text-sm font-semibold ${theme.textPrimary} mb-3`}>{title}</h3>
    {children}
  </div>
);

const Checkbox = ({ label, checked, onChange, theme }) => (
  <label className="flex items-center gap-2 mb-2 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`w-4 h-4 rounded ${theme.primary}`}
    />
    <span className={`text-sm ${theme.textSecondary}`}>{label}</span>
  </label>
);

const FilterPanel = ({ filters, onFilterChange, onToggleArray, onReset }) => {
  const { theme } = useTheme();

  return (
    <div className={`${theme.cardBg} rounded-xl ${theme.border} border p-4 md:p-6 sticky top-20`}>
      {/* Header — UNCHANGED */}
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-bold ${theme.textPrimary}`}>Filters</h2>
      </div>

      {/* Location — UNCHANGED UI */}
      <FilterSection title="Location" theme={theme}>
        <input
          type="text"
          placeholder="Search location..."
          value={filters.location}
          onChange={(e) => onFilterChange("location", e.target.value)}
          className={`w-full px-3 py-2 rounded-lg ${theme.border} border ${theme.cardBg} ${theme.textPrimary} text-sm outline-none ${theme.focus}`}
        />
      </FilterSection>

      {/* Job Type — UNCHANGED UI */}
      <FilterSection title="Job Type" theme={theme}>
        {["full-time", "part-time", "contract", "internship"].map((type) => (
          <Checkbox
            key={type}
            label={type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
            checked={filters.jobType.includes(type)}
            onChange={() => onToggleArray("jobType", type)}
            theme={theme}
          />
        ))}
      </FilterSection>

      {/* Work Mode — UNCHANGED UI */}
      <FilterSection title="Work Mode" theme={theme}>
        {["remote", "onsite", "hybrid"].map((mode) => (
          <Checkbox
            key={mode}
            label={mode.charAt(0).toUpperCase() + mode.slice(1)}
            checked={filters.workMode.includes(mode)}
            onChange={() => onToggleArray("workMode", mode)}
            theme={theme}
          />
        ))}
      </FilterSection>

      {/* Experience Level — UNCHANGED UI */}
      <FilterSection title="Experience Level" theme={theme}>
        {[
          { value: "entry", label: "Entry Level" },
          { value: "mid", label: "Mid Level" },
          { value: "senior", label: "Senior Level" },
        ].map(({ value, label }) => (
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

      {/* Salary Range — UNCHANGED UI */}
      <FilterSection title="Salary Range" theme={theme}>
        <select
          value={filters.salary}
          onChange={(e) => onFilterChange("salary", e.target.value)}
          className={`w-full px-3 py-2 rounded-lg ${theme.border} border ${theme.cardBg} ${theme.textPrimary} text-sm outline-none ${theme.focus}`}
        >
          <option value="">Any</option>
          <option value="0-50k">$0 - $50,000</option>
          <option value="50k-100k">$50,000 - $100,000</option>
          <option value="100k-150k">$100,000 - $150,000</option>
          <option value="150k+">$150,000+</option>
        </select>
      </FilterSection>

      {/* Action Buttons — UNCHANGED UI */}
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
};

export default FilterPanel;