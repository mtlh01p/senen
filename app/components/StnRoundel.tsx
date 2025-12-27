import React from "react";
import { BRTCorridor, StationCode } from "@/types/index";

type Props = {
  stationCode: StationCode;
  brtCorridor: BRTCorridor;
};

export default function StnRoundel({ stationCode, brtCorridor }: Props) {
  return (
    <div
      className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white font-bold"
      style={{ backgroundColor: brtCorridor.color }}
    >
      <span className="text-lg leading-none -mb-0.1">
        {stationCode.corridorId}
      </span>
      <span className="text-2xl leading-none">
        {stationCode.code}
      </span>
    </div>
  );
}

