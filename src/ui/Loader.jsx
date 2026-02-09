import React from "react";

const Loader = ({ size = "md" }) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-4",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-t-transparent border-blue-500 ${sizes[size]}`}
      ></div>
    </div>
  );
};

export default Loader;
