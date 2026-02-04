"use client";
import Image from "next/image";
import { BRTCorridor, StationCode } from "@/types/index";
import JAKIcon_Bus from "@/public/images/JakIcon_Bus.svg.png";

type Props = {
  stationCode?: StationCode;
  brtCorridor?: BRTCorridor;
  scale?: number;
};

export default function StnRoundel({ stationCode, brtCorridor, scale }: Props) {
  if (!stationCode || !brtCorridor) {
    return (
      <div
        className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white font-bold"
        style={{ backgroundColor: "#555555", transform: `scale(${scale})`  }}
      >
        <Image src={JAKIcon_Bus.src} alt="Bus Icon" className="w-8 h-8"/>
      </div>
    );
  }
  return (
    <div
      className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white font-bold"
      style={{ backgroundColor: brtCorridor.color, transform: `scale(${scale})`  }}
    >
      <span className="text-lg leading-none -mb-0.1">
        {stationCode.corridorId}
      </span>
      <span className="text-2xl leading-none">
        {stationCode.code >= 10 && (stationCode.code)}
        {stationCode.code < 10 && ("0" + stationCode.code)}
      </span>
    </div>
  );
}

