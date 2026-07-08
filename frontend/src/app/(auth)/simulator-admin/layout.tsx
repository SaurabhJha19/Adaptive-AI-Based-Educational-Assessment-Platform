"use client";

import ProtectedRoute from "@/components/layout/protected-route";

export default function SimulatorAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requireAdmin>
      {children}
    </ProtectedRoute>
  );
}