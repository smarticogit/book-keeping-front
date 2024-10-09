import { useGetClientByIdQuery } from "@/hooks/client/use-get-client-by-id";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Statement } from "./client.types";

export function DetailsClient() {
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>();

  if (!clientId) {
    toast.error("Error to get clientID");
    navigate("/clients");
    return null;
  }
  const { data, isLoading } = useGetClientByIdQuery(clientId);

  function handleStatementDetails(statementId: string) {
    navigate(`/statements-details/${statementId}`);
  }

  function handleStatementCreate() {
    navigate(`/statements-create/${clientId}`);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-slate-600">Client Details</h1>
      <div className="w-full ">
        <div>{isLoading && <Loader2 className="mx-auto animate-spin" />}</div>
        {data && (
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-md p-6">
              <h2 className="text-xl font-semibold mb-4">Client Information</h2>
              <div className="flex gap-4">
                <div>
                  <span className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name:
                  </span>
                  {data.name || "--"}
                </div>

                <div>
                  <span className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email:
                  </span>
                  {data.email || "--"}
                </div>

                <div>
                  <span className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doc:
                  </span>
                  {data.doc || "--"}
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-md p-6">
              <div className="flex justify-between pb-6">
                <h2 className="text-xl font-semibold mb-4">Statements</h2>
                <button
                  className="p-2 bg-blue-500 text-white text-sm rounded"
                  onClick={() => handleStatementCreate()}
                >
                  Send
                </button>
              </div>
              {data.statements && data.statements.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bank <br /> Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statement <br /> Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Account <br /> Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Account <br /> Number
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Beginning <br /> Balance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ending <br /> Balance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created-At
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.statements.map((statement: Statement) => (
                        <tr key={statement.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {statement.bankName || "--"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(
                              statement.statementDate
                            ).toLocaleDateString() || "--"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {statement.accountType || "--"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {statement.accountNumber || "--"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {statement.beginningBalance || "--"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {statement.endingBalance || "--"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(
                              statement.createdAt
                            ).toLocaleDateString() || "--"}
                          </td>
                          <td>
                            <Button
                              className="bg-blue-500 text-white px-4 py-2"
                              onClick={() =>
                                handleStatementDetails(statement.id)
                              }
                            >
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No statements found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailsClient;
