import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  BarChart3,
  User,
  Settings,
  GraduationCap,
} from "lucide-react";

export const navigation = [

  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },

  {
    title: "Exam Simulator",
    href: "/simulator",
    icon: GraduationCap
  },

  {
    title: "Exams",
    href: "/exams",
    icon: ClipboardList,
  },

  {
    title: "Results",
    href: "/results",
    icon: BarChart3,
  },

  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },

];

export const secondaryNavigation = [

  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },

];