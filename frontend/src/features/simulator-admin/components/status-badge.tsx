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
    UPLOADED: {

        label: "Uploaded",

        className:
            "bg-slate-600 hover:bg-slate-600",

    },

    PARSING: {

        label: "Parsing",

        className:
            "bg-amber-500 hover:bg-amber-500",

    },

    REVIEW: {

        label: "Review",

        className:
            "bg-blue-600 hover:bg-blue-600",

    },

    VALIDATED: {

        label: "Validated",

        className:
            "bg-indigo-600 hover:bg-indigo-600",

    },

    PUBLISHED: {

        label: "Published",

        className:
            "bg-green-600 hover:bg-green-600",

    },

    ARCHIVED: {

        label: "Archived",

        className:
            "bg-gray-700 hover:bg-gray-700",

    },

    FAILED: {

        label: "Failed",

        className:
            "bg-red-600 hover:bg-red-600",

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