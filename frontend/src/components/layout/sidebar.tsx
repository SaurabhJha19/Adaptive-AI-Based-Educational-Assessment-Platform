"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FileText,
  BookOpen,
  BarChart3,
  Brain,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/providers/auth-provider";

export default function Sidebar() {

  const router =
    useRouter();

  const {
    logout,
  } = useAuth();

  const handleLogout =
    () => {

      logout();

      router.push(
        "/login"
      );
    };

  return (
    <aside
      className="
      w-64
      min-h-screen
      border-r
      p-4
      flex
      flex-col
      "
    >
      <h1
        className="
        text-xl
        font-bold
        mb-8
        "
      >
        AI Assessment
      </h1>

      <nav className="space-y-2">

        <Link
          href="/dashboard"
          className="flex gap-2"
        >
          <BookOpen size={18} />
          Dashboard
        </Link>

        <Link
          href="/documents"
          className="flex gap-2"
        >
          <FileText size={18} />
          Documents
        </Link>

        <Link
          href="/exams"
          className="flex gap-2"
        >
          <BookOpen size={18} />
          Exams
        </Link>

        <Link
          href="/analytics"
          className="flex gap-2"
        >
          <BarChart3 size={18} />
          Analytics
        </Link>

        <Link
          href="/explainer"
          className="flex gap-2"
        >
          <Brain size={18} />
          Explainer
        </Link>

      </nav>

      <button
        onClick={handleLogout}
        className="
        mt-auto
        flex
        gap-2
        "
      >
        <LogOut size={18} />
        Logout
      </button>

    </aside>
  );
}