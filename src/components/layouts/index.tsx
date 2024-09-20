import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { ScrollArea } from "../ui/scroll-area";

export function Layout() {
  return (
    <div className="h-screen flex flex-row overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <ScrollArea
          className="bg-slate-100"
          style={{ height: "calc(100vh - 60px)" }} // 60px is the height of the navbar
        >
          <div className="px-4 py-6 lg:px-8 ">
            <Outlet />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
