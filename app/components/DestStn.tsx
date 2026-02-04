"use client";
import React from "react";
import { Station, BRTCorridor, CBRTLine, BranchBRTLine, StationCode } from "@/types/index";
import StnRoundel from "@/app/components/StnRoundel";
import CorRoundel from "@/app/components/CorRoundel";
import { main_corridors } from "@/lib/sample";

type Props = {
  station: Station;
  line_foc: BRTCorridor | CBRTLine | BranchBRTLine;
  warning: boolean;
};

export default function DestStn({ station, line_foc, warning }: Props) {
  const orderedCodes = React.useMemo(() => {
    // Sort by brtCorridorIds first, then any remaining codes not in brtCorridorIds
    const sortedIds = [...station.brtCorridorIds].sort((a, b) => a - b);

    // Add any codes that are not in brtCorridorIds
    const remainingCodes = station.codes
      .map(c => c.corridorId)
      .filter(id => !sortedIds.includes(id));
    const finalIds = [...sortedIds, ...remainingCodes];

    // Move focused line to front if exists
      const focusIndex = finalIds.indexOf(line_foc.mainBRTC);
      if (focusIndex !== -1) {
        finalIds.splice(focusIndex, 1);
        finalIds.unshift(line_foc.mainBRTC);
      }

    return finalIds
      .map(id => station.codes.find(c => c.corridorId === id))
      .filter(Boolean) as StationCode[];
  }, [station.codes, station.brtCorridorIds, line_foc]);
  const focusedCode = orderedCodes[0];
  const focusedCorridor = main_corridors.find(c => c.mainBRTC === focusedCode.corridorId);
  const corridorMatch = focusedCorridor === line_foc || (focusedCorridor?.mainBRTC == line_foc.mainBRTC && "lineRepId" in line_foc);

  return (
    <div className="flex items-center gap-4 rounded-lg bg-black text-white shadow-sm">
      
      <div className="flex items-center gap-1 text-lg">
        {corridorMatch ? (
          <>
            <span>to</span>
            {focusedCorridor && (
              <StnRoundel 
                scale={0.65}
                stationCode={focusedCode}
                brtCorridor={focusedCorridor}
              />
            )}
            <span className="font-semibold">{station.name}</span>
            {warning && <span className="text-2xl ml-2">⚠️</span>}
          </>
        ) : (
          <>
            <CorRoundel brtCorridor={line_foc} scale={1} />
            <span>to</span>
            {focusedCorridor && (
              <StnRoundel
                scale={0.65}
                stationCode={focusedCode}
                brtCorridor={focusedCorridor}
              />
            )}
            <span className="font-semibold">{station.name}</span>
            {warning && <span className="text-2xl ml-2">⚠️</span>}
          </>
        )}
      </div>

    </div>
  );
}
