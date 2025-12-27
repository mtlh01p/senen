import Image from "next/image";
import { stations, main_corridors, cbrt_lines } from "@/lib/sample";
import MainStnFrame from "@/app/components/MainStnFrame";
import ArrPage from "@/app/pages/arrPage";

export default function Home() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <ArrPage/>
    </div>
  );
}

