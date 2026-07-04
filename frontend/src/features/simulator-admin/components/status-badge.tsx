"use client";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config: Record<
    string,
    { label: string; className: string }
  > = {
    DRAFT: {
      label: "Draft",
      className: "bg-gray-500 hover:bg-gray-500",
    },
    PROCESSING: {
      label: "Processing",
      className: "bg-yellow-500 hover:bg-yellow-500",
    },
    REVIEW: {
      label: "Review",
      className: "bg-blue-500 hover:bg-blue-500",
    },
    PUBLISHED: {
      label: "Published",
      className: "bg-green-600 hover:bg-green-600",
    },
    ARCHIVED: {
      label: "Archived",
      className: "bg-red-600 hover:bg-red-600",
    },
  };

  const current = config[status] ?? {
    label: status,
    className: "",
  };

  return (
    <Badge className={current.className}>
      {current.label}
    </Badge>
  );
}