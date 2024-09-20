import { BadgeDollarSign, BarChart2, FileText, Users } from "lucide-react";

export const sidebarItems = [
  {
    label: "Dashboard",
    icon: <BarChart2 />,
    href: "/dashboard",
  },
  {
    label: "Clients",
    icon: <Users />,
    href: "/clients",
  },
  {
    label: "Reports",
    icon: <FileText />,
    href: "/reports",
  },
  {
    label: "Statements",
    icon: <BadgeDollarSign />,
    href: "/statements",
  },
];
