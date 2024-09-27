import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetClientsQuery } from "@/hooks/client/use-get-clients";
import { Client } from "./client.types";
import { toast } from "sonner";

export function FindAllClients() {
  const navigate = useNavigate();
  const clients = useGetClientsQuery();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleSelectChange = (client: Client) => {
    setSelectedClient(client);
  };

  const handleSubmit = () => {
    if (!selectedClient) {
      toast.error("Por favor, selecione um cliente.");
      return;
    }
    navigate(`/statements-create/${selectedClient.id}`);
  };

  async function handleClientDetails() {
    if (!selectedClient) {
      toast.error("Por favor, selecione um cliente.");
      return;
    }

    navigate(`/clients-details/${selectedClient.id}`);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-slate-600">Clients List</h1>

      <table className="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Select</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Mail</th>
          </tr>
        </thead>
        <tbody>
          {clients.data?.map((client: Client) => (
            <tr key={client.id}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <input
                  type="radio"
                  name="selectClient"
                  onChange={() => handleSelectChange(client)}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {client.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {client.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center gap-5">
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send Statement
        </button>

        <button
          onClick={handleClientDetails}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Client Details
        </button>
      </div>
    </div>
  );
}

export default FindAllClients;
