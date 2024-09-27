import FindAllClients from "./find-all-clients";
import { useNavigate } from "react-router-dom";

export function ClientPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col ">
      <button
        className="w-[8rem] p-2 rounded-md bg-slate-400 "
        onClick={() => navigate("/clients-create")}
      >
        Create Client
      </button>

      <FindAllClients />
    </div>
  );
}

export default ClientPage;
