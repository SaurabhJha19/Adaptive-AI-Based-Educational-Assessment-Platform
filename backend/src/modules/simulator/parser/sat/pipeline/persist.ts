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
        await OfficialExam.findOneAndUpdate(
            {
                examCode: exam.examCode,
            },
            {
                $set: {
                    title: exam.title,
                    duration: exam.duration,
                    sections: exam.sections,
                    totalQuestions: exam.totalQuestions,
                    metadata: exam.metadata,
                    status: exam.status,
                },
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
            }
        );

    return updated as IOfficialExam;

}