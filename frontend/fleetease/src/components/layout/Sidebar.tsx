import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Home,
  Car,
  Calendar,
  Users,
  AlertTriangle,
  CalendarClock,
  BookA,
  UserCog,
  IdCard,
  FileSignature,
  Wrench,
} from "lucide-react";
import { useUser } from "../../contexts/UserContext";
import type { Role } from "../../contexts/UserContext";
import SidebarNavItem from "./SidebarNavItem";
import SidebarToggle from "./SidebarToggle";
interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const getNavItems = (role: Role | null): NavItem[] => {
  // Common items for all authenticated users
  const commonItems: NavItem[] = [
    { path: "/", label: "Dashboard", icon: Home },
  ];

  // Role-specific items
  const roleItems: Record<Role, NavItem[]> = {
    Driver: [
      { path: "/vehicles", label: "My Vehicles", icon: Car },
      { path: "/defects", label: "Report Defect", icon: AlertTriangle },
      { path: "/schedule", label: "My Schedule", icon: Calendar },
    ],
    Manager: [
      { path: "/vehicles", label: "Vehicles", icon: Car },
      { path: "/defects", label: "Defects", icon: Wrench },
      { path: "/schedule", label: "Schedule", icon: Calendar },
      { path: "/drivers", label: "Drivers", icon: Users },
      { path: "/insurances", label: "Insurances", icon: FileSignature },
      {
        path: "/Roles&Company",
        label: "Roles and Company",
        icon: IdCard,
      },
    ],
    Admin: [
      { path: "/user_management", label: "User Management", icon: UserCog },
      {
        path: "/inspection_intervals",
        label: "Inspection Interval",
        icon: CalendarClock,
      },
      { path: "/auditlog_book", label: "Auditlog Book", icon: BookA },
    ],
  };
  return role ? [...commonItems, ...roleItems[role]] : commonItems;
};

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useUser();

  const navItems = getNavItems(user?.role?.role_name || null);

  return (
    <div
      className={`bg-[#001529] text-white transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-60"
      }`}
    >
      <div className="fixed h-[calc(100vh-80px)] flex flex-col w-[inherit]">
        <nav className="flex-1 flex flex-col w-full">
          {navItems.map((item) => (
            <SidebarNavItem
              key={item.path}
              item={item}
              isActive={location.pathname === item.path}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
        <SidebarToggle
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>
    </div>
  );
};

export default Sidebar;
