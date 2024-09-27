import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Client } from "./client.types";
import { apiPost } from "@/api/post";

export function CreateClient() {
  const { register, handleSubmit } = useForm<Client>();

  const onSubmit = async (data: Client) => {
    const requestData = {
      name: data.name,
      email: data.email,
      doc: data.doc,
    };

    const { isError, isSuccess } = await apiPost("clients", requestData);

    isSuccess && toast.success("Cliente criado com sucesso!");

    isError && toast.error("Erro ao criar cliente.");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className=" text-slate-600">Create Client</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[30rem] p-5 gap-5">
        <div className="mb-4">
          <label className=" font-montserrat  text-gray-700">Name</label>
          <Input {...register("name")} />
        </div>

        <div className="mb-4">
          <label className=" font-montserrat text-gray-700">Mail</label>
          <Input {...register("email")} />
        </div>

        <div className="mb-4">
          <label className=" font-montserrat text-gray-700">Doc</label>
          <Input {...register("doc")} />
        </div>

        <button
          type="submit"
          className="mb-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default CreateClient;
