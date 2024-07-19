import { axiosInstance } from "./useAxios";

interface Image {
  id: number;
  prompt: string;
  path: string;
  user_id: string;
  public: boolean;
  created_at: string;
}

interface ImageResponse {
  data: Image[];
  previousId: number 
  nextId: number 
}

interface Params {
  pageParam: number;
  searchParam?: string;
}

export const getImages = async ({ pageParam = 0, searchParam }: Params): Promise<ImageResponse> => {
  const response = await axiosInstance.get<ImageResponse>(`/get/images?cursor=${pageParam}&q=${searchParam}`);
  return response.data;
};

export const generateImage = async (prompt: string) => {
  const response = await axiosInstance.post("/generate-image", { prompt });
  return response.data;
}
