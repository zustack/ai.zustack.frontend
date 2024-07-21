import { ScrollArea } from "@/components/ui/scroll-area";

export default function Tutorial() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col items-center">
        <h1 className="text-lg font-semibold text-zinc-300 md:text-3xl xl:text-5xl">
          Tutorial
        </h1>
      </div>
      <ScrollArea className="h-full max-h-[calc(88vh-4rem)] w-full p-4">
        <iframe
          className="w-[560px] h-[315px] rounded-lg"
          src=""
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </ScrollArea>
    </main>
  );
}
