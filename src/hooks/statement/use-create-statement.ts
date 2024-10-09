import { apiPostFormData } from "@/api/post";
import { useMutation } from "@tanstack/react-query";

export function useCreateStatementsMutation() {
  return useMutation({
    mutationFn: (data: FormData) => apiPostFormData("statements", data),
  });
}
