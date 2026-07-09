import { SimulatorButton } from "../ui";
import {
    getQuestionStatus,
} from "../../utils";

interface Props {
    questions: any[];
    currentQuestion: number;

    answers: Record<string, string>;
    visited: Set<string>;
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
  visited,
  onSelectQuestion,
}: Props) {
  return (
    <div className="w-72 border-l bg-gray-50 p-6">

      <h3 className="mb-4 text-lg font-semibold">
        Questions
      </h3>

      <div className="grid grid-cols-7 gap-2">

        {questions.map((question, index) => {

            const key =
                question._id ??
                question.questionNumber;

const status =
    getQuestionStatus({

        question,

        currentQuestion,

        answers,

        marked,

        visited,

    });

const variants = {
    current: "primary",
    answered: "success",
    marked: "danger",
    visited: "secondary",
    unanswered: "secondary",
} as const;
          return (

<SimulatorButton

    key={key}

    variantType={

        variants[status]
    }

    onClick={() =>

        onSelectQuestion(index)

    }

    className="h-11 w-11 p-0"

>

    {question.questionNumber}

</SimulatorButton>

          );

        })}

      </div>

    </div>
  );
}