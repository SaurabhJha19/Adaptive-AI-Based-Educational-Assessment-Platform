interface Props {
  question: any;
  answer?: string;
  onAnswer: (value: string) => void;
}

export default function QuestionView({
  question,
  answer,
  onAnswer,
}: Props) {
  return (
    <div className="mx-auto max-w-4xl">

      <div className="mb-6 text-xl font-semibold">
        Question {question.questionNumber}
      </div>

      <div className="mb-8 whitespace-pre-wrap text-lg">
        {question.prompt}
      </div>

      <div className="space-y-4">
        {question.options.map(
          (option: string) => (
            <button
              key={option}
              onClick={() =>
                onAnswer(option)
              }
              className={`block w-full rounded-lg border p-4 text-left transition
                ${
                  answer === option
                    ? "border-black bg-gray-100"
                    : "hover:bg-gray-50"
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