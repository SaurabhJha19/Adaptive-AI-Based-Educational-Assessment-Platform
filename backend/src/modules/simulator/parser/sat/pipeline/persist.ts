import { SimulatorStatus } from "../../../constants/simulator-status.enum";
import OfficialExam, {
    IOfficialExam,
} from "../../../models/official-exam.model";

export async function persistExam(
    exam: IOfficialExam
): Promise<IOfficialExam> {

    exam.status =
        SimulatorStatus.REVIEW;

    const updated =
    await OfficialExam.findByIdAndUpdate(

        exam._id,

        {

            $set: {

                sections:
                    exam.sections,

                totalQuestions:
                    exam.totalQuestions,

                metadata:
                    exam.metadata,

                status:
                    SimulatorStatus.REVIEW,

            },

        },

        {

            new: true,

            runValidators: true,

        }
        );

    return updated as IOfficialExam;

}