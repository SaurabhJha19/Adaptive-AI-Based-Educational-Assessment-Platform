"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import simulatorService from "@/features/simulator/simulator.service";

export default function SimulatorAttemptPage() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await simulatorService.getAttempt(
          params.id as string
        );

        /*
         * Temporary:
         * Reuse the existing exam player until we
         * completely merge Simulator + AI Assessment.
         */

        router.replace(
          `/exams/${data.exam._id}/start?attempt=${data.attempt._id}&source=simulator`
        );
      } catch (err) {
        console.error(err);

        router.replace("/simulator");
      }
    };

    load();
  }, [params.id, router]);

  return (
    <div className="flex h-[70vh] items-center justify-center">
      Loading simulator...
    </div>
  );
}