"use client";

import {
  useEffect,
  useState,
} from "react";

type Props = {
  totalMinutes: number;
  onTimeout: () => void;
};

export default function ExamTimer({
  totalMinutes,
  onTimeout,
}: Props) {

  const [
    seconds,
    setSeconds,
  ] = useState(
    totalMinutes * 60
  );

  useEffect(() => {

    if (seconds <= 0) {

      onTimeout();

      return;
    }

    const interval =
      setInterval(() => {

        setSeconds(
          value => value - 1
        );

      }, 1000);

    return () =>
      clearInterval(
        interval
      );

  }, [
    seconds,
    onTimeout,
  ]);

  const minutes =
    Math.floor(
      seconds / 60
    );

  const remaining =
    seconds % 60;

  return (

    <div className="rounded-lg border px-4 py-2 font-semibold">

      {minutes}:
      {remaining
        .toString()
        .padStart(2, "0")}

    </div>

  );

}