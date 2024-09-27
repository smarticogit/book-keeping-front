import { apiPost } from "@/api/post";
import { useQuery } from "@tanstack/react-query";

export function usePostClientsMutation(
  route: string,
  data: { name: string; email: string; doc: string }
) {
  const query = useQuery({
    queryKey: ["clients"],
    queryFn: () => apiPost(route, data),
  });

  return query;
}
