"use client";
import React from "react";

type Props = {
  color: string;
  fullOpacity: boolean;
  width?: number;
};

export default function LineSegment({ color, fullOpacity, width }: Props) {
  return (
    <div className="flex items-center" style={{ width }}>
      <div
        className="h-2 w-full rounded"
        style={{
          backgroundColor: color,
          opacity: fullOpacity ? 1 : 0.3,
        }}
      />
    </div>
  );
}
