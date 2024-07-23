import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserImages } from "@/api/images";
import LoaderComponent from "@/components/loader";
import { useInView } from "react-intersection-observer";

export default function UserImages({ isLoading }: { isLoading: boolean }) {
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
    queryKey: ["user-images"],
    queryFn: getUserImages,
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div>
      {data?.pages[0].data === null ? (
        <div>
          {!isLoading && (
            <p className="text-center">You don't have any images.</p>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {isLoading && (
              <div className="rounded-lg hover:bg-zinc-500/50 bg-muted/40 transition-colors duration-300 p-1">
                <div className="flex justify-center items-center h-[313px]">
                  <LoaderComponent />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
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
                {isLoading && (
                  <div className="rounded-lg hover:bg-zinc-500/50 bg-muted/40 transition-colors duration-300 p-1">
                    <div className="flex justify-center items-center h-full">
                      <LoaderComponent />
                    </div>
                  </div>
                )}
                {data.pages.flatMap((page) =>
                  page.data.map((c: any) => (
                    <div
                      key={`${c.id}`}
                      className="rounded-lg hover:bg-zinc-500/50 transition-colors duration-300 p-1"
                    >
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
      )}
    </div>
  );
}
