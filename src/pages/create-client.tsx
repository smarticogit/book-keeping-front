import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClientRequest } from "./client.types";
import { usePostClientsMutation } from "@/hooks/client/use-post-clients";
import { useNavigate } from "react-router-dom";


export function CreateClient() {
  const { register, handleSubmit } = useForm<ClientRequest>();
  const navigate = useNavigate();

  const mutation = usePostClientsMutation();

  const onSubmit = async (data: ClientRequest) => {
    mutation.mutate(
      {
        name: data.name,
        email: data.email,
        doc: data.doc,
      },
      {
        onSuccess: () => {
          toast.success("Client created successfully!");
          navigate("/clients");
        },
        onError: () => {
          toast.error("Error creating client");
        },
      }
    );
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
          disabled={mutation.isPending}
          className={`mb-4 w-full bg-blue-500 text-white py-2 rounded-mdhover:bg-blue-600 ${
            mutation.isPending && "opacity-50 cursor-not-allowed"
          }`}
        >
          {mutation.isPending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default CreateClient;
