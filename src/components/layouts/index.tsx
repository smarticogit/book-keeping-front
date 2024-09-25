import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { ScrollArea } from "../ui/scroll-area";

export function Layout() {
  return (
    <div className=" relative">
      <div className="w-60 absolute top-5 left-5">
        <Sidebar />
      </div>

      <div className="w-20 h-40 bg-slate-200 absolute top-5 right-10 rounded-xl">
        <Navbar />
      </div>

      <div className="flex justify-center w-[70vw] h-[80vh] absolute top-5 left-72 rounded-xl bg-slate-200">
        <ScrollArea className="flex justify-center items-center w-full overflow-auto">
          <div className="w-full  absolute top-5">
            <Outlet />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
