import { apiGetById } from "@/api/get";
import { useQuery } from "@tanstack/react-query";

export function useGetClientByIdQuery(clientId: string) {
  const query = useQuery({
    queryKey: ["clients", clientId],
    queryFn: () => apiGetById("clients", clientId),
  });

  return query;
}
