import { stations, main_corridors, cbrt_lines } from "@/lib/sample";
import MainStnFrame from "@/app/components/MainStnFrame";
import DestStn from "../components/DestStn";
import DoorsOpen from "../components/DoorsOpen";

export default function ArrPage() {
  const exampleStation1 = stations.find(s => s.name === "Grogol");
  const exampleLineFoc1 = main_corridors.find(c => c.id === 3);
  const exampleDest1 = stations.find(s => s.name === "Kalideres");
  const exampleDestFoc1 = main_corridors.find(c => c.id === 3);
  const doorsSide: "left" | "right" = "right";
  const isThisSide = true;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {exampleStation1 && exampleLineFoc1 && exampleDest1 && exampleDestFoc1 && (
        <div className="flex justify-center w-full">
          <div className="w-full max-w-4xl bg-black text-white rounded-lg overflow-hidden">
            
            {/* TOP AREA */}
            <div className="h-[70px] p-4 flex flex-col justify-start">
              <div
          className={`flex items-start justify-between`}
              >
          {doorsSide === "left" ? (
            <>
              <DoorsOpen
                isThisSide={isThisSide}
                display_side="left"
              />
              <DestStn
                station={exampleDest1}
                line_foc={exampleDestFoc1}
              />
            </>
          ) : (
            <>
              <DestStn
                station={exampleDest1}
                line_foc={exampleDestFoc1}
              />
              <DoorsOpen
                isThisSide={isThisSide}
                display_side="right"
              />
            </>
          )}
              </div>
            </div>

            {/* BOTTOM AREA */}
              <div className="grid grid-cols-3 items-center">
                {/* Left arrow */}
                <div className="text-left text-8xl font-bold">
                  {doorsSide === "right" ? "«" : "»"}
                </div>

                {/* Centered MainStnFrame */}
                <div className="flex justify-center">
                  <MainStnFrame
                    station={exampleStation1}
                    line_foc={exampleLineFoc1}
                  />
                </div>

                {/* Right arrow */}
                <div className="text-right text-8xl font-bold">
                  {doorsSide === "left" ? "»" : "«"}
                </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}

