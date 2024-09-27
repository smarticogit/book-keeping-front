import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useGetClientByIdQuery } from "@/hooks/client/use-get-client-by-id";

type Statement = {
  clientId: string;
  bankName: string;
  statementFile?: File[];
};

export function CreateStatement() {
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>();

  if (!clientId) {
    toast.error("Erro ao criar o extrato, cliente não encontrado");
    navigate("/clients");
    return null;
  }

  const client = useGetClientByIdQuery(clientId);

  {
    client.isLoading && <div>Loading...</div>;
  }
  {
    client.isError && <div>Error loading client data</div>;
  }

  const { register, handleSubmit } = useForm<Statement>();

  const onSubmit = async (data: Statement) => {
    const file = data.statementFile?.[0];

    if (!file) {
      toast.error("Selecione o arquivo");
      return;
    }

    const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Selecione um arquivo do tipo PDF, PNG ou JPG");
      return;
    }

    const formData = new FormData();
    formData.append("statementFile", file);
    formData.append("clientId", data.clientId);
    formData.append("bankName", data.bankName);

    try {
      const response = await fetch("http://localhost:3333/statements", {
        method: "POST",
        body: formData,
      });

      console.log(response);

      if (response.ok) {
        toast.success("Cliente criado com sucesso!");
      } else {
        toast.error("Erro ao enviar o extrato");
      }
    } catch (error) {
      toast.error("Erro na requisição: " + error);
    }
  };

  async function handleOCRProcess() {
    try {
      const response = await fetch(
        "http://localhost:3333/statements/1727213827633",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast("OCR processado com sucesso!");
      } else {
        console.error("Erro ao criar cliente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  const handleGetStatement = () => {
    toast("redirecionado para o extrato");
    setTimeout(() => navigate("/ocr"), 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[30rem] p-5 gap-5">
      {client.isLoading && <div>Loading...</div>}
      {client.isError && <div>Error loading client data</div>}
      {client.data && (
        <div className="mb-4">
          <label className="block text-gray-700">Cliente</label>
          <div className="border p-2 rounded">{client.data.name}</div>
        </div>
      )}

      <input type="hidden" value={clientId} {...register("clientId")} />

      <div className="mb-4">
        <label htmlFor="bank">Selecione um banco</label>
        <select
          id="bank"
          {...register("bankName")}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="Citybank">Citybank</option>
          <option value="Bookbank">Bookbank</option>
          <option value="Nubank">Bookbank</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Extrato (PDF)</label>

        <input
          {...register("statementFile")}
          className="w-full px-3 py-2 border rounded"
          type="file"
          accept="application/pdf"
        />
      </div>

      <button
        type="submit"
        className="mb-4 w-full bg-blue-500 text-white py-2 rounded"
      >
        Send
      </button>

      <button
        onClick={() => handleOCRProcess()}
        type="button"
        className="mb-4 w-full bg-blue-500 text-white py-2 rounded"
      >
        OCR Process
      </button>

      <button
        onClick={() => handleGetStatement()}
        type="button"
        className="mb-4 w-full bg-blue-500 text-white py-2 rounded"
      >
        Get Statement
      </button>
    </form>
  );
}

export default CreateStatement;
