import { useProcessStatement } from "@/hooks/statement/use-process-statement";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export function StatementsDetails() {
  const navigate = useNavigate();
  const { statementId } = useParams<{ statementId: string }>();

  if (!statementId) {
    toast.error("Erro ao obter o ID do extrato");
    return null;
  }

  const { data, isLoading, isError } = useProcessStatement(statementId);

  if (isError) {
    toast.error("Erro ao processar o extrato");
    navigate("/statements");
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-slate-600 mb-4">
        Detalhes do Extrato
      </h1>

      {isLoading && (
        <div className="flex justify-center items-center">
          <Loader2 className="mx-auto animate-spin h-8 w-8 text-blue-500" />
        </div>
      )}

      {data && (
        <div className="space-y-6">
          {/* Seção de Informações Principais */}
          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-xl font-semibold mb-4">
              Informações do Cliente
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Nome do Banco:</span>{" "}
                {data.bankName || "N/A"}
              </div>
              <div>
                <span className="font-medium">Nome do Cliente:</span>{" "}
                {data.customerName || "N/A"}
              </div>
              <div>
                <span className="font-medium">Número do Cliente:</span>{" "}
                {data.customerNumber || "N/A"}
              </div>
              <div>
                <span className="font-medium">Telefone:</span>{" "}
                {data.phoneNumber || "N/A"}
              </div>
              <div>
                <span className="font-medium">Tipo de Conta:</span>{" "}
                {data.accountType || "N/A"}
              </div>
              <div>
                <span className="font-medium">Número da Conta:</span>{" "}
                {data.accountNumber || "N/A"}
              </div>
              <div>
                <span className="font-medium">Saldo Inicial:</span>{" "}
                {data.beginningBalance || "N/A"}
              </div>
              <div>
                <span className="font-medium">Saldo Final:</span>{" "}
                {data.endingBalance || "N/A"}
              </div>
              <div>
                <span className="font-medium">Data do Extrato:</span>{" "}
                {data.statementDate || "N/A"}
              </div>
            </div>
          </div>

          {/* Seção de Atividades */}
          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Atividades</h2>
            {data.activities.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descrição
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Débitos
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Créditos
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Saldo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.activities.map((activity, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {activity.postDate || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {activity.description || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {activity.debits || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {activity.credits || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {activity.balance || "N/A"}
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
