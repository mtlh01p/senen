"use client";
import React, { useMemo } from "react";
import StationDot from "./StationDot";
import LineSegment from "./LineSegment";
import { stations, main_corridors, cbrt_lines } from "@/lib/sample";
import { Station, BRTCorridor, CBRTLine } from "@/types";

type Props = {
  line_foc: BRTCorridor | CBRTLine;
  thisStn: Station;
  destStn: Station;
  doorsSide: "left" | "right";
};

export default function StationLine({ line_foc, thisStn, destStn, doorsSide }: Props) {
  const { stationIdsDir1, stationIdsDir2 } = line_foc;
  const thisId = thisStn.id;
  const destId = destStn.id;

  // Determine direction
  const chosenDir = useMemo(() => {
    const inDir1This = stationIdsDir1.includes(thisId);
    const inDir1Dest = stationIdsDir1.includes(destId);
    const inDir2This = stationIdsDir2.includes(thisId);
    const inDir2Dest = stationIdsDir2.includes(destId);

    if (inDir1This && inDir1Dest && !(inDir2This && inDir2Dest)) return stationIdsDir1;
    if (inDir2This && inDir2Dest && !(inDir1This && inDir1Dest)) return stationIdsDir2;

    const idx1This = stationIdsDir1.indexOf(thisId);
    const idx1Dest = stationIdsDir1.indexOf(destId);

    if (idx1This !== -1 && idx1Dest !== -1 && idx1This < idx1Dest) return stationIdsDir1;
    return stationIdsDir2;
  }, [stationIdsDir1, stationIdsDir2, thisId, destId]);

  // Arrange stations depending on display side
  const stationOrder = doorsSide === "right" ? [...chosenDir].reverse() : chosenDir;

    let lineColor = "#fff";

    if ("id" in line_foc) {
    if (typeof line_foc.id === "number") {
        // BRT corridor
        lineColor = main_corridors.find(c => c.id === line_foc.id)?.color || "#fff";
    } else {
        // CBRT line
        lineColor = cbrt_lines.find(c => c.id === line_foc.id)?.color || "#fff";
    }
    }

  return (
    <div className="flex items-center overflow-x-hidden pt-34 pb-12">
      {stationOrder.map((stationId, idx) => {
        const station = stations.find(s => s.id === stationId);
        if (!station) return null;

        const reached = doorsSide === "right"
          ? idx > stationOrder.indexOf(thisId)
          : idx < stationOrder.indexOf(thisId);

        const willReach = doorsSide === "right"
          ? idx < stationOrder.indexOf(destId)
          : idx > stationOrder.indexOf(destId);

        const thisIndex = stationOrder.indexOf(thisId);
        const destIndexInOrder = stationOrder.indexOf(destId);

        return (
            <div key={station.id} className="flex items-end">
                <StationDot
                name={station.name}
                reached={reached}
                willReach={willReach}
                side={doorsSide}
                />
                {idx !== stationOrder.length - 1 && (
                <div className="pb-[6px]">
                    <LineSegment
                    color={lineColor}
                    fullOpacity={
                        idx >= Math.min(thisIndex, destIndexInOrder) &&
                        idx < Math.max(thisIndex, destIndexInOrder)
                    }
                    width={40}
                    />
                </div>
                )}
            </div>
            );
      })}
    </div>
  );
}
