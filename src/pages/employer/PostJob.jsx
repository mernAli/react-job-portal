import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { useToast } from "../../ui/toast/useToast";
import MultiStepForm from "../../components/Jobs/MultiStepForm";

const PostJob = () => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Step 1: Company Info
    company: "",
    companyWebsite: "",
    companySize: "",
    industry: "",

    // Step 2: Job Details
    title: "",
    location: "",
    jobType: "",
    workMode: "",
    salary: "",
    currency: "",

    // Step 3: Requirements
    experience: "",
    education: "",
    skills: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const jobTypeOptions = [
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
  ];

  const workModeOptions = [
    { value: "remote", label: "Remote" },
    { value: "onsite", label: "On-site" },
    { value: "hybrid", label: "Hybrid" },
  ];

  const experienceOptions = [
    { value: "entry", label: "Entry Level (0-2 years)" },
    { value: "mid", label: "Mid Level (2-5 years)" },
    { value: "senior", label: "Senior Level (5+ years)" },
    { value: "lead", label: "Lead/Principal (8+ years)" },
  ];

  const companySizeOptions = [
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
    { value: "201-500", label: "201-500 employees" },
    { value: "500+", label: "500+ employees" },
  ];

  const educationOptions = [
    { value: "high-school", label: "High School" },
    { value: "bachelors", label: "Bachelor's Degree" },
    { value: "masters", label: "Master's Degree" },
    { value: "phd", label: "PhD" },
  ];

  const currencyOptions = [
    { value: "USD", label: "USD ($)" },
    { value: "EUR", label: "EUR (€)" },
    { value: "GBP", label: "GBP (£)" },
    { value: "INR", label: "INR (₹)" },
  ];

  const handleComplete = () => {
    console.log("Job Posted:", formData);
    showToast("Job posted successfully!", "success");
    navigate("/app/my-jobs");
  };

  const handleCancel = () => {
    navigate("/app/my-jobs");
  };

  // Multi-step form configuration
  const steps = [
    {
      title: "Company Information",
      description: "Tell us about your company",
      content: (
        <div className="space-y-4">
          <Input
            label="Company Name"
            name="company"
            placeholder="e.g. Tech Solutions Inc."
            value={formData.company}
            onChange={handleChange}
            error={errors.company}
          />
          <Input
            label="Company Website"
            name="companyWebsite"
            type="url"
            placeholder="https://www.company.com"
            value={formData.companyWebsite}
            onChange={handleChange}
            error={errors.companyWebsite}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Company Size"
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              options={companySizeOptions}
              error={errors.companySize}
            />
            <Input
              label="Industry"
              name="industry"
              placeholder="e.g. Technology, Healthcare"
              value={formData.industry}
              onChange={handleChange}
              error={errors.industry}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Job Details",
      description: "Provide job information",
      content: (
        <div className="space-y-4">
          <Input
            label="Job Title"
            name="title"
            placeholder="e.g. Senior React Developer"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Location"
              name="location"
              placeholder="e.g. New York, NY"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
            />
            <Select
              label="Work Mode"
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              options={workModeOptions}
              error={errors.workMode}
            />
          </div>
          <Select
            label="Job Type"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            options={jobTypeOptions}
            error={errors.jobType}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Salary Range"
                name="salary"
                placeholder="e.g. 80,000 - 120,000"
                value={formData.salary}
                onChange={handleChange}
                error={errors.salary}
              />
            </div>
            <Select
              label="Currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              options={currencyOptions}
              error={errors.currency}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Requirements",
      description: "Define candidate requirements",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Experience Level"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              options={experienceOptions}
              error={errors.experience}
            />
            <Select
              label="Education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              options={educationOptions}
              error={errors.education}
            />
          </div>
          <Input
            label="Required Skills (comma separated)"
            name="skills"
            placeholder="e.g. React, Node.js, MongoDB"
            value={formData.skills}
            onChange={handleChange}
            error={errors.skills}
          />
          <div>
            <label className={`block text-xs font-medium mb-2 ${theme.textSecondary}`}>
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
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border mb-6`}>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>Post a New Job</h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Create a job posting in 3 simple steps
        </p>
      </div>

      {/* Multi-Step Form */}
      <MultiStepForm steps={steps} onComplete={handleComplete} onCancel={handleCancel} />
    </div>
  );
};

export default PostJob;