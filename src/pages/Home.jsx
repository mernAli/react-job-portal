import { useState } from "react";
import "../components/layout.css";

const homeJobFeed = [
  {
    id: 1,
    author: "recruitmentzceser",
    time: "20 Jan 26 · 02:35 AM",
    title: "Digital Marketing Executive",
    description:
      "We're hiring a Digital Marketing Executive. Skills: SEO / SEM · Social Media Marketing · Content Strategy. Experience: 1–2 years. Work Mode: Remote 🌍",
    image: null,
  },
  {
    id: 2,
    author: "Adwaith",
    time: "21 Jan 26 · 10:52 AM",
    title: "MERN Stack Developer",
    description:
      "Hiring MERN Stack Developer. Skills: MongoDB, Express, React, Node.js. Experience: 2–3 years. Work Mode: Remote.",
    image: "../assets/Job1.jpg",
  },
  {
    id: 3,
    author: "HR Team",
    time: "22 Jan 26 · 09:10 AM",
    title: "UI Developer",
    description: "Looking for UI Developer with strong CSS & React skills.",
    image: null,
  },
];

const recommendations = [
  { id: 1, name: "Adwaith", role: "MERN Developer" },
  { id: 2, name: "Aravind", role: "UI Engineer" },
  { id: 3, name: "Deepu Das", role: "Product Designer" },
];

const shareUsers = [
  { id: 1, name: "Adwaith" },
  { id: 2, name: "Aravind" },
  { id: 3, name: "Deepu" },
  { id: 4, name: "HR Team" },
];

const Home = () => {
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
      sharedWith: [],
    }))
  );

  const handleFollow = (id) => {
    setFollowedUsers([...followedUsers, id]);
  };

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

  const handleCommentToggle = (id) => {
    setFeed((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, showCommentBox: !item.showCommentBox }
          : item
      )
    );
  };

  const toggleShareBox = (id) => {
    setFeed((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, showShareBox: !item.showShareBox }
          : item
      )
    );
  };

  const handleShareToUser = (postId, userId) => {
    setFeed((prev) =>
      prev.map((item) =>
        item.id === postId
          ? { ...item, sharedWith: [...item.sharedWith, userId] }
          : item
      )
    );
  };

  return (
    <div className="app-layout">
      <main className="main-content">
        <div className="feed">
          {feed.map((job, index) => (
            <div key={job.id} className="feed-card">
              <div className="feed-header">
                <div className="small"></div>
                <div>
                  <strong className="author">{job.author}</strong>
                  <p className="muted">{job.time}</p>
                </div>
              </div>

              <h4>{job.title}</h4>
              <p>{job.description}</p>

              {job.image && (
                <img src={job.image} alt="job" className="feed-image" />
              )}

              <div className="feed-actions">
                <button
                  className={`like-btn ${job.liked ? "liked" : ""}`}
                  onClick={() => handleLike(job.id)}
                >
                  {job.liked ? "❤️ Liked" : "🤍 Like"} · {job.likesCount}
                </button>

                <button onClick={() => handleCommentToggle(job.id)}>
                  💬 {job.commentsCount}
                </button>

                <button onClick={() => toggleShareBox(job.id)}>
                  ✈️ Share
                </button>
              </div>

              {job.showShareBox && (
                <div className="share-box">
                  <h4>Share with</h4>
                  {shareUsers.map((user) => (
                    <div key={user.id} className="share-user">
                      <span>{user.name}</span>
                      <button
                        disabled={job.sharedWith.includes(user.id)}
                        onClick={() =>
                          handleShareToUser(job.id, user.id)
                        }
                      >
                        {job.sharedWith.includes(user.id)
                          ? "Shared"
                          : "Share"}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {job.showCommentBox && (
                <div className="comment-box">
                  <input type="text" placeholder="Write a comment..." />
                </div>
              )}

              {index === 2 && (
                <div className="recommend-section">
                  <h4>People you may know</h4>
                  <div className="recommend-row">
                    {recommendations.map((user) => (
                      <div key={user.id} className="recommend-card">
                        <div className="cover"></div>
                        <div className="avatar"></div>
                        <div className="card-content">
                          <strong>{user.name}</strong>
                          <p className="role">{user.role}</p>
                        </div>
                        <button
                          disabled={followedUsers.includes(user.id)}
                          onClick={() => handleFollow(user.id)}
                        >
                          {followedUsers.includes(user.id)
                            ? "Following"
                            : "Follow"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* RIGHT SIDEBAR stays unchanged */}
      <aside className="sidebar right-sidebar">
        {/* Messages */}
        <div className="box">
          <h3>Messages</h3>
          <div className="scroll-box">
            <p>recruitmentzceser</p>
            <p>Adwaith</p>
            <p>Aravind</p>
            <p>HR Team</p>
            <p>Hiring Manager</p>
          </div>
        </div>

        {/* News */}
        <div className="box">
          <h3>News</h3>
          <ul>
            <li>React 19 released</li>
            <li>Hiring trends 2026</li>

            {showMoreNews && (
              <>
                <li>Remote jobs increase</li>
                <li>AI in recruitment</li>
              </>
            )}
          </ul>

          <button
            className="link-btn"
            onClick={() => setShowMoreNews(!showMoreNews)}
          >
            {showMoreNews ? "Show less" : "Show more"}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Home;
