import React from "react";

const Card = ({ children, className = "", hover = false, glass = false }) => {
  return (
    <div
      className={`
      rounded-3xl overflow-hidden
      border border-white/60
      shadow-[0_20px_60px_rgba(0,0,0,0.08)]
      bg-white
      transition-all duration-500

      ${hover &&
        "hover:-translate-y-3 hover:shadow-[0_35px_80px_rgba(255,140,66,0.18)]"
      }

      ${className}
    `}
    >
      {children}
    </div>
  );
};

export default Card;