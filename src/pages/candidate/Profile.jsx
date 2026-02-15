import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../ui/toast/useToast";

const Profile = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { showToast } = useToast();

  const [profileData] = useState({
    name: user?.name || "",
    title: user?.role === "employer" ? "Hiring Manager" : "Developer",
    location: "Kerala",
    followers: 0,
    following: 0,
    followingPages: 0,
    viewers: 3,
    about: "No bio",
    activity: "No activities",
    education: {
      institution: "St. Aloysius College Mangalore- Mangalore",
      degree: "Computer Engineering",
      years: "2021-2025",
    },
  });

  const [messages] = useState([
    { id: 1, name: "Zamira lopez", avatar: "👤", online: true },
    { id: 2, name: "Magna Fox", avatar: "👤", online: false },
    { id: 3, name: "Zamira lopez", avatar: "👤", online: true },
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
    {
      id: 4,
      title: "EduTech platforms merge to form new giant",
      time: "9h ago",
      readers: "0,190",
    },
    {
      id: 5,
      title: "Remote work visa launched in 10 new countries",
      time: "1d ago",
      readers: "2,365",
    },
  ]);

  const [showAllMessages, setShowAllMessages] = useState(false);
  const [showAllNews, setShowAllNews] = useState(false);

  const displayedMessages = showAllMessages ? messages : messages.slice(0, 3);
  const displayedNews = showAllNews ? news : news.slice(0, 5);

  return (
    <div className="flex gap-6">
      {/* Center Content */}
      <div className="flex-1 space-y-4">
        {/* Profile Header Card */}
        <div
          className={`${theme.bg}  overflow-hidden`}
        >
          {/* Profile Header Background */}
          <div className={`${theme.cardBg} h-27`}></div>

          {/* Profile Info */}
          <div className="relative px-6 -mt-16 -pb-6">
            <div className="flex items-end justify-between">
              {/* Avatar and Name */}
              <div className="flex items-end gap-4">
                <div className="w-30 h-30 rounded-full bg-white border-4 border-white flex items-center justify-center overflow-hidden">
                  <p className="text-4xl">👤</p>
                </div>
                <div className="pb-2 mb-16">
                  <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>
                    {profileData.name}
                  </h1>
                  <p className={`text-sm ${theme.textSecondary} mt-1`}>
                    {profileData.title}
                  </p>
                  <p className={`text-xs ${theme.textMuted} mt-1`}>
                    {profileData.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={`flex gap-3 pb-2 mt-5 ${theme.bg}`}>
              <button
                className={`px-6 py-2 ${theme.primary} ${theme.secondaryText} rounded-lg ${theme.primaryHover} font-medium text-sm flex items-center gap-2`}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                Follow
              </button>
              <button
                className={`px-6 py-2 ${theme.cardBg} ${theme.textPrimary} ${theme.border} border rounded-lg ${theme.hover} font-medium text-sm flex items-center gap-2`}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                Message
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className={`border-t ${theme.border} px-6 py-4 mt-5 rounded-xl ${theme.cardBg}`}>
            <div className="flex items-center justify-between">
              <div className="flex gap-12">
                <div className="text-center">
                  <p className={`text-xs ${theme.textMuted} mb-1`}>Followers</p>
                  <p className={`text-lg font-semibold ${theme.textPrimary}`}>
                    {profileData.followers}
                  </p>
                </div>
                <div className="text-center">
                  <p className={`text-xs ${theme.textMuted} mb-1`}>Following</p>
                  <p className={`text-lg font-semibold ${theme.textPrimary}`}>
                    {profileData.following}
                  </p>
                </div>
                <div className="text-center">
                  <p className={`text-xs ${theme.textMuted} mb-1`}>
                    Following pages
                  </p>
                  <p className={`text-lg font-semibold ${theme.textPrimary}`}>
                    {profileData.followingPages}
                  </p>
                </div>
                <div className="text-center">
                  <p className={`text-xs ${theme.textMuted} mb-1`}>Viewers</p>
                  <p className={`text-lg font-semibold ${theme.accentText}`}>
                    {profileData.viewers}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className={`${theme.cardBg} rounded-xl ${theme.shadow} p-6`}>
          <h2 className={`text-lg font-semibold ${theme.textPrimary} mb-3`}>
            About
          </h2>
          <p className={`text-sm ${theme.textSecondary}`}>
            {profileData.about}
          </p>
        </div>

        {/* Activity Section */}
        <div className={`${theme.cardBg} rounded-xl ${theme.shadow} p-6`}>
          <h2 className={`text-lg font-semibold ${theme.textPrimary} mb-3`}>
            Activity
          </h2>
          <p className={`text-sm ${theme.textSecondary}`}>
            {profileData.activity}
          </p>
        </div>

        {/* Education Section */}
        <div className={`${theme.cardBg} rounded-xl ${theme.shadow} p-6`}>
          <h2 className={`text-lg font-semibold ${theme.textPrimary} mb-4`}>
            Education
          </h2>
          <div>
            <h3 className={`font-semibold ${theme.textPrimary} text-sm`}>
              {profileData.education.institution}
            </h3>
            <p className={`text-sm ${theme.textSecondary} mt-1`}>
              {profileData.education.degree}
            </p>
            <p className={`text-xs ${theme.textMuted} mt-1`}>
              {profileData.education.years}
            </p>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 flex-shrink-0 space-y-4">
        {/* Messages Section */}
        <div
          className={` bg-white rounded-xl ${theme.shadow} overflow-hidden`}
        >
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                className={`w-5 h-5 ${theme.textSecondary}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
              <h2 className={`font-semibold ${theme.textPrimary}`}>Messages</h2>
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
                <p className={`text-sm ${theme.textPrimary} text-left`}>
                  {message.name}
                </p>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAllMessages(!showAllMessages)}
            className={`w-full py-3 text-center text-sm ${theme.primaryText} font-medium hover:bg-gray-500  border-t ${theme.border}`}
          >
            {showAllMessages ? "Show less" : "Show more"} ▼
          </button>
        </div>

        {/* News Section */}
        <div
          className={`bg-white rounded-xl ${theme.shadow} overflow-hidden`}
        >
          <div className="p-4 ">
            <h2 className={`font-semibold ${theme.textPrimary} mb-1`}>News</h2>
            <p className={`text-xs ${theme.textMuted}`}>Top stories</p>
          </div>

          <div className={`border-t ${theme.border}`}>
            {displayedNews.map((item) => (
              <button
                key={item.id}
                className={`w-full px-4 py-3 text-left hover:bg-gray-300 transition-colors`}
              >
                <h3 className={`text-sm font-medium ${theme.textPrimary} mb-1`}>
                  {item.title}
                </h3>
                <p className={`text-xs ${theme.textMuted}`}>
                  {item.time} • {item.readers} readers
                </p>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAllNews(!showAllNews)}
            className={`w-full py-3 text-center hover:bg-gray-500 text-sm ${theme.primaryText} font-medium ${theme.hover} border-t ${theme.border}`}
          >
            {showAllNews ? "Show less" : "Show more"} ▼
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
