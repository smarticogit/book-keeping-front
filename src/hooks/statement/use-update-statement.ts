import { apiPut } from "@/api/put";
import { Statement } from "@/pages/client.types";
import { useMutation } from "@tanstack/react-query";

export function useUpdateStatementsMutation(statementId: string) {
  return useMutation({
    mutationFn: (data: Statement) => apiPut(`statements/${statementId}`, data),
  });
}
