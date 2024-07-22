import { getImage } from "@/api/images";
import LoaderComponent from "@/components/loader";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

export default function Image() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["image", id],
    queryFn: () => getImage(id || ""),
  });

  if (isLoading) {
    return (
      <div className="items-center flex justify-center h-screen">
        <LoaderComponent />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="items-center flex justify-center h-screen">
        <p>Something went wrong, possible that the image doesn't exist</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 relative">
      <div className="col-span-4 rounded-lg transition-colors duration-300 p-1">
        <img
          className="rounded-lg"
          src={`${import.meta.env.VITE_BACKEND_URL}${data.path}`}
        />
      </div>
      <div className="p-4 col-span-2 text-zinc-400">
        <Link
          to="/"
          className="py-1 px-3 rounded-sm bg-zinc-500/40 absolute 
        top-2 right-2 hover:cursor-pointer hover:text-zinc-300"
        >
          X
        </Link>
        <p className="mr-4">Prompt: {data.prompt}</p>
      </div>
    </div>
  );
}
