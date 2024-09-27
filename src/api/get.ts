import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const apiGet = async (route: string) => {
  try {
    const response = await axios.get(`${baseUrl}/${route}`);
    return response.data;
  } catch (error) {
    toast.error(`Error with GET request: ${error}`);
    throw error;
  }
};

export const apiGetById = async (route: string, id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/${route}/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`Error with GET By Id request: ${error}`);
    throw error;
  }
};

export const apiGetParams = async (route: string, params: Params) => {
  try {
    const response = await axios.get(`${baseUrl}/${route}`, {
      params,
    });
    return response.data;
  } catch (error) {
    toast.error(`Error with GET By Id request: ${error}`);
    throw error;
  }
};

export function useOCRApi() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ocrData"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3333/ocr");
      console.log(response.data, "response.data");
      return response.data;
    },
  });

  return {
    data,
    isLoading,
    isError,
  };
}

type Params = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "name";
  sortAs?: "asc" | "desc";
  status?: "active" | "inactive";
};
