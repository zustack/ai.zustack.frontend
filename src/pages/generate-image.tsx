import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { CornerDownLeft, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { generateImage, getUserImages } from "@/api/images";
import toast from "react-hot-toast";
import LoaderComponent from "@/components/loader";
import { useAuthStore } from "@/store/auth";
import Login from "@/components/login";
import { useInView } from "react-intersection-observer";

export default function GenerateImage() {
  const [prompt, setPrompt] = useState("");
  const queryClient = useQueryClient();

  const { isAuth } = useAuthStore();

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

  const generateImageMutation = useMutation({
    mutationFn: () => generateImage(prompt),
    onSuccess: () => {
      setPrompt("");
      queryClient.invalidateQueries({ queryKey: ["user-images"] });
    },
    onError: (response) => {
      //@ts-ignore
      toast.error(response.response.data.error);
    },
  });

  const handleSubmit = (e: any) => {
    if (generateImageMutation.isPending) {
      toast.error("Generating image, please wait...");
      return;
    }
    if (prompt === "") {
      toast.error("Please enter a prompt");
      return;
    }
    if (prompt.length > 155) {
      toast.error("Please enter a prompt less than 155 characters");
      return;
    }
    e.preventDefault();
    generateImageMutation.mutate();
  };

  if (!isAuth) {
    return <Login />;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col items-center">
        <h1 className="text-2lg font-semibold text-zinc-300 md:text-4xl xl:text-6xl my-4">
          Generate image
        </h1>
        <div className="relative mt-4 w-full md:w-2/3 lg:w-1/3">
          <form onSubmit={handleSubmit}>
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              maxLength={155}
              placeholder="Describe your image"
              className="w-full appearance-none bg-muted/40 rounded-lg pr-8 shadow-none outline-none focus:outline-none ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
            />
            {generateImageMutation.isPending ? (
              <Loader className="animate-spin slower absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            ) : (
              <button type="submit">
                <CornerDownLeft
                  onClick={handleSubmit}
                  className="hover:cursor-pointer hover:text-white absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                />
              </button>
            )}
          </form>
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
              {generateImageMutation.isPending && (
                <div className="rounded-lg hover:bg-zinc-500/50 bg-muted/40 transition-colors duration-300 p-1">
                  <div className="flex justify-center items-center h-full">
                    <LoaderComponent />
                  </div>
                </div>
              )}
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
