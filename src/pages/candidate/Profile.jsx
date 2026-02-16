import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../ui/toast/useToast";
import Input from "../../ui/Input";

const Profile = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { showToast } = useToast();

  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Profile Data State
  const [profileData, setProfileData] = useState({
    name: user?.name || "Azlan Muhammed",
    title: user?.role === "employer" ? "Hiring Manager" : "UI/UX Designer",
    location: "Kerala",
    email: user?.email || "azlan@example.com",
    phone: "+91 9876543210",
    linkedin: "https://linkedin.com/in/azlan",
    github: "https://github.com/azlan",
    portfolio: "https://azlan.design",
    profilePicture: null,
    followers: 120,
    following: 45,
    followingPages: 8,
    viewers: 234,
    about: "Passionate UI/UX Designer with 3+ years of experience creating user-centered digital experiences. Skilled in Figma, Adobe XD, and user research methodologies. Love solving complex problems through simple and elegant design solutions.",
    experience: [
      {
        id: 1,
        title: "Senior UI/UX Designer",
        company: "Tech Solutions Inc",
        location: "Remote",
        duration: "2022 - Present",
        description: "Lead designer for web and mobile applications, conducting user research and creating high-fidelity prototypes.",
      },
      {
        id: 2,
        title: "Junior Designer",
        company: "Creative Agency",
        location: "Kochi, Kerala",
        duration: "2020 - 2022",
        description: "Designed user interfaces and conducted user research for various client projects.",
      },
    ],
    education: [
      {
        id: 1,
        institution: "St. Aloysius College Mangalore",
        degree: "B.Tech in Computer Engineering",
        fieldOfStudy: "Computer Science",
        years: "2021 - 2025",
        grade: "8.5 CGPA",
      },
    ],
    skills: ["Figma", "Adobe XD", "UI Design", "UX Research", "Prototyping", "Wireframing", "User Testing"],
    resume: null,
  });

  // Temporary edit state
  const [editData, setEditData] = useState({ ...profileData });
  const [newSkill, setNewSkill] = useState("");

  // Edit forms for Experience & Education
  const [editingExperience, setEditingExperience] = useState(null);
  const [editingEducation, setEditingEducation] = useState(null);

  // Messages and News (unchanged)
  const [messages] = useState([
    { id: 1, name: "Zamira lopez", avatar: "ZL", online: true },
    { id: 2, name: "Magna Fox", avatar: "MF", online: false },
    { id: 3, name: "Zamira lopez", avatar: "ZL", online: true },
  ]);

  const [news] = useState([
    {
      id: 1,
      title: "Breakthrough in solar battery technology",
      time: "2h ago",
      readers: "762,682",
    },
    {
      id: 2,
      title: "Neuralink achieves wireless brain-testing",
      time: "5h ago",
      readers: "542,800",
    },
    {
      id: 3,
      title: "Global oil prices fall amid green energy shift",
      time: "8h ago",
      readers: "423,156",
    },
  ]);

  const [showAllMessages, setShowAllMessages] = useState(false);
  const [showAllNews, setShowAllNews] = useState(false);

  const displayedMessages = showAllMessages ? messages : messages.slice(0, 3);
  const displayedNews = showAllNews ? news : news.slice(0, 3);

  // === HANDLERS ===

  const handleEditToggle = () => {
    if (isEditing) {
      setEditData({ ...profileData });
      setEditingExperience(null);
      setEditingEducation(null);
    } else {
      setEditData({ ...profileData });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setProfileData({ ...editData });
      setIsEditing(false);
      setEditingExperience(null);
      setEditingEducation(null);
      setLoading(false);
      showToast("Profile updated successfully!", "success");
    }, 1000);
  };

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  // Skills
  const handleAddSkill = () => {
    if (newSkill.trim() && !editData.skills.includes(newSkill.trim())) {
      setEditData({
        ...editData,
        skills: [...editData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditData({
      ...editData,
      skills: editData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  // Experience
  const handleAddExperience = () => {
    const newExp = {
      id: Date.now(),
      title: "",
      company: "",
      location: "",
      duration: "",
      description: "",
    };
    setEditingExperience(newExp);
  };

  const handleSaveExperience = () => {
    if (!editingExperience.title || !editingExperience.company) {
      showToast("Please fill required fields", "error");
      return;
    }

    const existingIndex = editData.experience.findIndex(
      (exp) => exp.id === editingExperience.id
    );

    if (existingIndex >= 0) {
      const updated = [...editData.experience];
      updated[existingIndex] = editingExperience;
      setEditData({ ...editData, experience: updated });
    } else {
      setEditData({
        ...editData,
        experience: [...editData.experience, editingExperience],
      });
    }

    setEditingExperience(null);
    showToast("Experience added successfully!", "success");
  };

  const handleEditExperience = (exp) => {
    setEditingExperience({ ...exp });
  };

  const handleDeleteExperience = (expId) => {
    setEditData({
      ...editData,
      experience: editData.experience.filter((exp) => exp.id !== expId),
    });
    showToast("Experience removed", "success");
  };

  // Education
  const handleAddEducation = () => {
    const newEdu = {
      id: Date.now(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      years: "",
      grade: "",
    };
    setEditingEducation(newEdu);
  };

  const handleSaveEducation = () => {
    if (!editingEducation.institution || !editingEducation.degree) {
      showToast("Please fill required fields", "error");
      return;
    }

    const existingIndex = editData.education.findIndex(
      (edu) => edu.id === editingEducation.id
    );

    if (existingIndex >= 0) {
      const updated = [...editData.education];
      updated[existingIndex] = editingEducation;
      setEditData({ ...editData, education: updated });
    } else {
      setEditData({
        ...editData,
        education: [...editData.education, editingEducation],
      });
    }

    setEditingEducation(null);
    showToast("Education added successfully!", "success");
  };

  const handleEditEducation = (edu) => {
    setEditingEducation({ ...edu });
  };

  const handleDeleteEducation = (eduId) => {
    setEditData({
      ...editData,
      education: editData.education.filter((edu) => edu.id !== eduId),
    });
    showToast("Education removed", "success");
  };

  // Resume Upload
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) {
      showToast("Please upload PDF or Word document only", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("File size must be less than 5MB", "error");
      return;
    }

    setEditData({ ...editData, resume: file });
    showToast("Resume uploaded successfully!", "success");
  };

  const handleRemoveResume = () => {
    setEditData({ ...editData, resume: null });
    showToast("Resume removed", "success");
  };

  // Profile Picture Upload
  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please upload an image file", "error");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      showToast("Image size must be less than 2MB", "error");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditData({ ...editData, profilePicture: reader.result });
      showToast("Profile picture updated!", "success");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <div className="lg:flex lg:gap-6 lg:px-6">
        {/* Center Content */}
        <div className="flex-1 space-y-4 lg:space-y-4">
          {/* Profile Header Card */}
          <div className={`overflow-hidden`}>
            {/* Desktop: Profile Header Background */}
            <div className={`hidden lg:block ${theme.cardBg} h-32 rounded-t-xl`}></div>

            {/* Mobile: Profile Section */}
            <div className={`lg:hidden`}>
              <div className={`${theme.cardBg} pt-16 pb-6 px-6 relative h-34 mb-40`}>
                <button className="absolute top-4 left-4 text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div className="flex flex-row">
                  <div className="justify-start mb-4 relative">
                    <div className="w-24 h-24 rounded-full bg-white border-4 border-white flex items-center justify-center overflow-hidden">
                      <img
                        src={
                          (isEditing ? editData.profilePicture : profileData.profilePicture) ||
                          `https://ui-avatars.com/api/?name=${profileData.name}&background=E8F4F8&color=1B365D&size=128`
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isEditing && (
                      <label
                        htmlFor="profile-pic-mobile"
                        className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <input
                          id="profile-pic-mobile"
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePictureUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  <div className="text-left mb-4 ml-5 mt-3">
                    <h1 className={`text-xl font-bold ${theme.textPrimary}`}>
                      {profileData.name}
                    </h1>
                    <p className={`text-sm ${theme.textSecondary} mt-1`}>
                      {profileData.title}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleEditToggle}
                    className={`flex-1 py-3 ${
                      isEditing ? `${theme.border} border ${theme.textPrimary}` : `${theme.primary} text-white`
                    } rounded-lg ${theme.primaryHover} hover:text-white font-medium text-sm`}
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </button>
                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className={`flex-1 py-3 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium text-sm`}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                  ) : (
                    <button
                      className={`flex-1 py-3 bg-white text-gray-700 border-2 ${theme.border} rounded-lg hover:bg-gray-50 font-medium text-sm`}
                    >
                      Share
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop: Profile Info */}
            <div className={`hidden lg:block relative px-6 -mt-16 pb-6 ${theme.cardBg} rounded-xl`}>
              <div className="flex items-end justify-between">
                <div className="flex items-end gap-4">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-white border-4 border-white flex items-center justify-center overflow-hidden">
                      <img
                        src={
                          (isEditing ? editData.profilePicture : profileData.profilePicture) ||
                          `https://ui-avatars.com/api/?name=${profileData.name}&background=E8F4F8&color=1B365D&size=256`
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isEditing && (
                      <label
                        htmlFor="profile-pic-desktop"
                        className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600"
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <input
                          id="profile-pic-desktop"
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePictureUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <div className="pb-2">
                    <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>
                      {profileData.name}
                    </h1>
                    <p className={`text-sm ${theme.textSecondary} mt-1`}>{profileData.title}</p>
                    <p className={`text-xs ${theme.textMuted} mt-1`}>{profileData.location}</p>
                  </div>
                </div>

                <div className="flex gap-3 pb-2">
                  <button
                    onClick={handleEditToggle}
                    className={`px-6 py-2 ${
                      isEditing ? `${theme.border} border ${theme.textPrimary}` : `${theme.primary} text-white`
                    } rounded-lg ${theme.hover} font-medium text-sm`}
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </button>
                  {isEditing && (
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className={`px-6 py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium text-sm`}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Bar - Mobile */}
            <div
              className={`lg:hidden ${theme.cardBg} mx-4 mt-4 mb-4 rounded-xl ${theme.shadow} overflow-hidden`}
            >
              <div className="grid grid-cols-2">
                <div className={`text-center py-6 border-r border-b ${theme.border}`}>
                  <p className={`text-3xl font-bold text-purple-500 mb-1`}>{profileData.followers}</p>
                  <p className={`text-sm ${theme.textPrimary} font-medium`}>Followers</p>
                </div>
                <div className={`text-center py-6 border-b ${theme.border}`}>
                  <p className={`text-3xl font-bold text-green-500 mb-1`}>{profileData.following}</p>
                  <p className={`text-sm ${theme.textPrimary} font-medium`}>Following</p>
                </div>
                <div className={`text-center py-6 border-r ${theme.border}`}>
                  <p className={`text-3xl font-bold text-blue-500 mb-1`}>
                    {profileData.followingPages}
                  </p>
                  <p className={`text-sm ${theme.textPrimary} font-medium`}>Following pages</p>
                </div>
                <div className={`text-center py-6`}>
                  <p className={`text-3xl font-bold ${theme.accentText} mb-1`}>{profileData.viewers}</p>
                  <p className={`text-sm ${theme.textPrimary} font-medium`}>Viewers</p>
                </div>
              </div>
            </div>

            {/* Stats Bar - Desktop */}
            <div
              className={`hidden lg:block border-t ${theme.border} px-6 py-4 mt-5 rounded-xl ${theme.cardBg}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-28">
                  <div className="text-center">
                    <p className={`text-xs ${theme.textMuted} mb-1`}>Followers</p>
                    <p className={`text-lg font-semibold text-violet-500`}>{profileData.followers}</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-xs ${theme.textMuted} mb-1`}>Following</p>
                    <p className={`text-lg font-semibold text-green-500`}>{profileData.following}</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-xs ${theme.textMuted} mb-1`}>Following pages</p>
                    <p className={`text-lg font-semibold text-blue-500`}>
                      {profileData.followingPages}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className={`text-xs ${theme.textMuted} mb-1`}>Viewers</p>
                    <p className={`text-lg font-semibold ${theme.accentText}`}>{profileData.viewers}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information - EDIT MODE */}
          {isEditing && (
            <div className={`${theme.cardBg} rounded-xl ${theme.shadow} p-6 mx-4 lg:mx-0`}>
              <h2 className={`text-lg font-semibold ${theme.textPrimary} mb-4`}>
                Contact Information
              </h2>
              <div className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <Input
                  label="Phone"
                  value={editData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                <Input
                  label="Location"
                  value={editData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
                <Input
                  label="Professional Title"
                  value={editData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Social Links - EDIT MODE */}
          {isEditing && (
            <div className={`${theme.cardBg} rounded-xl ${theme.shadow} p-6 mx-4 lg:mx-0`}>
              <h2 className={`text-lg font-semibold ${theme.textPrimary} mb-4`}>Social Links</h2>
              <div className="space-y-4">
                <Input
                  label="LinkedIn"
                  value={editData.linkedin}
                  onChange={(e) => handleChange("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
                <Input
                  label="GitHub"
                  value={editData.github}
                  onChange={(e) => handleChange("github", e.target.value)}
                  placeholder="https://github.com/yourprofile"
                />
                <Input
                  label="Portfolio"
                  value={editData.portfolio}
                  onChange={(e) => handleChange("portfolio", e.target.value)}
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>
          )}

          {/* About Section */}
          <div className={`${theme.cardBg} rounded-xl ${theme.shadow} p-6 mx-4 lg:mx-0`}>
            <h2 className={`text-lg font-semibold ${theme.textPrimary} mb-3`}>About</h2>
            {isEditing ? (
              <textarea
                value={editData.about}
                onChange={(e) => handleChange("about", e.target.value)}
                rows={4}
                placeholder="Tell us about yourself..."
                className={`w-full px-4 py-3 rounded-lg ${theme.border} border ${theme.textPrimary} ${theme.focus} ${theme.cardBg} text-sm resize-none outline-none`}
              />
            ) : (
              <p className={`text-sm ${theme.textSecondary}`}>{profileData.about}</p>
            )}
          </div>

          {/* Skills Section */}
          <div className={`${theme.cardBg} rounded-xl ${theme.shadow} p-6 mx-4 lg:mx-0`}>
            <h2 className={`text-lg font-semibold ${theme.textPrimary} mb-4`}>Skills</h2>

            {isEditing && (
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                  placeholder="Add a skill..."
                  className={`flex-1 px-4 py-2 rounded-lg ${theme.border} border ${theme.textPrimary} ${theme.focus} ${theme.cardBg} text-sm outline-none`}
                />
                <button
                  onClick={handleAddSkill}
                  className={`px-4 py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium text-sm`}
                >
                  Add
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {(isEditing ? editData.skills : profileData.skills).map((skill, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 ${theme.infoBg} ${theme.infoText} rounded-full text-sm font-medium flex items-center gap-2`}
                >
                  {skill}
                  {isEditing && (
                    <button onClick={() => handleRemoveSkill(skill)} className="hover:text-red-500">
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className={`${theme.cardBg} rounded-xl ${theme.shadow} p-6 mx-4 lg:mx-0`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${theme.textPrimary}`}>Experience</h2>
              {isEditing && !editingExperience && (
                <button
                  onClick={handleAddExperience}
                  className={`px-4 py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium text-sm flex items-center gap-2`}
                >
                  <span>+</span> Add Experience
                </button>
              )}
            </div>

            {/* Experience Form (Edit/Add) */}
            {editingExperience && (
              <div className={`p-4 ${theme.bg} rounded-lg mb-4 space-y-3`}>
                <Input
                  label="Job Title *"
                  value={editingExperience.title}
                  onChange={(e) =>
                    setEditingExperience({ ...editingExperience, title: e.target.value })
                  }
                  placeholder="e.g. Senior UI/UX Designer"
                />
                <Input
                  label="Company *"
                  value={editingExperience.company}
                  onChange={(e) =>
                    setEditingExperience({ ...editingExperience, company: e.target.value })
                  }
                  placeholder="e.g. Tech Solutions Inc"
                />
                <Input
                  label="Location"
                  value={editingExperience.location}
                  onChange={(e) =>
                    setEditingExperience({ ...editingExperience, location: e.target.value })
                  }
                  placeholder="e.g. Remote or Kochi, Kerala"
                />
                <Input
                  label="Duration"
                  value={editingExperience.duration}
                  onChange={(e) =>
                    setEditingExperience({ ...editingExperience, duration: e.target.value })
                  }
                  placeholder="e.g. 2022 - Present"
                />
                <div>
                  <label className={`block text-xs font-medium mb-2 ${theme.textSecondary}`}>
                    Description
                  </label>
                  <textarea
                    value={editingExperience.description}
                    onChange={(e) =>
                      setEditingExperience({ ...editingExperience, description: e.target.value })
                    }
                    rows={3}
                    placeholder="Describe your role and responsibilities..."
                    className={`w-full px-4 py-3 rounded-lg ${theme.border} border ${theme.textPrimary} ${theme.focus} ${theme.cardBg} text-sm resize-none outline-none`}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveExperience}
                    className={`px-4 py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium text-sm`}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingExperience(null)}
                    className={`px-4 py-2 ${theme.border} border rounded-lg ${theme.hover} font-medium text-sm`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Experience List */}
            <div className="space-y-4">
              {(isEditing ? editData.experience : profileData.experience).map((exp) => (
                <div key={exp.id} className={`pb-4 border-b ${theme.border} last:border-0`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-semibold ${theme.textPrimary}`}>{exp.title}</h3>
                      <p className={`text-sm ${theme.textSecondary} mt-1`}>{exp.company}</p>
                      {exp.location && (
                        <p className={`text-xs ${theme.textMuted} mt-1`}>{exp.location}</p>
                      )}
                      <p className={`text-xs ${theme.textMuted} mt-1`}>{exp.duration}</p>
                      <p className={`text-sm ${theme.textSecondary} mt-2`}>{exp.description}</p>
                    </div>
                    {isEditing && !editingExperience && (
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEditExperience(exp)}
                          className={`${theme.primaryText} text-sm hover:underline`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteExperience(exp.id)}
                          className={`${theme.dangerText} text-sm hover:underline`}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className={`${theme.cardBg} rounded-xl ${theme.shadow} p-6 mx-4 lg:mx-0`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${theme.textPrimary}`}>Education</h2>
              {isEditing && !editingEducation && (
                <button
                  onClick={handleAddEducation}
                  className={`px-4 py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium text-sm flex items-center gap-2`}
                >
                  <span>+</span> Add Education
                </button>
              )}
            </div>

            {/* Education Form (Edit/Add) */}
            {editingEducation && (
              <div className={`p-4 ${theme.bg} rounded-lg mb-4 space-y-3`}>
                <Input
                  label="Institution *"
                  value={editingEducation.institution}
                  onChange={(e) =>
                    setEditingEducation({ ...editingEducation, institution: e.target.value })
                  }
                  placeholder="e.g. St. Aloysius College"
                />
                <Input
                  label="Degree *"
                  value={editingEducation.degree}
                  onChange={(e) =>
                    setEditingEducation({ ...editingEducation, degree: e.target.value })
                  }
                  placeholder="e.g. B.Tech in Computer Engineering"
                />
                <Input
                  label="Field of Study"
                  value={editingEducation.fieldOfStudy}
                  onChange={(e) =>
                    setEditingEducation({ ...editingEducation, fieldOfStudy: e.target.value })
                  }
                  placeholder="e.g. Computer Science"
                />
                <Input
                  label="Years"
                  value={editingEducation.years}
                  onChange={(e) =>
                    setEditingEducation({ ...editingEducation, years: e.target.value })
                  }
                  placeholder="e.g. 2021 - 2025"
                />
                <Input
                  label="Grade/CGPA"
                  value={editingEducation.grade}
                  onChange={(e) =>
                    setEditingEducation({ ...editingEducation, grade: e.target.value })
                  }
                  placeholder="e.g. 8.5 CGPA"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEducation}
                    className={`px-4 py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium text-sm`}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingEducation(null)}
                    className={`px-4 py-2 ${theme.border} border rounded-lg ${theme.hover} font-medium text-sm`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Education List */}
            <div className="space-y-4">
              {(isEditing ? editData.education : profileData.education).map((edu) => (
                <div key={edu.id} className={`pb-4 border-b ${theme.border} last:border-0`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-semibold ${theme.textPrimary} text-sm`}>
                        {edu.institution}
                      </h3>
                      <p className={`text-sm ${theme.textSecondary} mt-1`}>{edu.degree}</p>
                      {edu.fieldOfStudy && (
                        <p className={`text-xs ${theme.textMuted} mt-1`}>{edu.fieldOfStudy}</p>
                      )}
                      <p className={`text-xs ${theme.textMuted} mt-1`}>{edu.years}</p>
                      {edu.grade && (
                        <p className={`text-xs ${theme.textMuted} mt-1`}>Grade: {edu.grade}</p>
                      )}
                    </div>
                    {isEditing && !editingEducation && (
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEditEducation(edu)}
                          className={`${theme.primaryText} text-sm hover:underline`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEducation(edu.id)}
                          className={`${theme.dangerText} text-sm hover:underline`}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resume Upload Section */}
          <div className={`${theme.cardBg} rounded-xl ${theme.shadow} p-6 mx-4 lg:mx-0`}>
            <h2 className={`text-lg font-semibold ${theme.textPrimary} mb-4`}>Resume</h2>
            {(isEditing ? editData.resume : profileData.resume) ? (
              <div className={`flex items-center justify-between p-4 ${theme.bg} rounded-lg`}>
                <div className="flex items-center gap-3">
                  <svg
                    className={`w-8 h-8 ${theme.primaryText}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className={`text-sm font-medium ${theme.textPrimary}`}>
                      {(isEditing ? editData.resume : profileData.resume)?.name || "resume.pdf"}
                    </p>
                    <p className={`text-xs ${theme.textMuted}`}>
                      {((isEditing ? editData.resume : profileData.resume)?.size / 1024).toFixed(
                        0
                      )}{" "}
                      KB
                    </p>
                  </div>
                </div>
                {isEditing && (
                  <button
                    onClick={handleRemoveResume}
                    className={`${theme.dangerText} hover:underline text-sm`}
                  >
                    Remove
                  </button>
                )}
              </div>
            ) : isEditing ? (
              <div className={`border-2 border-dashed ${theme.border} rounded-lg p-8 text-center`}>
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <svg
                    className={`w-12 h-12 mx-auto ${theme.textMuted} mb-3`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className={`text-sm ${theme.textPrimary} font-medium mb-1`}>
                    Click to upload or drag and drop
                  </p>
                  <p className={`text-xs ${theme.textMuted}`}>PDF or Word (MAX. 5MB)</p>
                </label>
              </div>
            ) : (
              <p className={`text-sm ${theme.textMuted}`}>No resume uploaded yet</p>
            )}
          </div>
        </div>

        {/* Right Sidebar - Desktop Only */}
        <div className="hidden lg:block w-80 flex-shrink-0 space-y-4">
          {/* Messages Section */}
          <div className={`bg-white rounded-xl ${theme.shadow} overflow-hidden`}>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <svg className={`w-5 h-5`} fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <h2 className={`font-semibold`}>Messages</h2>
              </div>
            </div>

            <div className={`border-t ${theme.border}`}>
              {displayedMessages.map((message) => (
                <button
                  key={message.id}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-300 transition-colors`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                      <img
                        src={`https://ui-avatars.com/api/?name=${message.avatar}&background=E8F4F8&color=1B365D&size=64`}
                        alt={message.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {message.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <p className={`text-sm text-black text-left`}>{message.name}</p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAllMessages(!showAllMessages)}
              className={`w-full py-3 text-center text-sm ${theme.primaryText} font-medium hover:bg-gray-300 border-t ${theme.border}`}
            >
              {showAllMessages ? "Show less" : "Show more"} ▼
            </button>
          </div>

          {/* News Section */}
          <div className={`bg-white rounded-xl ${theme.shadow} overflow-hidden`}> <div className="p-4">
              <h2 className={`font-semibold text-gray-700 mb-1`}>News</h2>
              <p className={`text-xs ${theme.textMuted}`}>Top stories</p>
            </div>

            <div className={`border-t ${theme.border}`}>
              {displayedNews.map((item) => (
                <button
                  key={item.id}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-300 transition-colors`}
                >
                  <h3 className={`text-sm font-medium text-black mb-1`}>{item.title}</h3>
                  <p className={`text-xs ${theme.textMuted}`}>
                    {item.time} • {item.readers} readers
                  </p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAllNews(!showAllNews)}
              className={`w-full py-3 text-center hover:bg-gray-300 text-sm ${theme.primaryText} font-medium border-t ${theme.border}`}
            >
              {showAllNews ? "Show less" : "Show more"} ▼
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;