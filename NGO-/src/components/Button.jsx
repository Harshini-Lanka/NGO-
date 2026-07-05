import React from "react";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-[#FF8C42] text-white hover:bg-[#e67a35] focus:ring-[#FF8C42] shadow-lg shadow-[#FF8C42]/30",
    secondary:
      "bg-[#4CAF50] text-white hover:bg-[#439c47] focus:ring-[#4CAF50] shadow-lg shadow-[#4CAF50]/30",
    outline:
      "border-2 border-[#FF8C42] text-[#FF8C42] hover:bg-[#FF8C42]/10 focus:ring-[#FF8C42]",
    ghost:
      "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;