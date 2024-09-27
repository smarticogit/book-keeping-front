import { apiGet } from "@/api/get";
import { useQuery } from "@tanstack/react-query";

export function useGetClientsQuery() {
  const query = useQuery({
    queryKey: ["clients"],
    queryFn: () => apiGet("clients"),
  });

  return query;
}
