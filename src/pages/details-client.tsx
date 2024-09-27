import { useGetClientByIdQuery } from "@/hooks/client/use-get-client-by-id";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export function DetailsClient() {
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>();

  if (!clientId) {
    toast.error("Error to get client");
    navigate("/clients");
    return null;
  }
  const client = useGetClientByIdQuery(clientId);

  if (client.isLoading) {
    return <div><Loader2 className="mx-auto animate-spin" /></div>;
  }

  function handleProcess(statementId: string) {
    navigate(`/statements-details/${statementId}`);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-slate-600">Client Details</h1>

      <div className="my-4 w-full max-w-lg bg-slate-100 shadow-md p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Client Information</h2>
        <p>
          <strong>Name:</strong> {client.data.name}
        </p>
        <p>
          <strong>Email:</strong> {client.data.email}
        </p>
      </div>

      <div className="w-full ">
        <h2 className="text-lg font-semibold mb-2">Statements</h2>
        {client.data.statements?.length > 0 ? (
          <table className="table-auto border-collapse  w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Bank Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Statement Date
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Statement Key
                </th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {client.data.statements.map((statement: any) => (
                <tr key={statement.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {statement.bankName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {statement.statementDate
                      ? new Date(statement.statementDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {statement.statementKey}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(statement.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded text-sm"
                      onClick={() => handleProcess(statement.id)}
                    >
                      Process
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No statements available for this client.</p>
        )}
      </div>
    </div>
  );
}

export default DetailsClient;
