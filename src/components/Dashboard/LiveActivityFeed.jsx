import { useWebSocket } from "../../context/WebSocketContext";
import { useTheme } from "../../context/ThemeContext";

const getActorIcon = (actor) => {
  if (!actor) return "🔔";
  const a = actor.toLowerCase();
  if (a === "system")   return "⚙️";
  if (a === "employer") return "🏢";
  if (a === "candidate") return "👤";
  return "🔔";
};

const getTimeAgo = (isoString) => {
  const diff = Date.now() - new Date(isoString).getTime();
  const secs  = Math.floor(diff / 1000);
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  if (secs < 10)  return "Just now";
  if (secs < 60)  return `${secs}s ago`;
  if (mins < 60)  return `${mins}m ago`;
  return `${hours}h ago`;
};

const LiveActivityFeed = ({ maxItems = 8 }) => {
  const { theme } = useTheme();
  const { activityFeed, connected } = useWebSocket();

  const items = activityFeed.slice(0, maxItems);

  return (
    <div className={`${theme.cardBg} rounded-xl ${theme.border} border`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-5 py-4 border-b ${theme.border}`}>
        <h3 className={`font-semibold ${theme.textPrimary} text-sm`}>
          Live Activity
        </h3>
        <div className="flex items-center gap-2">
          {/* Live indicator dot */}
          <span
            className={`w-2 h-2 rounded-full ${
              connected ? "bg-green-500 animate-pulse" : "bg-gray-400"
            }`}
          />
          <span className={`text-xs ${theme.textMuted}`}>
            {connected ? "Live" : "Offline"}
          </span>
        </div>
      </div>

      {/* Feed items */}
      <div className="divide-y divide-opacity-10" style={{ borderColor: "inherit" }}>
        {items.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className={`text-sm ${theme.textMuted}`}>
              {connected ? "Waiting for activity..." : "Connecting..."}
            </p>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-start gap-3 px-5 py-3 ${theme.hover} transition-colors ${
                // Newest item gets a subtle highlight
                index === 0 ? `${theme.infoBg} bg-opacity-30` : ""
              }`}
            >
              {/* Icon */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${theme.bg}`}
              >
                {getActorIcon(item.actor)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${theme.textPrimary} leading-snug`}>
                  <span className="font-medium">{item.actor}</span>{" "}
                  <span className={theme.textSecondary}>{item.action}</span>
                </p>
                {item.detail && (
                  <p className={`text-xs ${theme.textMuted} mt-0.5 truncate`}>
                    {item.detail}
                  </p>
                )}
              </div>

              {/* Time */}
              <span className={`text-xs ${theme.textMuted} flex-shrink-0 mt-0.5`}>
                {getTimeAgo(item.timestamp)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LiveActivityFeed;