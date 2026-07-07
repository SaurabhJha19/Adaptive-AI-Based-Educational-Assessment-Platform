import { ExamAttemptModel } from "../../../models/exam-attempt.model";

class SaveAnswerService {

    async execute(

        attemptId: string,

        body: {

            questionId: string;

            selectedAnswer: string;

        }

    ) {

        const attempt =
            await ExamAttemptModel.findById(
                attemptId
            );

        if (!attempt) {

            throw new Error(
                "Attempt not found."
            );

        }

        const index =
            attempt.answers.findIndex(

                answer =>

                    answer.questionId.toString() ===
                    body.questionId

            );

        if (index >= 0) {

            attempt.answers[index].selectedAnswer =
                body.selectedAnswer;

        } else {

            attempt.answers.push({

                questionId: body.questionId as any,

                selectedAnswer:
                    body.selectedAnswer,

                isCorrect: false,

            });

        }

        attempt.lastSavedAt =
            new Date();

        await attempt.save();

        return attempt;

    }

}

export default new SaveAnswerService();