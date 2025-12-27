import Image from "next/image";
import { stations, main_corridors, cbrt_lines } from "@/lib/sample";
import MainStnFrame from "@/app/components/MainStnFrame";

export default function Home() {
  const exampleStation1 = stations.find(s => s.name === "Damai");
  const exampleLineFoc1 = main_corridors.find(c => c.id === 8);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {exampleStation1 && exampleLineFoc1 && (
        <MainStnFrame station={exampleStation1} line_foc={exampleLineFoc1} />
      )}
    </div>
  );
}

