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

        let score = 0;

        attempt.answers =
            attempt.answers.map(answer => {

                const question =
                    questions.find(
                        q =>
                            q._id?.toString() ===
                            answer.questionId.toString()
                    );

                const correct =
                    question?.correctAnswer ===
                    answer.selectedAnswer;

                if (correct) {

                    score++;

                }

                    return {

                        questionId: answer.questionId,

                        selectedAnswer: answer.selectedAnswer,

                        isCorrect: correct,

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

        return {

            attempt,

            exam,

        };

    }

}

export default new EvaluateAttemptService();