import { Question }
from "../types";

type Props = {

  question: Question;

  selectedAnswer?: string;

  onAnswer: (
    answer: string
  ) => void;

};

export default function QuestionCard({

  question,

  selectedAnswer,

  onAnswer,

}: Props) {

  return (

    <div className="rounded-xl border p-8">

      <h2 className="mb-8 text-2xl font-semibold">

        {question.question}

      </h2>

      <div className="space-y-4">

        {question.options.map(
          option => (

            <button
              key={option}
              onClick={() =>
                onAnswer(option)
              }
              className={`w-full rounded-lg border p-4 text-left transition ${
                selectedAnswer === option
                  ? "border-primary bg-primary/10"
                  : "hover:bg-muted"
              }`}
            >

              {option}

            </button>

          )
        )}

      </div>

    </div>

  );

}