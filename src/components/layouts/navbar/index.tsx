import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuUser } from "./dropdown-menu-user";
import avatarImage from "@/assets/avatar.svg";

export function Navbar() {
  return (
    <div className="bg-white py-2 h-[60px]">
      <div className="flex items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              className="object-cover"
              src={avatarImage}
              alt="avatar"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="flex-grow p-1">
            <h2 className="text-gray-900 text-base font-medium">User</h2>
            <p className="text-mimoo-purple-300 text-xs font-normal">Admin</p>
          </div>

          <DropdownMenuUser />
        </div>
      </div>
    </div>
  );
}
