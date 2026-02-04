"use client";
import { BRTCorridor, CBRTLine, NBRTLine } from "@/types";
import CorRoundel from "@/app/components/CorRoundel";
import VisibilityChecker from "@/app/components/VisibilityChecker";

import React from "react";

type Props = {
  name: string;
  reached: boolean;
  willReach: boolean;
  oneWay: boolean;
  twoWayPay: boolean;
  focused: boolean;
  available: boolean;
  unavailableColor: string;
  side: "left" | "right";
  accessible?: boolean;
  stnItselfOneWay?: boolean;
  hasTrain?: boolean;
  roundels: (BRTCorridor | CBRTLine | NBRTLine)[];
};


export default function StationDot({
  name,
  reached,
  willReach,
  side,
  oneWay,
  focused,
  available,
  roundels,
  stnItselfOneWay,
  accessible,
  hasTrain,
  twoWayPay,
  unavailableColor,
}: Props) {
  const opacity = reached || willReach ? 0.3 : 1;
  const unavailableOpacity = 0.3;
  const shape = oneWay ? (side === "right" ? "◀" : "▶") : "●";
  const angle = side === "right" ? -60 : 60;
  const strike = !available ? "line-through" : "none";

  return (
    <div className="relative flex flex-col items-center w-4 shrink-0 font-sans">
      
      {/* Label */}
      <span
        className={[
          "absolute text-[14px] leading-none whitespace-nowrap",
          focused
            ? "text-black bg-white px-2 py-0.5 rounded-full w-60"
            : "text-white",
          side === "left" ? "text-right" : "text-left",
        ].join(" ")}
        style={{
          bottom: "24px",
          transformOrigin: side === "right" ? "left bottom" : "right bottom",
          transform: `rotate(${angle}deg)`,
          left: side === "right" ? "50%" : "auto",
          right: side === "right" ? "auto" : "50%",
        }}
      >
        {/* LEFT SIDE ICONS */}
        {side === "right" && (
          <>
            {!available && <span>❌</span>}
            <span style={{ opacity: available ? opacity : unavailableOpacity }}>
              {accessible && available && "♿"}
              {twoWayPay && available && "💵"}
              {hasTrain && available && "🚇"}
              {stnItselfOneWay && available && oneWay && "←"}
            </span>
          </>
        )}

        {/* STATION NAME */}
        <span
          style={{
            textDecoration: strike,
            opacity: available ? opacity : unavailableOpacity,
          }}
        >
          {" "}{name}{" "}
        </span>

        {/* RIGHT SIDE ICONS */}
        {side === "left" && (
          <>
            <span style={{ opacity: available ? opacity : unavailableOpacity }}>
              {stnItselfOneWay && available && oneWay && "→"}
              {hasTrain && available && "🚇"}
              {twoWayPay && available && "💵"}
              {accessible && available && "♿"}
            </span>
            {!available && <span>❌</span>}
          </>
        )}
      </span>

      {/* Dot (ANCHOR) */}
      <div
        className={`${oneWay ? "text-lg" : "text-3xl"} leading-none`}
        style={{ opacity, color: available ? "white" : unavailableColor }}
      >
        {shape}
      </div>
    {roundels && roundels.length > 0 && (
      <div
        className="absolute flex flex-col items-center mt-px"
        style={{
          top: "100%", // visually below the dot
          opacity,
        }}
      >
        {(() => {
          const visibleRoundels = roundels.filter(m => VisibilityChecker({ timeType: m.time }) === true).slice(0, 4); // max 4
          const rows: (BRTCorridor | CBRTLine | NBRTLine)[][] = [];

          switch (visibleRoundels.length) {
            case 1:
              rows.push([visibleRoundels[0]]);
              break;
            case 2:
              rows.push(visibleRoundels);
              break;
            case 3:
              rows.push(visibleRoundels.slice(0, 2));
              rows.push([visibleRoundels[2]]);
              break;
            case 4:
              rows.push(visibleRoundels.slice(0, 2));
              rows.push(visibleRoundels.slice(2, 4));
              break;
          }

          return rows.map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-center items-center -space-x-1 -space-y-1">
              {row.map(line => (
                <CorRoundel key={line.id} brtCorridor={line} scale={0.6} />
              ))}
            </div>
          ));
        })()}
      </div>
    )}
    </div>
  );
}
