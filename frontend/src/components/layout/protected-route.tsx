"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "@/providers/auth-provider";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const router =
    useRouter();

  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  useEffect(() => {

    if (
      !isLoading &&
      !isAuthenticated
    ) {

      router.push(
        "/login"
      );
    }

  }, [
    isAuthenticated,
    isLoading,
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

  return (
    <>
      {children}
    </>
  );
}