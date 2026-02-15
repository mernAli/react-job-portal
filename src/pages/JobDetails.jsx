import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../ui/toast/useToast";

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { showToast } = useToast();

  // Mock job data (in real app, fetch by jobId)
  const job = {
    id: jobId,
    title: "Senior React Developer",
    company: "Tech Solutions Inc.",
    location: "New York, NY",
    workMode: "Hybrid",
    jobType: "Full Time",
    salary: "80k - 120k",
    currency: "$",
    experience: "Mid Level",
    education: "Bachelor's Degree",
    postedDate: "2026-02-10",
    skills: ["React", "TypeScript", "Node.js", "MongoDB", "AWS"],
    description: `We are looking for an experienced React Developer to join our dynamic team. 

You will be responsible for developing and maintaining web applications using React.js and related technologies.

Key Responsibilities:
- Design and develop user interfaces using React
- Collaborate with backend developers to integrate APIs
- Write clean, maintainable code
- Participate in code reviews
- Mentor junior developers

Requirements:
- 3+ years of experience with React
- Strong understanding of JavaScript/TypeScript
- Experience with state management (Redux, Context API)
- Familiarity with RESTful APIs
- Excellent problem-solving skills`,
    benefits: [
      "Health Insurance",
      "401(k) Matching",
      "Remote Work Options",
      "Professional Development",
      "Paid Time Off",
    ],
    companyInfo: {
      size: "51-200 employees",
      industry: "Technology",
      website: "https://techsolutions.com",
      description: "Leading technology company specializing in web solutions",
    },
  };

  const handleApply = () => {
    showToast("Application submitted successfully!", "success");
    setTimeout(() => navigate("/app/my-applications"), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className={`mb-4 flex items-center gap-2 ${theme.textSecondary} hover:${theme.textPrimary}`}
      >
        ← Back to Jobs
      </button>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Job Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-16 h-16 ${theme.infoBg} rounded-lg flex items-center justify-center`}>
                <span className={`text-2xl font-bold ${theme.infoText}`}>
                  {job.company.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h1 className={`text-2xl font-bold ${theme.textPrimary} mb-2`}>
                  {job.title}
                </h1>
                <p className={`text-lg ${theme.textSecondary} mb-2`}>{job.company}</p>
                <div className={`flex flex-wrap gap-2 text-sm ${theme.textMuted}`}>
                  <span>📍 {job.location}</span>
                  <span>•</span>
                  <span>💼 {job.workMode}</span>
                  <span>•</span>
                  <span>⏰ {job.jobType}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t">
              <div>
                <p className={`text-xs ${theme.textMuted}`}>Salary</p>
                <p className={`text-lg font-bold ${theme.successText}`}>
                  {job.currency} {job.salary}
                </p>
              </div>
              <div>
                <p className={`text-xs ${theme.textMuted}`}>Experience</p>
                <p className={`font-semibold ${theme.textPrimary}`}>{job.experience}</p>
              </div>
              <div>
                <p className={`text-xs ${theme.textMuted}`}>Education</p>
                <p className={`font-semibold ${theme.textPrimary}`}>{job.education}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
            <h2 className={`text-lg font-bold ${theme.textPrimary} mb-4`}>
              Job Description
            </h2>
            <div className={`${theme.textSecondary} whitespace-pre-line text-sm leading-relaxed`}>
              {job.description}
            </div>
          </div>

          {/* Skills Required */}
          <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
            <h2 className={`text-lg font-bold ${theme.textPrimary} mb-4`}>
              Skills Required
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 ${theme.infoBg} ${theme.infoText} rounded-lg font-medium text-sm`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
            <h2 className={`text-lg font-bold ${theme.textPrimary} mb-4`}>Benefits</h2>
            <ul className="space-y-2">
              {job.benefits.map((benefit, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-2 ${theme.textSecondary} text-sm`}
                >
                  <span className="text-green-500">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="lg:col-span-1">
          {/* Apply Card */}
          <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border sticky top-20 space-y-4`}>
            <button
              onClick={handleApply}
              className={`w-full py-3 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-semibold`}
            >
              Apply Now
            </button>
            <button
              className={`w-full py-3 ${theme.border} border rounded-lg ${theme.hover} font-semibold`}
            >
              Save Job
            </button>

            <div className={`pt-4 border-t ${theme.border}`}>
              <p className={`text-xs ${theme.textMuted} mb-2`}>Posted</p>
              <p className={`text-sm font-semibold ${theme.textPrimary}`}>
                {new Date(job.postedDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Company Info */}
            <div className={`pt-4 border-t ${theme.border}`}>
              <h3 className={`font-semibold ${theme.textPrimary} mb-3`}>
                About Company
              </h3>
              <div className="space-y-2 text-sm">
                <p className={theme.textSecondary}>{job.companyInfo.description}</p>
                <div className={`flex items-center gap-2 ${theme.textMuted}`}>
                  <span>👥</span>
                  <span>{job.companyInfo.size}</span>
                </div>
                <div className={`flex items-center gap-2 ${theme.textMuted}`}>
                  <span>🏢</span>
                  <span>{job.companyInfo.industry}</span>
                </div>
                <a
                  href={job.companyInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 ${theme.primaryText} hover:underline`}
                >
                  <span>🌐</span>
                  <span>Visit Website</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;