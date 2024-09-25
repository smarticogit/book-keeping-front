import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type Client = {
  name: string;
  email: string;
  bankName: string;
  statementDate: string;
  statementFile?: File[];
};

const ClientForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Client>();

  const onSubmit = async (data: Client) => {
    const file = data.statementFile?.[0];

    if (!file) {
      console.error("No file selected");
      return;
    }

    const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      console.error("Unsupported file format");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const result = reader.result;
      if (typeof result !== "string") {
        console.error("Erro ao ler o arquivo, o resultado não é uma string");
        return;
      }

      const base64File = result.split(",")[1];

      const requestData = {
        name: data.name,
        email: data.email,
        bankName: data.bankName,
        statementDate: data.statementDate,
        statementFile: base64File,
        fileType: file.type,
      };

      try {
        const response = await fetch("http://localhost:3333/clients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          toast("Cliente criado com sucesso!");
        } else {
          console.error("Erro ao criar cliente.");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    reader.onerror = (error) => {
      console.error("Erro ao ler o arquivo:", error);
    };
  };

  async function handleOCRProcess() {
    try {
      const response = await fetch("http://localhost:3333/ocr/1727213827633", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

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
      <div className="mb-4">
        <label className="block text-gray-700">Nome</label>
        <Input {...register("name")} />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <Input {...register("email")} />
      </div>

      <div className="mb-4">
        <label htmlFor="bank">Choose a bank:</label>
        <select
          id="bank"
          {...register("bankName")}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="citybank">Citybank</option>
          <option value="bookbank">Bookbank</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">
          Data do extrato (MM-DD-YYYY)
        </label>
        <Input {...register("statementDate")} />
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
};

export default ClientForm;
