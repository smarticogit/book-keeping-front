import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useGetClientByIdQuery } from "@/hooks/client/use-get-client-by-id";
import { useCreateStatementsMutation } from "@/hooks/statement/use-create-statement";
import { StatementCreate } from "./client.types";
import { Loader2 } from "lucide-react";

export function CreateStatement() {
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>();

  if (!clientId) {
    toast.error("Client not found");
    navigate("/clients");
    throw new Error("Client not found");
  }

  const client = useGetClientByIdQuery(clientId);

  const statementCreate = useCreateStatementsMutation();

  const { register, handleSubmit } = useForm<StatementCreate>();

  const onSubmit = async (data: StatementCreate) => {
    const file = data.statementFile?.[0];

    if (!file) {
      toast.error("Select a statement file");
      return;
    }

    const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Select a valid statement file");
      return;
    }

    const formData = new FormData();
    formData.append("statementFile", file);
    formData.append("clientId", data.clientId);
    formData.append("bankName", data.bankName);
    formData.append("customerName", client.data.name);

    statementCreate.mutate(formData);
  };

  statementCreate.isSuccess && navigate(`/clients-details/${clientId}`);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[30rem] p-5 gap-5">
      {client.data && (
        <div className="mb-4 flex items-center">
          <label className="block text-gray-700">Client: </label>
          <div className="border p-2 rounded">{client.data.name}</div>
        </div>
      )}

      <input type="hidden" value={clientId} {...register("clientId")} />

      <div className="mb-4">
        <label htmlFor="bank">Select Bank</label>
        <select
          id="bank"
          {...register("bankName")}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="Citybank">Fidelity Bank</option>
          <option value="Bank of America">Bank of America</option>
          <option value="Bookeeper Bank">Bookeeper Bank</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Statement (PDF)</label>

        <input
          {...register("statementFile")}
          className="w-full px-3 py-2 border rounded"
          type="file"
          accept="application/pdf"
        />
      </div>

      <button
        type="submit"
        className="mb-4 w-20 bg-blue-500 text-white py-2 rounded"
      >
        {statementCreate.isPending ? (
          <div className="flex justify-center items-center p-0">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          "Send"
        )}
      </button>
    </form>
  );
}

export default CreateStatement;
