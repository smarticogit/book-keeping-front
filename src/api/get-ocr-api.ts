import axios from "axios";

import { useQuery } from "@tanstack/react-query";

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
