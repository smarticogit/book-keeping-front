import { Button } from "@/components/ui/button";
import { useGetStatementByIdQuery } from "@/hooks/statement/use-get-statement-by-id";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Statement } from "./client.types";
import { useUpdateStatementsMutation } from "@/hooks/statement/use-update-statement";

export function EditStatement() {
  const navigate = useNavigate();
  const { statementId } = useParams<{ statementId: string }>();

  if (!statementId) {
    toast.error("Erro ao obter o ID do extrato");
    return null;
  }

  const { data } = useGetStatementByIdQuery(statementId);

  const { register, handleSubmit } = useForm<Statement>({
    defaultValues: {
      bankName: data.bankName,
      customerName: data.client.name,
      customerNumber: data.customerNumber,
      accountNumber: data.accountNumber,
      accountType: data.accountType,
      statementDate: data.statementDate
        ? new Date(data.statementDate).toISOString().split("T")[0]
        : "",
      beginningBalance: data.beginningBalance,
      endingBalance: data.endingBalance,
    },
  });

  const statementMutation = useUpdateStatementsMutation(statementId);

  function handleStatementUpdate(formData: Statement) {
    statementMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Statement updated successfully!");
        navigate(`/statements-details/${statementId}`);
      },
      onError: () => {
        toast.error("Error updating statement");
      },
    });
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-slate-600 mb-4">Statement Edit</h1>

      <div className="space-y-6">
        <div className="bg-white shadow-md rounded-md p-6">
          <section className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4">Client Information</h2>
          </section>
          <div>
            <form
              onSubmit={handleSubmit(handleStatementUpdate)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <span className="font-medium">Bank name:</span>
                <input
                  type="text"
                  className="border p-2 rounded-md w-full"
                  {...register("bankName")}
                />
              </div>
              <div>
                <span className="font-medium">Client name:</span>
                <input
                  type="text"
                  className="border p-2 rounded-md w-full"
                  {...register("customerName")}
                />
              </div>
              <div>
                <span className="font-medium">Client number:</span>
                <input
                  type="text"
                  className="border p-2 rounded-md w-full"
                  {...register("customerNumber")}
                />
              </div>
              <div>
                <span className="font-medium">Account type:</span>
                <input
                  type="text"
                  className="border p-2 rounded-md w-full"
                  {...register("accountType")}
                />
              </div>
              <div>
                <span className="font-medium">Account number:</span>
                <input
                  type="text"
                  className="border p-2 rounded-md w-full"
                  {...register("accountNumber")}
                />
              </div>
              <div>
                <span className="font-medium">Beginning balance:</span>
                <input
                  type="text"
                  className="border p-2 rounded-md w-full"
                  {...register("beginningBalance")}
                />
              </div>
              <div>
                <span className="font-medium">Ending balance:</span>
                <input
                  type="text"
                  className="border p-2 rounded-md w-full"
                  {...register("endingBalance")}
                />
              </div>
              <div>
                <span className="font-medium">Statement date:</span>
                <input
                  type="date"
                  className="border p-2 rounded-md w-full"
                  {...register("statementDate")}
                />
              </div>
              <div>
                <Button className="bg-blue-500 text-white px-4 py-2">
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
