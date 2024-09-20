import { NavLink } from "react-router-dom";
import { sidebarItems } from "./sidebar-items";

export function Sidebar() {
  return (
    <div className="pb-12 hidden w-64 lg:block">
      <div className=" py-10">
        <div className="text-cyan-800 text-xl font-montserrat font-extrabold  flex justify-center">
          Book Keeping
        </div>

        <div className="py-10 px-4 gap-2 flex flex-col">
          {sidebarItems.map((item, i) => (
            <NavLink key={`${item}-${i}`} to={item.href}>
              {({ isActive }) =>
                isActive ? (
                  <div className="w-full flex p-4 rounded-xl text-base bg-cyan-200">
                    <span className="mr-3 text-mimoo-purple-600">
                      {item.icon}
                    </span>
                    <span className="text-bg-sky-800 font-semibold">
                      {item.label}
                    </span>
                  </div>
                ) : (
                  <div className="w-full flex text-cyan-800 p-4 rounded-xl hover:bg-cyan-100">
                    <span className="mr-3 text-cyan-800">{item.icon}</span>
                    <span className="text-cyan-800 font-normal">
                      {item.label}
                    </span>
                  </div>
                )
              }
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
