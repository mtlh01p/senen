import { Station, BRTCorridor, NBRTLine, CBRTLine, StationCode } from "@/types/index";

export const main_corridors: BRTCorridor[] = [
  {id: 1, color: "#d02127", stationIds: ["1-13", "1-14", "1-15"]},
  {id: 2, color: "#d94a99", stationIds: ["2-19", "1-14"]},
  {id: 3, color: "#fbc71f", stationIds: ["3-01", "3-02", "3-03", "3-04", "3-05", "3-06", "3-07", "3-08", "3-09", "3-10", "3-11", "3-12", "8-23", "1-14"]},
  {id: 8, color: "#d73492", stationIds: ["3-09", "3-10", "8-23",]}
]

export const cbrt_lines: CBRTLine[] = [
  {id: "3H", color: "#e77721", stationIds: ["3-09", "3-10", "3-11", "3-12", "8-23", "1-15"]},
]

export const stations: Station[] = [
  {
    id: "3-01",
    name: "Kalideres",
    codes: [{ corridorId: 3, code: 1 }],
    brtCorridorIds: [3],
    cbrtLineIds: [],
    nbrtLineIds: []
  },
  {
    id: "3-02",
    name: "Pesakih",
    codes: [{ corridorId: 3, code: 2 }],
    brtCorridorIds: [3],
    cbrtLineIds: [],
    nbrtLineIds: []
  },
  {
    id: "3-03",
    name: "Sumur Bor",
    codes: [{ corridorId: 3, code: 3 }],
    brtCorridorIds: [3],
    cbrtLineIds: [],
    nbrtLineIds: []
  },
  {
    id: "3-04",
    name: "Rawa Buaya",
    codes: [{ corridorId: 3, code: 4 }],
    brtCorridorIds: [3],
    cbrtLineIds: [],
    nbrtLineIds: []
  },
  {
    id: "3-05",
    name: "Jembatan Baru",
    codes: [{ corridorId: 3, code: 5 }],
    brtCorridorIds: [3],
    cbrtLineIds: [],
    nbrtLineIds: []
  },
  {
    id: "3-06",
    name: "Pulo Nangka",
    codes: [{ corridorId: 3, code: 6 }],
    brtCorridorIds: [3],
    cbrtLineIds: [],
    nbrtLineIds: []
  },
  {
    id: "3-07",
    name: "Jembatan Gantung",
    codes: [{ corridorId: 3, code: 7 }],
    brtCorridorIds: [3],
    cbrtLineIds: [],
    nbrtLineIds: []
  },
  {
    id: "3-08",
    name: "Taman Kota",
    codes: [{ corridorId: 3, code: 8 }],
    brtCorridorIds: [3],
    cbrtLineIds: [],
    nbrtLineIds: []
  },
  {
    id: "3-09",
    name: "Damai",
    codes: [{ corridorId: 3, code: 9 }, { corridorId: 8, code: 17}],
    brtCorridorIds: [3, 8],
    cbrtLineIds: ["3H"],
    nbrtLineIds: []
  },
  {
    id: "3-10",
    name: "Jelambar",
    codes: [{ corridorId: 3, code: 10 }, { corridorId: 8, code: 18}],
    brtCorridorIds: [3, 8],
    cbrtLineIds: ["3H"],
    nbrtLineIds: []
  },
  {
    id: "3-11",
    name: "Grogol",
    codes: [{ corridorId: 3, code: 11 }],
    brtCorridorIds: [3],
    cbrtLineIds: ["3H"],
    nbrtLineIds: []
  },
  {
    id: "3-12",
    name: "Roxy",
    codes: [{ corridorId: 3, code: 12 }],
    brtCorridorIds: [3],
    cbrtLineIds: ["3H"],
    nbrtLineIds: []
  },
  {
    id: "8-23",
    name: "Petojo",
    codes: [{ corridorId: 8, code: 23 }],
    brtCorridorIds: [3, 8],
    cbrtLineIds: ["3H"],
    nbrtLineIds: []
  },
  {
    id: "1-14",
    name: "Monumen Nasional",
    codes: [{ corridorId: 1, code: 14 }, { corridorId: 2, code: 21 }],
    brtCorridorIds: [1, 2, 3],
    cbrtLineIds: [],
    nbrtLineIds: []
  }
];
