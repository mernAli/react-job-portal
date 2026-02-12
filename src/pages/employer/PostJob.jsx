import { useState } from "react";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import { useToast } from "../../ui/toast/useToast";
import { useTheme } from "../../context/ThemeContext";

const PostJob = () => {
  const { showToast } = useToast();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    experience: "",
    salary: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const jobTypeOptions = [
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
  ];

  const experienceOptions = [
    { value: "entry", label: "Entry Level (0-2 years)" },
    { value: "mid", label: "Mid Level (2-5 years)" },
    { value: "senior", label: "Senior Level (5+ years)" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = "Job title is required";
    if (!formData.company) newErrors.company = "Company name is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.jobType) newErrors.jobType = "Job type is required";
    if (!formData.experience)
      newErrors.experience = "Experience level is required";
    if (!formData.description || formData.description.length < 50)
      newErrors.description = "Description must be at least 50 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        console.log("Job Posted:", formData);
        showToast("Job posted successfully!", "success");
        setLoading(false);

        // Reset form
        setFormData({
          title: "",
          company: "",
          location: "",
          jobType: "",
          experience: "",
          salary: "",
          description: "",
        });
      }, 1500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div
        className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border mb-6`}
      >
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>
          Post a New Job
        </h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Fill in the details below to create a new job posting
        </p>
      </div>

      {/* Form */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ... your existing form fields ... */}

          {/* Job Description */}
          <div>
            <label
              className={`block text-xs font-medium mb-2 ${theme.textSecondary}`}
            >
              Job Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="Describe the job responsibilities, requirements, and qualifications..."
              className={`w-full px-4 py-3 rounded-lg ${theme.border} border ${theme.textPrimary} ${theme.focus} ${theme.cardBg} text-sm resize-none outline-none`}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" loading={loading} fullWidth>
              Post Job
            </Button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  title: "",
                  company: "",
                  location: "",
                  jobType: "",
                  experience: "",
                  salary: "",
                  description: "",
                })
              }
              className={`px-6 py-3 ${theme.border} border rounded-lg ${theme.hover} font-medium`}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
