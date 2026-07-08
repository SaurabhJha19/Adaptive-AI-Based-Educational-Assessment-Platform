import { ExamAttemptModel } from "../../../models/exam-attempt.model";
import OfficialExam from "../models/official-exam.model";

class EvaluateAttemptService {

    async execute(
        attemptId: string
    ) {

        const attempt =
            await ExamAttemptModel.findById(attemptId);

        if (!attempt) {

            throw new Error(
                "Attempt not found."
            );

        }

        console.log("================================");
        console.log("ATTEMPT ANSWERS");
        console.log("================================");
        console.log("Total:", attempt.answers.length);
        console.log(attempt.answers);

        const exam =
            await OfficialExam.findById(
                attempt.sourceId
            );

        if (!exam) {

            throw new Error(
                "Exam not found."
            );

        }

        const questions =
            exam.sections.flatMap(
                section =>
                    section.questionGroups.flatMap(
                        (group: any) =>
                            group.questions
                    )
            );

        console.log("================================");
        console.log("EXAM QUESTIONS");
        console.log("================================");
        console.log("Total:", questions.length);

        let score = 0;

        attempt.answers =
            attempt.answers.map(answer => {

                const question =
                    questions.find(
                        q =>
                            q._id?.toString() ===
                            answer.questionId.toString()
                    );

                console.log("--------------------------------");
                console.log({
                    answerQuestionId:
                        answer.questionId.toString(),

                    matchedQuestionId:
                        question?._id?.toString(),

                    selectedAnswer:
                        answer.selectedAnswer,

                    correctAnswer:
                        question?.correctAnswer,
                });

                const correct =
                    question?.correctAnswer ===
                    answer.selectedAnswer;

                if (correct) {

                    score++;

                }

                return {

                    questionId:
                        answer.questionId,

                    selectedAnswer:
                        answer.selectedAnswer,

                    isCorrect:
                        correct,

                };

            });

        attempt.score =
            score;

        attempt.totalQuestions =
            questions.length;

        attempt.percentage =
            Number(
                (
                    score /
                    questions.length *
                    100
                ).toFixed(2)
            );

        attempt.status =
            "COMPLETED";

        attempt.submittedAt =
            new Date();

        await attempt.save();

        console.log("================================");
        console.log("FINAL SCORE");
        console.log(score);
        console.log("================================");

        return {

            attempt,

            exam,

        };

    }

}

export default new EvaluateAttemptService();