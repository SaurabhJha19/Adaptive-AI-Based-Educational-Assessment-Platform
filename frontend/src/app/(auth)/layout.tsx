"use client";

import ProtectedRoute from "@/components/layout/protected-route";
import AppSidebar from "@/components/layout/app-sidebar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background overflow-hidden">
        <AppSidebar />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}