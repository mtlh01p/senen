import React from "react";
import { BRTCorridor, CBRTLine } from "@/types/index";

type Props = {
  brtCorridor: BRTCorridor | CBRTLine;
};

export default function CorRoundel({ brtCorridor }: Props) {
  return (
    <div
      className="w-8 h-8 rounded-full flex flex-col items-center justify-center text-white font-bold"
      style={{ backgroundColor: brtCorridor.color }}
    >
      {typeof brtCorridor.id === "number" ? (
        <span className="text-lg leading-none -mb-0.1">
          {brtCorridor.id}
          </span>
          ) : (<span className="text-lg leading-none -mb-0.1">
            {brtCorridor.id}
          </span>
        )}
    </div>
  );
}

