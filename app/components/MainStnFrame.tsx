import React from "react";
import { Station, BRTCorridor, CBRTLine, StationCode } from "@/types/index";
import StnRoundel from "@/app/components/StnRoundel";
import CorRoundel from "@/app/components/CorRoundel";
import { main_corridors, cbrt_lines } from "@/lib/sample";

type Props = {
  station: Station;
  line_foc: BRTCorridor | CBRTLine;
};

export default function MainStnFrame({ station, line_foc }: Props) {
  // Ordered StationCodes for StnRoundel
  const orderedCodes = React.useMemo(() => {
    const sortedIds = [...station.brtCorridorIds].sort((a, b) => a - b);

    if (typeof line_foc.id === "number") {
      const focusIndex = sortedIds.indexOf(line_foc.id);
      if (focusIndex !== -1) {
        sortedIds.splice(focusIndex, 1);
        sortedIds.unshift(line_foc.id);
      }
    }

    return sortedIds
      .map(id => station.codes.find(c => c.corridorId === id))
      .filter(Boolean) as StationCode[];
  }, [station.codes, station.brtCorridorIds, line_foc]);

  // Ordered CorRoundels
  const corRoundels = React.useMemo(() => {
    // 1️⃣ BRT corridors
    const brtCorridors = station.brtCorridorIds
      .slice()
      .sort((a, b) => a - b)
      .map(id => main_corridors.find(c => c.id === id))
      .filter(Boolean) as BRTCorridor[];

    // 2️⃣ CBRTLines
    const cbrtLines: CBRTLine[] = station.cbrtLineIds
      .slice()
      .sort() // ascending string
      .map(id => cbrt_lines.find(c => c.id === id))
      .filter((c): c is CBRTLine => c !== undefined);

    let ordered: (BRTCorridor | CBRTLine)[] = [...brtCorridors, ...cbrtLines];

    // 3️⃣ Move focused line to front if found
    if (line_foc) {
      if (typeof line_foc.id === "number") {
        const index = brtCorridors.findIndex(c => c.id === line_foc.id);
        if (index !== -1) {
          const foc = brtCorridors[index];
          const rest = ordered.filter(c => c.id !== line_foc.id);
          ordered = [foc, ...rest];
        }
      } else {
        const index = cbrtLines.findIndex(c => c.id === line_foc.id);
        if (index !== -1) {
          const foc = cbrtLines[index];
          const rest = ordered.filter(c => c.id !== line_foc.id);
          ordered = [foc, ...rest];
        }
      }
    }

    return ordered;
  }, [station.brtCorridorIds, station.cbrtLineIds, line_foc]);

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-black text-white shadow-sm">
      
      {/* StationCode Roundels */}
      <div className="flex gap-3">
        {orderedCodes.map(code => {
          const corridor = main_corridors.find(c => c.id === code.corridorId);
          if (!corridor) return null;
          return (
            <StnRoundel
              key={code.corridorId}
              stationCode={code}
              brtCorridor={corridor}
            />
          );
        })}
      </div>

      <div className="flex flex-col">
        <span className="text-2xl font-semibold">{station.name}</span>
        <div className="flex gap-2 mt-1">
          {corRoundels.map(c => (
            <CorRoundel key={c.id} brtCorridor={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
