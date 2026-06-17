import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Dashboard/Sidebar";
import { usePageTransition } from "../components/ui/PageWrapper.jsx";

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

  const [followedUsers, setFollowedUsers] = useState([]);
  const [showAllMessages, setShowAllMessages] = useState(false);
  const [showAllNews, setShowAllNews] = useState(false);

  const transitionRef = usePageTransition(); // Use the custom hook for page transition

  const [feed, setFeed] = useState(() =>
    homeJobFeed.map((job) => ({
      ...job,
      liked: false,
      likesCount: Math.floor(Math.random() * 50) + 1,
      commentsCount: Math.floor(Math.random() * 10) + 1,
      showCommentBox: false,
      showShareBox: false,
    }))
  );

  const [messages] = useState([
    { id: 1, name: "Zamira Lopez", avatar: "👤", online: true },
    { id: 2, name: "Magna Fox", avatar: "👤", online: false },
    { id: 3, name: "Zamira Lopez", avatar: "👤", online: true },
  ]);

  const [news] = useState([
    { id: 1, title: "Breakthrough in solar battery technology", time: "2h ago", readers: "762,682" },
    { id: 2, title: "Neuralink achieves wireless brain-testing", time: "5h ago", readers: "542,800" },
    { id: 3, title: "Global oil prices fall amid green energy shift", time: "8h ago", readers: "423,156" },
    { id: 4, title: "EduTech platforms merge to form new giant", time: "9h ago", readers: "0,190" },
    { id: 5, title: "Remote work visa launched in 10 new countries", time: "1d ago", readers: "2,365" },
  ]);

  const displayedMessages = showAllMessages ? messages : messages.slice(0, 3);
  const displayedNews = showAllNews ? news : news.slice(0, 5);

  const handleLike = (id) => {
    setFeed((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              liked: !item.liked,
              likesCount: item.liked ? item.likesCount - 1 : item.likesCount + 1,
            }
          : item
      )
    );
  };

  // Reusable panels to avoid duplication between mobile and desktop
  const MessagesPanel = () => (
    <div ref={transitionRef} className={`bg-white rounded-xl ${theme.shadow} overflow-hidden`}>
      <div className="p-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="font-semibold text-gray-700">Messages</h2>
      </div>
      <div className={`border-t ${theme.border}`}>
        {displayedMessages.map((message) => (
          <button
            key={message.id}
            className="w-full px-4 py-3 flex items-center gap-3 text-black hover:bg-gray-100 transition-colors"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                <img
                  src={`https://ui-avatars.com/api/?name=${message.name}&background=E8F4F8&color=1B365D&size=64`}
                  alt={message.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {message.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <p className="text-sm text-black text-left">{message.name}</p>
          </button>
        ))}
      </div>
      <button
        onClick={() => setShowAllMessages(!showAllMessages)}
        className={`w-full py-3 text-center text-sm ${theme.primaryText} font-medium hover:bg-gray-100 border-t ${theme.border}`}
      >
        {showAllMessages ? "Show less" : "Show more"} ▼
      </button>
    </div>
  );

  const NewsPanel = () => (
    <div className={`bg-white rounded-xl ${theme.shadow} overflow-hidden`}>
      <div className="p-4">
        <h2 className="font-semibold text-gray-700 mb-1">News</h2>
        <p className="text-xs text-gray-500">Top stories</p>
      </div>
      <div className={`border-t ${theme.border}`}>
        {displayedNews.map((item) => (
          <button
            key={item.id}
            className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-sm font-medium text-black mb-1">{item.title}</h3>
            <p className="text-xs text-gray-700">
              {item.time} • {item.readers} readers
            </p>
          </button>
        ))}
      </div>
      <button
        onClick={() => setShowAllNews(!showAllNews)}
        className={`w-full py-3 text-center text-sm ${theme.primaryText} font-medium hover:bg-gray-100 border-t ${theme.border}`}
      >
        {showAllNews ? "Show less" : "Show more"} ▼
      </button>
    </div>
  );

  return (
    // w-full fills AppLayout's <main>. max-w-6xl + mx-auto keeps content
    // from stretching too wide on large monitors.
    <div className={`w-full max-w-6xl mx-auto px-3 sm:px-4 py-4 ${theme.bg}`}>

      <div className="hidden lg:block mb-6">
        <Sidebar />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">

        {/* MAIN FEED */}
        <main className="flex-1 min-w-0 sm:w-100 w-70">
          <div className="flex flex-col gap-4 ">
            {feed.map((job) => (
              <div
                key={job.id}
                className={`p-3 sm:p-4 rounded-xl border border-gray-300/30 ${theme.cardBg}`}
              >
                <div className="flex gap-3 mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shrink-0"></div>
                  <div>
                    <strong className={`block text-sm sm:text-base ${theme.textPrimary}`}>
                      {job.author}
                    </strong>
                    <p className={`text-xs ${theme.textMuted}`}>{job.time}</p>
                  </div>
                </div>

                <h4 className={`text-sm sm:text-base font-semibold mb-2 ${theme.textPrimary}`}>
                  {job.title}
                </h4>
                <p className={`text-xs sm:text-sm leading-relaxed ${theme.textSecondary}`}>
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-300/30">
                  <button
                    onClick={() => handleLike(job.id)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm border transition ${
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
          <div className={`mt-6 p-4 w-full rounded-xl border border-gray-300/30 ${theme.cardBg}`}>
            <h4 className={`mb-4 font-semibold ${theme.textPrimary}`}>
              People you may know
            </h4>
            <div
              className="flex gap-4 overflow-x-auto pb-2"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#9CA3AF transparent" }}
            >
              {recommendations.map((user) => (
                <div
                  key={user.id}
                  className={`flex-shrink-0 w-36 sm:w-44 p-3 rounded-xl border border-gray-300/30 text-center ${theme.bg}`}
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-gray-400 mb-2"></div>
                  <strong className={`block text-sm ${theme.textPrimary} truncate px-1`}>
                    {user.name}
                  </strong>
                  <p className={`text-xs ${theme.textMuted} truncate px-1`}>{user.role}</p>
                  <button
                    disabled={followedUsers.includes(user.id)}
                    onClick={() => setFollowedUsers([...followedUsers, user.id])}
                    className={`mt-3 w-full py-1.5 rounded-full text-xs font-medium transition-all ${
                      followedUsers.includes(user.id)
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:shadow-lg"
                    }`}
                  >
                    {followedUsers.includes(user.id) ? "Following" : "Follow"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Messages & News — mobile/tablet only, stacked below feed */}
          <div className="block lg:hidden mt-6 space-y-4">
            <MessagesPanel />
            <NewsPanel />
          </div>
        </main>

        {/* RIGHT SIDEBAR — desktop only */}
        <aside className="hidden lg:block w-72 xl:w-80 flex-shrink-0 space-y-4">
          <MessagesPanel />
          <NewsPanel />
        </aside>
      </div>
    </div>
  );
};

export default Home;