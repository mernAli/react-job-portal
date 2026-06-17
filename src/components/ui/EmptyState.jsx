// src/components/ui/EmptyState.jsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";

const EmptyState = ({ message, description, buttonText, onButtonClick }) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-sm mx-auto animate-fade-in">
      
      {/* Animated Pulsing Icon Ring Container */}
      <div className="relative flex items-center justify-center w-20 h-20 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full mb-6">
        {/* The radar pulse effect */}
        <span className="absolute inset-0 rounded-full bg-blue-400/20 dark:bg-blue-500/10 animate-ping"></span>
        
        {/* Main Magnifying Glass Icon */}
        <svg 
          className="w-9 h-9 relative z-10 transition-transform duration-300 hover:rotate-12" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.75" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
      
      {/* Header Text */}
      <h3 className={`text-lg font-semibold ${theme?.textPrimary || "text-zinc-900 dark:text-zinc-100"}`}>
        {message}
      </h3>
      
      {/* Description Subtext */}
      <p className={`text-sm mt-2 mb-6 ${theme?.textSecondary || "text-zinc-500 dark:text-zinc-400"}`}>
        {description}
      </p>
      
      {/* Optional Interactive Action Button */}
      {buttonText && (
        <button 
          onClick={onButtonClick}
          className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm transition-all duration-100 hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;