import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const homeJobFeed = [
  {
    id: 1,
    author: "recruitmentzceser",
    time: "20 Jan 26 · 02:35 AM",
    title: "Digital Marketing Executive",
    description:
      "We're hiring a Digital Marketing Executive. Skills: SEO / SEM · Social Media Marketing · Content Strategy. Experience: 1–2 years. Work Mode: Remote 🌍",
  },
  {
    id: 2,
    author: "Adwaith",
    time: "21 Jan 26 · 10:52 AM",
    title: "MERN Stack Developer",
    description:
      "Hiring MERN Stack Developer. Skills: MongoDB, Express, React, Node.js. Experience: 2–3 years. Work Mode: Remote.",
  },
  {
    id: 3,
    author: "HR Team",
    time: "22 Jan 26 · 09:10 AM",
    title: "UI Developer",
    description: "Looking for UI Developer with strong CSS & React skills.",
  },
];

const recommendations = [
  { id: 1, name: "Adwaith", role: "MERN Developer" },
  { id: 2, name: "Aravind", role: "UI Engineer" },
  { id: 3, name: "Deepu Das", role: "Product Designer" },
  { id: 4, name: "Sreya", role: "Frontend Developer" },
  { id: 5, name: "Deepu Das", role: "Product Designer" },
];

const Home = () => {
  const { theme } = useTheme();
  const [showMoreNews, setShowMoreNews] = useState(false);
  const [followedUsers, setFollowedUsers] = useState([]);

  const [feed, setFeed] = useState(
    homeJobFeed.map((job) => ({
      ...job,
      liked: false,
      likesCount: Math.floor(Math.random() * 50) + 1,
      commentsCount: Math.floor(Math.random() * 10) + 1,
      showCommentBox: false,
      showShareBox: false,
    }))
  );

  const handleLike = (id) => {
    setFeed((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              liked: !item.liked,
              likesCount: item.liked
                ? item.likesCount - 1
                : item.likesCount + 1,
            }
          : item
      )
    );
  };

  return (
    <div className="max-w-[1200px] mx-auto px-3 sm:px-5 lg:px-8 py-4">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* MAIN FEED */}
        <main className="flex-1 min-w-0">
          <div className="flex flex-col gap-4">
            {feed.map((job) => (
              <div
                key={job.id}
                className={`p-3 sm:p-4 rounded-xl border border-gray-300/30 ${theme.cardBg}`}
              >
                {/* HEADER */}
                <div className="flex gap-3 mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shrink-0"></div>
                  <div>
                    <strong
                      className={`block text-sm sm:text-base ${theme.textPrimary}`}
                    >
                      {job.author}
                    </strong>
                    <p className={`text-xs ${theme.textMuted}`}>
                      {job.time}
                    </p>
                  </div>
                </div>

                {/* CONTENT */}
                <h4
                  className={`text-sm sm:text-base font-semibold mb-2 ${theme.textPrimary}`}
                >
                  {job.title}
                </h4>
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${theme.textSecondary}`}
                >
                  {job.description}
                </p>

                {/* ACTIONS */}
                <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-300/30">
                  <button
                    onClick={() => handleLike(job.id)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm border transition
                    ${
                      job.liked
                        ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-transparent"
                        : "border-gray-400/30 hover:bg-gray-400/10"
                    }`}
                  >
                    {job.liked ? "❤️" : "🤍"} {job.likesCount}
                  </button>

                  <button className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm border border-gray-400/30 hover:bg-gray-400/10 transition">
                    💬 {job.commentsCount}
                  </button>

                  <button className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm border border-gray-400/30 hover:bg-gray-400/10 transition">
                    ✈️ Share
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RECOMMENDATIONS */}
          <div
            className={`mt-6 p-4 rounded-xl border border-gray-300/30 ${theme.cardBg}`}
          >
            <h4 className={`mb-4 font-semibold ${theme.textPrimary}`}>
              People you may know
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {recommendations.map((user) => (
                <div
                  key={user.id}
                  className={`p-3 rounded-xl border border-gray-300/30 text-center ${theme.bg}`}
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-gray-400 mb-2"></div>
                  <strong
                    className={`block text-sm ${theme.textPrimary}`}
                  >
                    {user.name}
                  </strong>
                  <p className={`text-xs ${theme.textMuted}`}>
                    {user.role}
                  </p>
                  <button
                    disabled={followedUsers.includes(user.id)}
                    onClick={() =>
                      setFollowedUsers([...followedUsers, user.id])
                    }
                    className={`mt-3 w-full py-1.5 rounded-full text-xs font-medium
                    ${
                      followedUsers.includes(user.id)
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                    }`}
                  >
                    {followedUsers.includes(user.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* SIDEBAR - Desktop Only */}
        <aside className="hidden lg:block w-[280px]">
          <div
            className={`p-4 rounded-xl border border-gray-300/30 ${theme.cardBg}`}
          >
            <h3 className={`font-semibold mb-3 ${theme.textPrimary}`}>
              News
            </h3>
            <ul className="space-y-2 text-sm">
              <li className={theme.textSecondary}>React 19 released</li>
              <li className={theme.textSecondary}>Hiring trends 2026</li>
              {showMoreNews && (
                <>
                  <li className={theme.textSecondary}>
                    Remote jobs increase
                  </li>
                  <li className={theme.textSecondary}>
                    AI in recruitment
                  </li>
                </>
              )}
            </ul>
            <button
              onClick={() => setShowMoreNews(!showMoreNews)}
              className={`mt-3 text-sm font-semibold ${theme.primaryText}`}
            >
              {showMoreNews ? "Show less" : "Show more"}
            </button>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default Home;
