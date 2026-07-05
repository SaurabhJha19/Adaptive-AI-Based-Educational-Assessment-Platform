interface Props {
    questions: any[];
    currentQuestion: number;

    answers: Record<string, string>;

    marked: string[];

    onSelectQuestion: (
        index: number
    ) => void;
}

export default function QuestionPalette({
  questions,
  currentQuestion,
  answers,
  marked,
  onSelectQuestion,
}: Props) {
  return (
    <div className="w-72 border-l bg-gray-50 p-6">

      <h3 className="mb-4 text-lg font-semibold">
        Questions
      </h3>

      <div className="grid grid-cols-5 gap-2">

        {questions.map((question, index) => {

            const key =
                question._id ??
                question.questionNumber;

            const answered =
                !!answers[key];

            const review =
                marked.includes(key);

            const active =
                question.questionNumber === currentQuestion;

          return (

            <button
              key={key}
              onClick={() =>
                onSelectQuestion(index)
              }
                className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm transition

                ${
                    active
                        ? "bg-black text-white"

                        : review
                        ? "bg-yellow-400 text-black"

                        : answered
                        ? "bg-green-500 text-white"

                        : "bg-white hover:bg-gray-100"
                }`}
            >
              {question.questionNumber}
            </button>

          );

        })}

      </div>

    </div>
  );
}