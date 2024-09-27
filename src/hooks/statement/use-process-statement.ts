import { apiGetById } from "@/api/get";
import { ExtractedData } from "@/pages/statement.types";
import { useQuery } from "@tanstack/react-query";

export function useProcessStatement(statementId: string) {
  const query = useQuery<ExtractedData, Error>({
    queryKey: ["statements", statementId],
    queryFn: () => apiGetById("statements/ocr", statementId),
    enabled: !!statementId,
  });

  return query;
}
