"use client";

import { LogOut } from "lucide-react";

import {
  navigation,
  secondaryNavigation,
} from "@/components/navigation/navigation";

import NavigationItem from "@/components/navigation/navigation-item";

import { useLogout } from "@/hooks/use-logout";

export default function AppSidebar() {
  const logout = useLogout();

  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-card">

      {/* Logo */}
      <div className="border-b p-6">

        <h1 className="text-2xl font-bold tracking-tight">
          AI Assessment
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Adaptive Learning Platform
        </p>

      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-2 p-4">

        {navigation.map((item) => (
          <NavigationItem
            key={item.href}
            {...item}
          />
        ))}

      </nav>

      {/* Bottom Section */}
      <div className="space-y-2 border-t p-4">

        {secondaryNavigation.map((item) => (
          <NavigationItem
            key={item.href}
            {...item}
          />
        ))}

        <button
          onClick={logout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-red-500
            transition-all
            duration-200
            hover:bg-red-500/10
          "
        >
          <LogOut className="h-5 w-5" />

          Logout
        </button>

      </div>

    </aside>
  );
}