"use client";
import React, { useMemo, useEffect, useRef } from "react";
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
  const thisId = thisStn.id;
  const destId = destStn.id;

  const { stationIdsDir1, stationIdsDir2 } = line_foc;

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

  const stationOrder = doorsSide === "right" ? [...chosenDir].reverse() : chosenDir;

  // Compute first & last index of each line along current route, from stations' own brtCorridorIds / cbrtLineIds
  const routeLineExtremes = useMemo(() => {
    const extremes = new Map<number, { firstIdx: number; lastIdx: number }>();

    stationOrder.forEach((stationId, idx) => {
      const station = stations.find(s => s.id === stationId);
      if (!station) return;

      const lineIds = [
        ...(station.brtCorridorIds ?? []),
        ...(station.cbrtLineIds ?? []),
      ].filter(id => id !== line_foc.id); // exclude the focused line

      lineIds.forEach(id => {
        if (!extremes.has(id)) {
          extremes.set(id, { firstIdx: idx, lastIdx: idx });
        } else {
          extremes.get(id)!.lastIdx = idx;
        }
      });
    });

    return extremes;
  }, [stationOrder, line_foc.id]);

  // Determine color of line_foc
  const lineColor = "id" in line_foc
    ? typeof line_foc.id === "number"
      ? main_corridors.find(c => c.id === line_foc.id)?.color || "#fff"
      : cbrt_lines.find(c => c.id === line_foc.id)?.color || "#fff"
    : "#fff";

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const DURATION_MS = 1200;
    const START_DELAY = 4000;

    const start = doorsSide === "left" ? 0 : el.scrollWidth - el.clientWidth;
    const end = doorsSide === "left" ? el.scrollWidth - el.clientWidth : 0;

    el.scrollLeft = start;

    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / DURATION_MS, 1);

      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      el.scrollLeft = start + (end - start) * eased;

      if (progress < 1) rafId = requestAnimationFrame(animate);
    };

    const timeout = setTimeout(() => { rafId = requestAnimationFrame(animate); }, START_DELAY);
    return () => { clearTimeout(timeout); cancelAnimationFrame(rafId); };
  }, [doorsSide, stationOrder.length]);

  // Disable user scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const prevent = (e: Event) => e.preventDefault();
    el.addEventListener("wheel", prevent, { passive: false });
    el.addEventListener("touchmove", prevent, { passive: false });
    el.addEventListener("keydown", prevent, { passive: false });
    return () => {
      el.removeEventListener("wheel", prevent);
      el.removeEventListener("touchmove", prevent);
      el.removeEventListener("keydown", prevent);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex items-center overflow-x-scroll pt-34 px-12 pb-16 w-[70%] no-scrollbar pointer-events-none hide-scrollbar">
      {stationOrder.map((stationId, idx) => {
        const station = stations.find(s => s.id === stationId);
        if (!station) return null;

        const segmentWidthNumber = Math.max(
          (70 / (stationOrder.length - 1)) * (window.innerWidth * 0.7) / 100,
          40
        );
        const thisIndex = stationOrder.indexOf(thisId);
        const destIndexInOrder = stationOrder.indexOf(destId);

        const reached = doorsSide === "right" ? idx > thisIndex : idx < thisIndex;
        const willReach = doorsSide === "right" ? idx < destIndexInOrder : idx > destIndexInOrder;

        // Determine roundels to show: first or last station for each line along route
        const roundelsToShow = [
          ...(station.brtCorridorIds ?? []),
          ...(station.cbrtLineIds ?? []),
        ]
        .filter(id => id !== line_foc.id)
        .filter(id => {
          const ex = routeLineExtremes.get(id);
          return ex && (idx === ex.firstIdx || idx === ex.lastIdx);
        })
        .map(id => {
          // find line object by id
          const lineObj = main_corridors.find(l => l.id === id) || cbrt_lines.find(l => l.id === id);
          return lineObj;
        })
        .filter(Boolean) as (BRTCorridor | CBRTLine)[];

        return (
            <div key={station.id} className="flex items-end shrink-0">
            <StationDot
              name={station.name}
              reached={reached}
              willReach={willReach}
              side={doorsSide}
              oneWay={!(stationIdsDir1.includes(station.id) && stationIdsDir2.includes(station.id))}
              focused={station.id === thisId}
              roundels={roundelsToShow}
            />
                {idx !== stationOrder.length - 1 && (
                <div className={!(stationIdsDir1.includes(station.id) && stationIdsDir2.includes(station.id))? "pb-0.5": "pb-2"}>
                    <LineSegment
                    color={lineColor}
                    fullOpacity={
                        idx >= Math.min(thisIndex-1, destIndexInOrder) &&
                        idx < Math.max(thisIndex+1, destIndexInOrder)
                    }
                    width={segmentWidthNumber}
                    side={doorsSide}
                    focused={doorsSide == "left" ? idx == Math.min(thisIndex-1, destIndexInOrder) : idx == Math.max(thisIndex+1, destIndexInOrder) - 1}
                    />
                </div>
                )}
            </div>
            );
      })}
    </div>
  );
}
