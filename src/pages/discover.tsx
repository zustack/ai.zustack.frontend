import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

export default function Discover() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col items-center">
        <h1 className="text-lg font-semibold text-zinc-300 md:text-3xl xl:text-5xl">
          Discover
        </h1>
        <div className="relative mt-4 w-full md:w-2/3 lg:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search"
            className="w-full appearance-none bg-muted/40 rounded-lg pl-8 shadow-none outline-none focus:outline-none ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
          />
        </div>
      </div>

      <ScrollArea className="h-full max-h-[calc(88vh-4rem)] w-full p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
          <div className="rounded-lg hover:bg-zinc-500/50 transition-colors duration-300 p-1">
            <img className="rounded-lg" src="" />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
}
