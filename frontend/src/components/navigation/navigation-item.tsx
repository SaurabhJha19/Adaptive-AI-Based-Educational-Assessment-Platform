"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {

  title: string;

  href: string;

  icon: LucideIcon;

};

export default function NavigationItem({

  title,

  href,

  icon: Icon,

}: Props) {

  const pathname =
    usePathname();

  const active =
    pathname === href;

  return (

    <Link

      href={href}

      className={cn(

        "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",

        active

          ? "bg-primary text-primary-foreground shadow"

          : "hover:bg-muted"

      )}

    >

      <Icon className="h-5 w-5" />

      {title}

    </Link>

  );

}