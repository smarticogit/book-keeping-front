import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { ClientRequest } from "./client.types";
import { useGetClientByIdQuery } from "@/hooks/client/use-get-client-by-id";
import { useParams } from "react-router-dom";

export function UpdateClient() {
  const { clientId } = useParams();
  const { register, handleSubmit } = useForm<ClientRequest>();
  const { data } = useGetClientByIdQuery(clientId!);

  const onSubmit = async (data: ClientRequest) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className=" text-slate-600">Update Client</h1>
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
          className={`mb-4 w-full bg-blue-500 text-white py-2 rounded-mdhover:bg-blue-600`}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default UpdateClient;
