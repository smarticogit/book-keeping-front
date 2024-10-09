import { useGetStatementByIdQuery } from "@/hooks/statement/use-get-statement-by-id";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { AccountActivity } from "./client.types";
import { Button } from "@/components/ui/button";

export function DetaislStatements() {
  const navigate = useNavigate();
  const { statementId } = useParams<{ statementId: string }>();

  if (!statementId) {
    toast.error("Erro ao obter o ID do extrato");
    return null;
  }
  const { data, isLoading } = useGetStatementByIdQuery(statementId);

  function handleEditClient() {
    navigate(`/statements-edit/${statementId}`);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-slate-600 mb-4">
        Statement Details
      </h1>

      {isLoading && (
        <div className="flex justify-center items-center">
          <Loader2 className="mx-auto animate-spin h-8 w-8 text-blue-500" />
        </div>
      )}

      {data && (
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-md p-6">
            <section className="flex justify-between">
              <h2 className="text-xl font-semibold mb-4">Client Information</h2>
              <Button
                className="bg-blue-500 text-white px-4 py-2"
                onClick={handleEditClient}
              >
                Edit
              </Button>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Bank name:</span>{" "}
                {data.bankName || "--"}
              </div>
              <div>
                <span className="font-medium">Client name:</span>{" "}
                {data.client.name || "--"}
              </div>
              <div>
                <span className="font-medium">Client number:</span>{" "}
                {data.customerNumber || "--"}
              </div>
              <div>
                <span className="font-medium">Account type:</span>{" "}
                {data.accountType || "--"}
              </div>
              <div>
                <span className="font-medium">Account number:</span>{" "}
                {data.accountNumber || "--"}
              </div>
              <div>
                <span className="font-medium">Beginning balance:</span>{" "}
                {data.beginningBalance || "--"}
              </div>
              <div>
                <span className="font-medium">Ending balance:</span>{" "}
                {data.endingBalance || "--"}
              </div>
              <div>
                <span className="font-medium">Statement date:</span>{" "}
                {data.statementDate
                  ? new Date(data.statementDate).toLocaleDateString()
                  : "--"}
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-semibold mb-4">Activities</h2>
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
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.accountActivity.map((activity: AccountActivity) => (
                      <tr key={activity.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {activity.postDate
                            ? new Date(activity.postDate).toLocaleDateString()
                            : "--"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {activity.description || "--"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {activity.debit || "--"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {activity.credit || "--"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {activity.balance || "--"}
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
