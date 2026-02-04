import React from "react";
import { BRTCorridor, CBRTLine, NBRTLine, BranchBRTLine } from "@/types/index";

type Props = {
  brtCorridor: BRTCorridor | CBRTLine | NBRTLine | BranchBRTLine;
  scale?: number;
  visible?: boolean;
};
export default function CorRoundel({ brtCorridor, scale = 1, visible }: Props) {
  if (visible === false) return null;

  const isBranch = "lineRepId" in brtCorridor;
  const isNumeric = typeof brtCorridor.id === "number" || isBranch;

  return (
    <div
      className="w-8 h-8 rounded-full font-main flex flex-col items-center justify-center text-white font-bold font-pt"
      style={{
        backgroundColor: brtCorridor.color,
        transform: `scale(${scale})`,
      }}
    >
      <span
        className={`leading-none ${isNumeric ? "text-lg" : "text-sm"} -mb-0.1`}
      >
        {isBranch ? brtCorridor.lineRepId : brtCorridor.id}
      </span>
    </div>
  );
}


