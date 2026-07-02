"use client";

import { Bell, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AppHeader() {

  return (

    <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-background/80 px-8 backdrop-blur">

      <div className="relative w-96">

        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          placeholder="Search..."
          className="pl-10"
        />

      </div>

      <div className="flex items-center gap-6">

        <Bell className="h-5 w-5 cursor-pointer" />

        <Avatar>

          <AvatarFallback>

            SA

          </AvatarFallback>

        </Avatar>

      </div>

    </header>

  );

}