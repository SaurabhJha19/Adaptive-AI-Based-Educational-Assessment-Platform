"use client";

import { useEffect } from "react";

type Props = {
  totalMinutes: number;
  remainingTime: number;
  onTick: (seconds: number) => void;
  onTimeout: () => void;
};

export default function ExamTimer({
  totalMinutes,
  remainingTime,
  onTick,
  onTimeout,
}: Props) {
  useEffect(() => {
    if (remainingTime <= 0) {
      onTimeout();
      return;
    }

    const interval = setInterval(() => {
      onTick(remainingTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [
    remainingTime,
    onTick,
    onTimeout,
  ]);

  const minutes = Math.floor(
    remainingTime / 60
  );

  const seconds =
    remainingTime % 60;

  return (
    <div className="rounded-lg border px-4 py-2 font-semibold">
      {minutes}:
      {seconds
        .toString()
        .padStart(2, "0")}
    </div>
  );
}