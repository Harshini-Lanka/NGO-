import React from "react";

const Badge = ({ children, type = "default" }) => {
  const types = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    primary: "bg-[#FF8C42]/20 text-[#d96a24]",
    default: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
        types[type] || types.default
      }`}
    >
      {children}
    </span>
  );
};

export default Badge;