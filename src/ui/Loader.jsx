import { useTheme } from "../context/ThemeContext";

const Loader = () => {

  const {theme} = useTheme()

  // Helper for the pulsing grey boxes
  const pulseClass = "bg-gray-300 dark:bg-gray-700 animate-pulse";

  return (
    <div className="space-y-6 w-185 lg:w-240 mt-193.5">
      {/* Header Skeleton */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <div className={`h-8 w-1/3 ${pulseClass} rounded mb-4`}></div>
        <div className={`h-4 w-2/3 ${pulseClass} rounded`}></div>
      </div>

      {/* Tabs Skeleton */}
      <div className={`${theme.cardBg} rounded-xl ${theme.border} border p-4`}>
        <div className="flex space-x-4">
          <div className={`h-6 w-24 ${pulseClass} rounded`}></div>
          <div className={`h-6 w-24 ${pulseClass} rounded`}></div>
          <div className={`h-6 w-24 ${pulseClass} rounded`}></div>
        </div>
      </div>

      {/* Quick Filters Skeleton */}
      <div className="flex flex-wrap gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-8 w-20 ${pulseClass} rounded-full`}></div>
        ))}
      </div>

      {/* Job List Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border space-y-4`}
          >
            {/* Top section: Logo and Title area */}
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 ${pulseClass} rounded-lg`}></div>
              <div className="flex-1 space-y-2">
                <div className={`h-4 w-3/4 ${pulseClass} rounded`}></div>
                <div className={`h-3 w-1/2 ${pulseClass} rounded`}></div>
              </div>
            </div>

            {/* Middle section: Tags/Description placeholders */}
            <div className="space-y-2">
              <div className={`h-3 w-full ${pulseClass} rounded`}></div>
              <div className={`h-3 w-5/6 ${pulseClass} rounded`}></div>
            </div>
            
            {/* Skills/Tags placeholders */}
            <div className="flex gap-2">
                <div className={`h-6 w-16 ${pulseClass} rounded`}></div>
                <div className={`h-6 w-16 ${pulseClass} rounded`}></div>
                <div className={`h-6 w-16 ${pulseClass} rounded`}></div>
            </div>

            {/* Bottom section: Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <div className={`h-8 w-20 ${pulseClass} rounded`}></div>
              <div className={`h-8 w-20 ${pulseClass} rounded`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;