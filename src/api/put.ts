import axios from "axios";
import { toast } from "sonner";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const apiPut = async (route: string, input: any) => {
  try {
    const response = await axios.put(`${baseUrl}/${route}`, input, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      response: response.data,
      isError: false,
      isSuccess: true,
    };
  } catch (error) {
    toast.error(`Error with Patch By Id request: ${error}`);
    throw error;
  }
};
