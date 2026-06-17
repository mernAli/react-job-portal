import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Dashboard/Sidebar";
import { usePageTransition } from "../components/ui/PageWrapper.jsx";

const Network = () => {
  const { theme } = useTheme();
  const transitionRef = usePageTransition(); // Use the custom hook for page transition

  // Mock data for connection suggestions
  const [connections] = useState([
    {
      id: 1,
      name: "Nisam Ahamad",
      title: "Graphic Designer",
      company: "3+ Mutuals",
      avatar: "NA",
    },
    {
      id: 2,
      name: "Hashim Naaz",
      title: "UI/UX Designer",
      company: "3+ Mutuals",
      avatar: "HN",
    },
    {
      id: 3,
      name: "Nisam Ahamad",
      title: "Graphic Designer",
      company: "3+ Mutuals",
      avatar: "NA",
    },
    {
      id: 4,
      name: "Hashim Naaz",
      title: "UI/UX Designer",
      company: "3+ Mutuals",
      avatar: "HN",
    },
    {
      id: 5,
      name: "Nisam Ahamad",
      title: "Graphic Designer",
      company: "3+ Mutuals",
      avatar: "NA",
    },
    {
      id: 6,
      name: "Hashim Naaz",
      title: "UI/UX Designer",
      company: "3+ Mutuals",
      avatar: "HN",
    },
  ]);

  const [educationConnections] = useState([
    {
      id: 7,
      name: "Nisam Ahamad",
      title: "Graphic Designer",
      company: "3+ Mutuals",
      avatar: "NA",
    },
    {
      id: 8,
      name: "Hashim Naaz",
      title: "UI/UX Designer",
      company: "3+ Mutuals",
      avatar: "HN",
    },
    {
      id: 9,
      name: "Nisam Ahamad",
      title: "Graphic Designer",
      company: "3+ Mutuals",
      avatar: "NA",
    },
    {
      id: 10,
      name: "Hashim Naaz",
      title: "UI/UX Designer",
      company: "3+ Mutuals",
      avatar: "HN",
    },
  ]);

  return (
    <div  className="min-h-screen flex flex-col lg:flex-row lg:gap-6">
      <Sidebar /> 

      {/* Main Content */}
      <div ref={transitionRef} className="flex-1 pb-20 lg:pb-0 ">
        <div className="space-y-6 px-4 py-4 lg:px-0 lg:py-0">
          {/* People in Similar Roles */}
          <div>
            <h2 className={`text-base lg:text-lg font-semibold ${theme.textPrimary} mb-4`}>
              people you may know in <span className={`${theme.primaryText}`}>similar roles</span>
            </h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              {connections.map((person) => (
                <div
                  key={person.id}
                  className={`${theme.cardBg} rounded-2xl ${theme.shadow} overflow-hidden transition-transform hover:scale-105 `}
                >
                  {/* Card Header - Navy Blue */}
                  <div className={`${theme.primary} h-20 lg:h-24 rounded-t-2xl`}></div>
                  
                  {/* Avatar */}
                  <div className="relative px-3 lg:px-4 -mt-8 lg:-mt-8 flex justify-center">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white border-4 border-white flex items-center justify-center overflow-hidden">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${person.avatar}&background=E8F4F8&color=1B365D&size=128`}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="px-3 lg:px-4 pb-3 lg:pb-4 pt-2 text-center">
                    <h3 className={`font-semibold ${theme.textPrimary} text-xs lg:text-sm`}>
                      {person.name}
                    </h3>
                    <p className={`text-[10px] lg:text-xs ${theme.textSecondary} mt-1`}>
                      {person.title}
                    </p>
                    <div className="flex items-center gap-1 mt-2 justify-center">
                      <svg className={`w-3 h-3  ${theme.textMuted}`} fill="currentColor" viewBox="0 0 20 20" >
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <p className={`text-[10px] lg:text-xs ${theme.textMuted}`}>
                        {person.company}
                      </p>
                    </div>

                    {/* Follow Button */}
                    <button className={`w-full mt-3 py-2 ${theme.primary} ${theme.secondaryText} rounded-lg text-xs font-medium flex items-center justify-center gap-1 ${theme.primaryHover} transition-colors`}>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                      </svg>
                      Follow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* People with Similar Education */}
          <div>
            <h2 className={`text-base lg:text-lg font-semibold ${theme.textPrimary} mb-4`}>
              people with <span className={`${theme.primaryText}`}>similar education</span>
            </h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              {educationConnections.map((person) => (
                <div
                  key={person.id}
                  className={`${theme.cardBg} rounded-2xl ${theme.shadow} overflow-hidden transition-transform hover:scale-105`}
                >
                  {/* Card Header - Navy Blue */}
                  <div className={`${theme.primary} h-20 lg:h-24 rounded-t-2xl`}></div>
                  
                  {/* Avatar */}
                  <div className="relative px-3 lg:px-4 -mt-8 lg:-mt-8">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white border-4 border-white flex items-center justify-center overflow-hidden">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${person.avatar}&background=E8F4F8&color=1B365D&size=128`}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="px-3 lg:px-4 pb-3 lg:pb-4 pt-2">
                    <h3 className={`font-semibold ${theme.textPrimary} text-xs lg:text-sm`}>
                      {person.name}
                    </h3>
                    <p className={`text-[10px] lg:text-xs ${theme.textSecondary} mt-1`}>
                      {person.title}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <svg className={`w-3 h-3 ${theme.textMuted}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <p className={`text-[10px] lg:text-xs ${theme.textMuted}`}>
                        {person.company}
                      </p>
                    </div>

                    {/* Follow Button */}
                    <button className={`w-full mt-3 py-2 ${theme.primary} ${theme.secondaryText} rounded-lg text-xs font-medium flex items-center justify-center gap-1 ${theme.primaryHover} transition-colors`}>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                      </svg>
                      Follow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation (Mobile Only) */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 ${theme.primary} ${theme.secondaryText} border-t ${theme.border} z-50`}>
        <div className="flex items-center justify-around py-3 px-2">
          <button className="flex flex-col items-center gap-1">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-[10px]">Home</span>
          </button>

          <button className="flex flex-col items-center gap-1 opacity-100">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="text-[10px]">My Network</span>
          </button>

          <button className="flex flex-col items-center gap-1 relative">
            <div className="relative">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
              </svg>
            </div>
          </button>

          <button className="flex flex-col items-center gap-1">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span className="text-[10px]">Notification</span>
          </button>

          <button className="flex flex-col items-center gap-1">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
            <span className="text-[10px]">Jobs</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Network;