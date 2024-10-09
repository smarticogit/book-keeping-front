import { apiPost } from "@/api/post";
import { ClientRequest } from "@/pages/client.types";
import { useMutation } from "@tanstack/react-query";

export function usePostClientsMutation() {
  return useMutation({
    mutationFn: (data: ClientRequest) => apiPost("clients", data),
  });
}
