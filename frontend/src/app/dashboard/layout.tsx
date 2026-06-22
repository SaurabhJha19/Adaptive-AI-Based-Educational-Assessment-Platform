import Sidebar
from "@/components/layout/sidebar";

import ProtectedRoute
from "@/components/layout/protected-route";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ProtectedRoute>

      <div className="flex">

        <Sidebar />

        <main
          className="
          flex-1
          p-6
          "
        >
          {children}
        </main>

      </div>

    </ProtectedRoute>
  );
}