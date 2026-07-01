type Props = {
  total: number;
  current: number;

  answers: Record<string, string>;

  questionIds: string[];

  onSelect: (
    index: number
  ) => void;
};

export default function QuestionNavigation({
  total,
  current,
  answers,
  questionIds,
  onSelect,
}: Props) {

  return (
    <div className="flex flex-wrap gap-2">

      {Array.from({
        length: total,
      }).map((_, index) => {

        const answered =
          answers[
            questionIds[index]
          ];

        return (

          <button
            key={index}
            onClick={() =>
              onSelect(index)
            }
            className={`h-10 w-10 rounded-md border transition
              ${
                current === index
                  ? "bg-primary text-primary-foreground"
                  : answered
                  ? "bg-green-600 text-white"
                  : ""
              }
            `}
          >

            {index + 1}

          </button>

        );

      })}

    </div>
  );
}