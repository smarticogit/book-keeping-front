import { useGetStatementByIdQuery } from "@/hooks/statement/use-get-statement-by-id";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { AccountActivity } from "./client.types";
import { Loader2 } from "lucide-react";

export function EditAccountActivities() {
  const navigate = useNavigate();
  const { statementId } = useParams<{ statementId: string }>();

  if (!statementId) {
    toast.error("Erro ao obter o ID do extrato");
    return null;
  }
  const { data, isLoading } = useGetStatementByIdQuery(statementId);

  const handleSave = (updatedActivity: AccountActivity) => {
    // Função para salvar os dados atualizados
    console.log("Salvando atividade atualizada:", updatedActivity);
    // Aqui você pode adicionar a lógica de envio dos dados atualizados para o backend
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-slate-600 mb-4">
        Edit Account Activities
      </h1>

      {isLoading && (
        <div className="flex justify-center items-center">
          <Loader2 className="mx-auto animate-spin h-8 w-8 text-blue-500" />
        </div>
      )}

      {data && (
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-md p-6">
            <section className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold mb-4">Activities</h2>
            </section>
            {data.accountActivity && data.accountActivity.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Debits
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Credits
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Balance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.accountActivity.map((activity: AccountActivity) => (
                      <tr key={activity.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <input
                            type="date"
                            className="border rounded px-2 py-1"
                            defaultValue={
                              activity.postDate
                                ? new Date(activity.postDate)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <input
                            type="text"
                            className="border rounded px-2 py-1"
                            defaultValue={activity.description || ""}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <input
                            type="text"
                            className="border rounded px-2 py-1"
                            defaultValue={activity.debit || 0}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <input
                            type="text"
                            className="border rounded px-2 py-1"
                            defaultValue={activity.credit || 0}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <input
                            type="text"
                            className="border rounded px-2 py-1"
                            defaultValue={activity.balance || 0}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => handleSave(activity)}
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">Nenhuma atividade encontrada.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
