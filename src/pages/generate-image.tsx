import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { CornerDownLeft, Search } from "lucide-react";

export default function GenerateImage() {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Submit");
  };
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <form onSubmit={handleSubmit}>
        <div className="relative mt-4 w-full">
          <Input
            type="text"
            placeholder="Describe your image"
            className="w-full appearance-none bg-muted/40 rounded-lg shadow-none 
            outline-none focus:outline-none ring-0 border-0 focus-visible:ring-offset-0 
            focus-visible:ring-0"
          />
          <CornerDownLeft 
          className="hover:cursor-pointer hover:text-white absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground"
          />
        </div>
      </form>

      <ScrollArea className="h-full max-h-[calc(88vh-4rem)] w-full p-4">
      <p
      className="text-zinc-400 text-sm"
      >You dont have any images yet... :(</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
          <div className="rounded-lg hover:bg-zinc-500/50 transition-colors duration-300 p-1">
            <img className="rounded-lg" src="" />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
}
