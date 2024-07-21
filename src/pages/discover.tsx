import { getImages } from "@/api/images";
import LoaderComponent from "@/components/loader";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useEffect, useState, ChangeEvent } from "react";
import { useInView } from "react-intersection-observer";

export default function Discover() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { ref, inView } = useInView();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["images", debouncedSearchTerm],
    queryFn: async ({ pageParam }) => {
      return getImages({
        pageParam: pageParam ?? 0,
        searchParam: debouncedSearchTerm,
      });
    },
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchInput);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchInput]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value);
  };

  if (data?.pages[0].data == null) {
    return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col items-center">
        <h1 className="text-2lg font-semibold text-zinc-300 md:text-4xl xl:text-6xl my-4">
          Discover
        </h1>
      </div>

      <ScrollArea className="h-full max-h-[calc(88vh-4rem)] w-full p-4">
        <p className="text-center text-muted-foreground">No data to display.</p>
      </ScrollArea>
    </main>

    )
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col items-center">
        <h1 className="text-2lg font-semibold text-zinc-300 md:text-4xl xl:text-6xl my-4">
          Discover
        </h1>
        <div className="relative mt-4 w-full md:w-2/3 lg:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={handleInputChange}
            type="text"
            placeholder="Search"
            className="w-full appearance-none bg-muted/40 rounded-lg pl-8 shadow-none outline-none focus:outline-none ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
          />
        </div>
      </div>

      <ScrollArea className="h-full max-h-[calc(80vh-4rem)] w-full p-4">
        {error && <p>Error: No data to display.</p>}
        {status === "pending" ? (
          <div className="flex justify-center items-center mt-[100px]">
            <LoaderComponent />
          </div>
        ) : status === "error" ? (
          <p>Error: No data to display.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
              {data.pages.flatMap((page) =>
                page.data.map((c: any) => (
                  <div className="rounded-lg hover:bg-zinc-500/50 transition-colors duration-300 p-1">
                    <img
                      className="rounded-lg"
                      src={`${import.meta.env.VITE_BACKEND_URL}${c.path}`}
                    />
                  </div>
                ))
              )}
            </div>
          </>
        )}
        <>
          <div
            ref={ref}
            onClick={() => fetchNextPage()}
            className="flex w-full justify-center items-center"
          >
            {isFetchingNextPage ? (
              <div className="flex justify-center items-center mt-[100px]">
                <LoaderComponent />
              </div>
            ) : hasNextPage ? (
              ""
            ) : (
              ""
            )}
          </div>
          <div>{isFetching && !isFetchingNextPage ? "" : null}</div>
        </>
      </ScrollArea>
    </main>
  );
}
