import { useNavigate } from "react-router-dom";
import { useGetClientsQuery } from "@/hooks/client/use-get-clients";
import { Client } from "./client.types";
import { toast } from "sonner";

export function Clients() {
  const navigate = useNavigate();
  const clients = useGetClientsQuery();

  async function handleButtons(clientId: string, route: string) {
    if (!clientId) {
      toast.error("Please select a client");
      return;
    }

    navigate(`/${route}/${clientId}`);
  }

  return (
    <div className="w-full">
      <div className="flex justify-evenly items-center">
        <h1 className="text-slate-600 pb-6">Clients List</h1>
        <button
          onClick={() => navigate("/clients-create")}
          className="p-2 bg-blue-500 text-white text-sm rounded"
        >
          Create Client
        </button>
      </div>
      <div className="bg-white shadow-md rounded-md p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mail
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DOC
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.data?.map((client: Client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {client.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {client.email}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {client.doc}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button
                    onClick={() => handleButtons(client.id!, "clients-details")}
                    className="p-2 bg-blue-500 text-white text-sm rounded"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clients;
