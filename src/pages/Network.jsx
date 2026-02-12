import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const Network = () => {
  const { theme } = useTheme();

  const [connections] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Product Manager",
      company: "Tech Corp",
      mutual: 12,
      connected: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Full Stack Developer",
      company: "StartupXYZ",
      mutual: 8,
      connected: false,
    },
    {
      id: 3,
      name: "Emily Davis",
      title: "UX Designer",
      company: "Creative Agency",
      mutual: 15,
      connected: true,
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>My Network</h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Manage your professional connections
        </p>
      </div>

      {/* Connection Suggestions */}
      <div className={`${theme.cardBg} rounded-xl ${theme.border} border`}>
        <div className={`p-6 ${theme.border} border-b`}>
          <h2 className={`text-lg font-semibold ${theme.textPrimary}`}>
            People You May Know
          </h2>
        </div>

        <div className="p-6 space-y-4">
          {connections.map((person) => (
            <div
              key={person.id}
              className={`flex items-center justify-between p-4 rounded-lg ${theme.hover} transition-all`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 ${theme.infoBg} rounded-full flex items-center justify-center ${theme.infoText} font-semibold`}
                >
                  {person.name.charAt(0)}
                </div>
                <div>
                  <h3 className={`font-semibold ${theme.textPrimary}`}>
                    {person.name}
                  </h3>
                  <p className={`text-sm ${theme.textSecondary}`}>
                    {person.title} at {person.company}
                  </p>
                  <p className={`text-xs ${theme.textMuted} mt-1`}>
                    {person.mutual} mutual connections
                  </p>
                </div>
              </div>

              {person.connected ? (
                <button
                  className={`px-4 py-2 ${theme.border} border rounded-lg ${theme.hover} font-medium text-sm`}
                >
                  Connected
                </button>
              ) : (
                <button
                  className={`px-4 py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium text-sm`}
                >
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Network;