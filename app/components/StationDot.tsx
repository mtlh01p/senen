"use client";
import React from "react";

type Props = {
  name: string;
  reached: boolean;
  willReach: boolean;
  side: "left" | "right";
};

export default function StationDot({ name, reached, willReach, side }: Props) {
  const opacity = reached || willReach ? 0.3 : 1;
  const angle = side === "right" ? -60 : 60;

  return (
    /* w-12 (48px) ensures every dot is exactly 48px from the center of the next */
    <div className="flex flex-col items-center w-4 flex-shrink-0 relative">
      
      {/* Label: Using absolute so it doesn't push the container width */}
      <span
        className="absolute text-white text-[14px] leading-none whitespace-nowrap"
        style={{
          bottom: "24px", // Positioned above the dot
          // Pivot from the center-bottom of the text to keep it aligned with dot center
          transformOrigin: side === "right" ? "left bottom" : "right bottom",
          transform: `rotate(${angle}deg)`,
          // Adjust horizontal nudge so the start of the text aligns with dot center
          left: side === "right" ? "50%" : "auto",
          right: side === "right" ? "auto" : "50%",
          opacity,
        }}
      >
        {name}
      </span>

      {/* Dot */}
      <div
        className="w-4 h-4 rounded-full bg-white relative z-10 border-2 border-black"
        style={{ opacity }}
      />
    </div>
  );
}