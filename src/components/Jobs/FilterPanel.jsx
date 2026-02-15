import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

// ✅ Move these components OUTSIDE the main component
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

const FilterPanel = ({ onFilterChange, onReset }) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(true);

  const [filters, setFilters] = useState({
    location: "",
    jobType: [],
    workMode: [],
    experienceLevel: [],
    salaryRange: "",
  });

  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (updated[category].includes(value)) {
        updated[category] = updated[category].filter((item) => item !== value);
      } else {
        updated[category] = [...updated[category], value];
      }
      return updated;
    });
  };

  const handleInputChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const resetFilters = () => {
    setFilters({
      location: "",
      jobType: [],
      workMode: [],
      experienceLevel: [],
      salaryRange: "",
    });
    onReset();
  };

  return (
    <div className={`${theme.cardBg} rounded-xl ${theme.border} border p-4 md:p-6 sticky top-20`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-bold ${theme.textPrimary}`}>Filters</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`md:hidden ${theme.textMuted}`}
        >
          {isExpanded ? "−" : "+"}
        </button>
      </div>

      {/* Filter Content */}
      <div className={`${isExpanded ? "block" : "hidden md:block"}`}>
        {/* Location */}
        <FilterSection title="Location" theme={theme}>
          <input
            type="text"
            placeholder="Search location..."
            value={filters.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className={`w-full px-3 py-2 rounded-lg ${theme.border} border ${theme.cardBg} ${theme.textPrimary} text-sm outline-none ${theme.focus}`}
          />
        </FilterSection>

        {/* Job Type */}
        <FilterSection title="Job Type" theme={theme}>
          <Checkbox
            label="Full Time"
            checked={filters.jobType.includes("full-time")}
            onChange={() => handleCheckboxChange("jobType", "full-time")}
            theme={theme}
          />
          <Checkbox
            label="Part Time"
            checked={filters.jobType.includes("part-time")}
            onChange={() => handleCheckboxChange("jobType", "part-time")}
            theme={theme}
          />
          <Checkbox
            label="Contract"
            checked={filters.jobType.includes("contract")}
            onChange={() => handleCheckboxChange("jobType", "contract")}
            theme={theme}
          />
          <Checkbox
            label="Internship"
            checked={filters.jobType.includes("internship")}
            onChange={() => handleCheckboxChange("jobType", "internship")}
            theme={theme}
          />
        </FilterSection>

        {/* Work Mode */}
        <FilterSection title="Work Mode" theme={theme}>
          <Checkbox
            label="Remote"
            checked={filters.workMode.includes("remote")}
            onChange={() => handleCheckboxChange("workMode", "remote")}
            theme={theme}
          />
          <Checkbox
            label="On-site"
            checked={filters.workMode.includes("onsite")}
            onChange={() => handleCheckboxChange("workMode", "onsite")}
            theme={theme}
          />
          <Checkbox
            label="Hybrid"
            checked={filters.workMode.includes("hybrid")}
            onChange={() => handleCheckboxChange("workMode", "hybrid")}
            theme={theme}
          />
        </FilterSection>

        {/* Experience Level */}
        <FilterSection title="Experience Level" theme={theme}>
          <Checkbox
            label="Entry Level"
            checked={filters.experienceLevel.includes("entry")}
            onChange={() => handleCheckboxChange("experienceLevel", "entry")}
            theme={theme}
          />
          <Checkbox
            label="Mid Level"
            checked={filters.experienceLevel.includes("mid")}
            onChange={() => handleCheckboxChange("experienceLevel", "mid")}
            theme={theme}
          />
          <Checkbox
            label="Senior Level"
            checked={filters.experienceLevel.includes("senior")}
            onChange={() => handleCheckboxChange("experienceLevel", "senior")}
            theme={theme}
          />
        </FilterSection>

        {/* Salary Range */}
        <FilterSection title="Salary Range" theme={theme}>
          <select
            value={filters.salaryRange}
            onChange={(e) => handleInputChange("salaryRange", e.target.value)}
            className={`w-full px-3 py-2 rounded-lg ${theme.border} border ${theme.cardBg} ${theme.textPrimary} text-sm outline-none ${theme.focus}`}
          >
            <option value="">Any</option>
            <option value="0-50k">$0 - $50,000</option>
            <option value="50k-100k">$50,000 - $100,000</option>
            <option value="100k-150k">$100,000 - $150,000</option>
            <option value="150k+">$150,000+</option>
          </select>
        </FilterSection>

        {/* Action Buttons */}
        <div className="space-y-2 pt-4 border-t">
          <button
            onClick={applyFilters}
            className={`w-full py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium text-sm`}
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className={`w-full py-2 ${theme.border} border rounded-lg ${theme.hover} font-medium text-sm`}
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
