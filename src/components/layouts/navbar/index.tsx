import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { DropdownMenuUser } from "./dropdown-menu-user";

export function Navbar() {
  return (
    <div className="bg-white py-2 h-[60px]">
      <div className="flex items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              className="object-cover"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmGfFfT-PPHiR2bX7Zwas7-R3ZYlf1ijATeeBazYwmUg0xrKSyHIEFkCGbV6NNuamjJuI&usqp=CAU"
              alt="avatar"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <h2 className="text-gray-900 text-base font-medium">User</h2>
            <p className="text-mimoo-purple-400 text-sm font-normal">Admin</p>
          </div>

          <DropdownMenuUser />
        </div>
      </div>
    </div>
  );
}
