// src/components/ui/SkipLink.jsx
import React from "react";

const SkipLink = () => {
  return (
    <a
      href="#main-workspace-content"
      className="absolute left-4 top-4 z-[9999] -translate-y-20 bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-transform duration-200 focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
    >
      Skip to main content
    </a>
  );
};

export default SkipLink;