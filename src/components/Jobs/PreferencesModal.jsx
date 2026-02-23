// components/Jobs/PreferencesModal.jsx
import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

const PreferencesModal = ({ isOpen, onClose, onSave, initialPreferences }) => {
  const { theme } = useTheme();
  
  const [preferences, setPreferences] = useState({
    jobTypes: [],
    workModes: [],
    experienceLevels: [],
    locations: [],
    salaryRange: { min: "", max: "" },
    skills: [],
    newSkill: "",
  });


  useEffect(() => {
    if (initialPreferences) {
      setPreferences(initialPreferences);
    }
  }, [initialPreferences]);

  const jobTypeOptions = ["full-time", "part-time", "contract", "internship"];
  const workModeOptions = ["remote", "onsite", "hybrid"];
  const experienceLevelOptions = [
    { value: "entry", label: "Entry Level" },
    { value: "mid", label: "Mid Level" },
    { value: "senior", label: "Senior Level" },
  ];

  const handleCheckboxChange = (category, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleAddSkill = () => {
    if (preferences.newSkill.trim()) {
      setPreferences(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: ""
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setPreferences(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSave = () => {
    onSave(preferences);
    onClose();
  };

  const handleReset = () => {
    setPreferences({
      jobTypes: [],
      workModes: [],
      experienceLevels: [],
      locations: [],
      salaryRange: { min: "", max: "" },
      skills: [],
      newSkill: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={`${theme.cardBg} rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className={`sticky top-0 ${theme.cardBg} border-b ${theme.border} px-6 py-4 flex items-center justify-between`}>
          <h2 className={`text-xl font-bold ${theme.textPrimary}`}>
            Job Preferences
          </h2>
          <button
            onClick={onClose}
            className={`${theme.textMuted} ${theme.hover} transition-colors`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Job Type */}
          <div>
            <h3 className={`font-semibold ${theme.textPrimary} mb-3`}>Job Type</h3>
            <div className="space-y-2">
              {jobTypeOptions.map(type => (
                <label key={type} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.jobTypes.includes(type)}
                    onChange={() => handleCheckboxChange('jobTypes', type)}
                    className="w-4 h-4 rounded border-2"
                  />
                  <span className={`text-sm ${theme.textPrimary} capitalize`}>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Work Mode */}
          <div>
            <h3 className={`font-semibold ${theme.textPrimary} mb-3`}>Work Mode</h3>
            <div className="space-y-2">
              {workModeOptions.map(mode => (
                <label key={mode} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.workModes.includes(mode)}
                    onChange={() => handleCheckboxChange('workModes', mode)}
                    className="w-4 h-4 rounded border-2"
                  />
                  <span className={`text-sm ${theme.textPrimary} capitalize`}>{mode}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <h3 className={`font-semibold ${theme.textPrimary} mb-3`}>Experience Level</h3>
            <div className="space-y-2">
              {experienceLevelOptions.map(level => (
                <label key={level.value} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.experienceLevels.includes(level.value)}
                    onChange={() => handleCheckboxChange('experienceLevels', level.value)}
                    className="w-4 h-4 rounded border-2"
                  />
                  <span className={`text-sm ${theme.textPrimary}`}>{level.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <h3 className={`font-semibold ${theme.textPrimary} mb-3`}>Salary Range (USD)</h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Min (e.g., 50000)"
                  value={preferences.salaryRange.min}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    salaryRange: { ...prev.salaryRange, min: e.target.value }
                  }))}
                  className={`w-full px-4 py-2 ${theme.border} border rounded-lg ${theme.textPrimary} ${theme.cardBg} text-sm outline-none ${theme.focus}`}
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Max (e.g., 100000)"
                  value={preferences.salaryRange.max}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    salaryRange: { ...prev.salaryRange, max: e.target.value }
                  }))}
                  className={`w-full px-4 py-2 ${theme.border} border rounded-lg ${theme.textPrimary} ${theme.cardBg} text-sm outline-none ${theme.focus}`}
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className={`font-semibold ${theme.textPrimary} mb-3`}>Preferred Skills</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Add a skill (e.g., React, Node.js)"
                value={preferences.newSkill}
                onChange={(e) => setPreferences(prev => ({ ...prev, newSkill: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                className={`flex-1 px-4 py-2 ${theme.border} border rounded-lg ${theme.textPrimary} ${theme.cardBg} text-sm outline-none ${theme.focus}`}
              />
              <button
                onClick={handleAddSkill}
                className={`px-4 py-2 ${theme.primary} ${theme.secondaryText} rounded-lg ${theme.primaryHover} font-medium text-sm`}
              >
                Add
              </button>
            </div>
            {preferences.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {preferences.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 ${theme.infoBg} ${theme.infoText} rounded-full text-sm flex items-center gap-2`}
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:opacity-70"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Preferred Locations */}
          <div>
            <h3 className={`font-semibold ${theme.textPrimary} mb-3`}>Preferred Locations</h3>
            <input
              type="text"
              placeholder="e.g., New York, San Francisco, Remote"
              value={preferences.locations.join(', ')}
              onChange={(e) => setPreferences(prev => ({
                ...prev,
                locations: e.target.value.split(',').map(loc => loc.trim()).filter(Boolean)
              }))}
              className={`w-full px-4 py-2 ${theme.border} border rounded-lg ${theme.textPrimary} ${theme.cardBg} text-sm outline-none ${theme.focus}`}
            />
            <p className={`text-xs ${theme.textMuted} mt-1`}>
              Separate multiple locations with commas
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={`sticky bottom-0 ${theme.cardBg} border-t ${theme.border} px-6 py-4 flex gap-3`}>
          <button
            onClick={handleReset}
            className={`flex-1 px-4 py-2 ${theme.border} border rounded-lg ${theme.hover} font-medium text-sm`}
          >
            Reset All
          </button>
          <button
            onClick={handleSave}
            className={`flex-1 px-4 py-2 ${theme.primary} ${theme.secondaryText} rounded-lg ${theme.primaryHover} font-medium text-sm`}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesModal;