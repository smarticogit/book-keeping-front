import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { ScrollArea } from "../ui/scroll-area";

export function Layout() {
  return (
    <div className="flex p-5 gap-5">
      <div className="w-60">
        <Sidebar />
      </div>

      <div className="flex justify-center w-[75%] h-[90vh] rounded-xl bg-slate-200">
        <ScrollArea className="flex justify-center items-center w-full overflow-auto">
          <div className="w-full">
            <Outlet />
          </div>
        </ScrollArea>
      </div>

      <div className="w-20 h-40 bg-slate-200 rounded-xl">
        <Navbar />
      </div>
    </div>
  );
}
