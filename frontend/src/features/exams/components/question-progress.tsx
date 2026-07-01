type Props = {

  current: number;

  total: number;

};

export default function QuestionProgress({

  current,

  total,

}: Props) {

  const progress =
    ((current + 1) / total) * 100;

  return (

    <div className="space-y-3">

      <div className="flex justify-between">

        <span className="font-medium">

          Progress

        </span>

        <span>

          {current + 1}
          {" / "}
          {total}

        </span>

      </div>

      <div className="h-2 rounded-full bg-muted">

        <div
          className="h-2 rounded-full bg-primary transition-all"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>

  );

}