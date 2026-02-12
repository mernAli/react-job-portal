import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/ThemeContext";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useToast } from "../../ui/toast/useToast";

const Profile = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 234 567 8901",
    location: "New York, NY",
    title: "Full Stack Developer",
    experience: "5 years",
    bio: "Passionate developer with expertise in React, Node.js, and modern web technologies. Always eager to learn and build innovative solutions.",
    skills: "React, Node.js, JavaScript, TypeScript, MongoDB",
    education: "Bachelor's in Computer Science",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    portfolio: "https://johndoe.dev",
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Profile Updated:", profileData);
      showToast("Profile updated successfully!", "success");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>My Profile</h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Update your information to improve your visibility to employers
        </p>
      </div>

      {/* Profile Picture Section */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <h2 className={`text-lg font-semibold ${theme.textPrimary} mb-4`}>
          Profile Picture
        </h2>
        <div className="flex items-center gap-6">
          <div className={`w-24 h-24 ${theme.primary} rounded-full flex items-center justify-center text-white text-3xl font-bold`}>
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <button className={`px-4 py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium text-sm`}>
              Upload Photo
            </button>
            <p className={`text-xs ${theme.textMuted} mt-2`}>
              JPG or PNG. Max size of 2MB.
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <h2 className={`text-lg font-semibold ${theme.textPrimary} mb-4`}>
          Personal Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Full Name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleChange}
            />
            <Input
              label="Phone Number"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
            />
            <Input
              label="Location"
              name="location"
              value={profileData.location}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Professional Title"
            name="title"
            placeholder="e.g. Full Stack Developer"
            value={profileData.title}
            onChange={handleChange}
          />

          <Input
            label="Years of Experience"
            name="experience"
            placeholder="e.g. 5 years"
            value={profileData.experience}
            onChange={handleChange}
          />

          <div>
            <label className={`block text-xs font-medium mb-2 ${theme.textSecondary}`}>
              Bio
            </label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Tell employers about yourself..."
              className={`w-full px-4 py-3 rounded-lg ${theme.border} border ${theme.textPrimary} ${theme.focus} ${theme.cardBg} text-sm resize-none outline-none`}
            />
          </div>

          <Input
            label="Skills (comma separated)"
            name="skills"
            placeholder="e.g. React, Node.js, MongoDB"
            value={profileData.skills}
            onChange={handleChange}
          />

          <Input
            label="Education"
            name="education"
            placeholder="e.g. Bachelor's in Computer Science"
            value={profileData.education}
            onChange={handleChange}
          />

          {/* Social Links */}
          <div className={`border-t ${theme.border} pt-5 mt-5`}>
            <h3 className={`text-md font-semibold ${theme.textPrimary} mb-4`}>
              Social Links
            </h3>
            <div className="space-y-4">
              <Input
                label="LinkedIn Profile"
                name="linkedin"
                placeholder="https://linkedin.com/in/yourprofile"
                value={profileData.linkedin}
                onChange={handleChange}
              />
              <Input
                label="GitHub Profile"
                name="github"
                placeholder="https://github.com/yourprofile"
                value={profileData.github}
                onChange={handleChange}
              />
              <Input
                label="Portfolio Website"
                name="portfolio"
                placeholder="https://yourportfolio.com"
                value={profileData.portfolio}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" loading={loading} fullWidth>
              Save Changes
            </Button>
            <button
              type="button"
              className={`px-6 py-3 ${theme.border} border rounded-lg ${theme.hover} font-medium`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Resume Section */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <h2 className={`text-lg font-semibold ${theme.textPrimary} mb-4`}>Resume</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className={`text-sm ${theme.textSecondary}`}>
              Upload your resume to make it easier for employers to review your
              qualifications
            </p>
            <p className={`text-xs ${theme.textMuted} mt-1`}>PDF format, max 5MB</p>
          </div>
          <button className={`px-4 py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium text-sm whitespace-nowrap`}>
            Upload Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;