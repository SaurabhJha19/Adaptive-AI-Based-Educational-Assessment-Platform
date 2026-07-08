"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/auth-provider";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const router = useRouter();

  const {
    isAuthenticated,
    isLoading,
    user,
  } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (requireAdmin && user?.role !== "admin") {
      router.replace("/dashboard");
      return;
    }
  }, [
    isAuthenticated,
    isLoading,
    requireAdmin,
    user,
    router,
  ]);

  if (isLoading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requireAdmin && user?.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}