"use client";

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: Props) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border bg-background py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}