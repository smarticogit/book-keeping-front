import { apiGetById } from "@/api/get";
import { useQuery } from "@tanstack/react-query";

export function useGetStatementByIdQuery(statementId: string) {
  const query = useQuery({
    queryKey: ["statements", statementId],
    queryFn: () => apiGetById("statements", statementId),
  });

  return query;
}
