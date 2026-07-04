"use client";

import { useMemo, useState } from "react";

import {
  Search,
  RefreshCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import StatusBadge from "./status-badge";
import ExamActions from "./exam-actions";

import { OfficialExam } from "../types";

type Props = {
  exams: OfficialExam[];
  onRefresh: () => void;
};

export default function ExamTable({
  exams,
  onRefresh,
}: Props) {
  const [search, setSearch] =
    useState("");

  const filtered =
    useMemo(() => {
      if (!search) return exams;

      return exams.filter(
        (exam) =>
          exam.examCode
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          exam.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [search, exams]);

  if (exams.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center">

        <h3 className="text-lg font-semibold">
          No Official Exams
        </h3>

        <p className="mt-2 text-muted-foreground">
          Upload your first official
          TOEFL exam.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div className="relative w-80">

          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search exams..."
            className="pl-10"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        <Button
          variant="outline"
          onClick={onRefresh}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh
        </Button>

      </div>

      <div className="rounded-xl border">

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>
                Exam Code
              </TableHead>

              <TableHead>
                Title
              </TableHead>

              <TableHead>
                Type
              </TableHead>

              <TableHead>
                Questions
              </TableHead>

              <TableHead>
                Status
              </TableHead>

              <TableHead>
                Updated
              </TableHead>

              <TableHead className="w-16" />

            </TableRow>

          </TableHeader>

          <TableBody>

            {filtered.map(
              (exam) => (
                <TableRow
                  key={exam._id}
                >
                  <TableCell className="font-medium">
                    {
                      exam.examCode
                    }
                  </TableCell>

                  <TableCell>
                    {exam.title}
                  </TableCell>

                  <TableCell>
                    {
                      exam.examType
                    }
                  </TableCell>

                  <TableCell>
                    {
                      exam.totalQuestions
                    }
                  </TableCell>

                  <TableCell>
                    <StatusBadge
                      status={
                        exam.status
                      }
                    />
                  </TableCell>

                  <TableCell>
                    {new Date(
                      exam.updatedAt
                    ).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <ExamActions
                        examId={exam._id}
                        status={exam.status}
                    />
                  </TableCell>

                </TableRow>
              )
            )}

          </TableBody>

        </Table>

      </div>

    </div>
  );
}