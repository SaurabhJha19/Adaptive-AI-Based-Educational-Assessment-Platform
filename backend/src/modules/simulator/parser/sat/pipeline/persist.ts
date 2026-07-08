import { SimulatorStatus } from "../../../constants/simulator-status.enum";
import OfficialExam, {
    IOfficialExam,
} from "../../../models/official-exam.model";
import {
    validateExam,
} from "../../core/validation";

export async function persistExam(
    exam: IOfficialExam
): Promise<IOfficialExam> {

    validateExam(exam);

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

                    status:
                        SimulatorStatus.REVIEW,

                    metadata: {

                            ...exam.metadata,

                            parser: {

                                parserVersion:
                                    "1.0.0",

                                extractorVersion:
                                    "pdfjs-1.0.0",

                                promptVersion:
                                    "sat-prompt-2.0.0",

                                schemaVersion:
                                    "content-schema-1.0.0",

                                llmModel:
                                    process.env.OPENAI_MODEL,

                                parsedAt:
                                    new Date(),

                                processingTimeMs:
                                    exam.metadata?.parser?.processingTimeMs ?? 0,

                            },

                        },

                },

            },

            {

                new: true,

                runValidators: true,

            }

        );

    if (!updated) {

        throw new Error(
            "Failed to persist parsed exam."
        );

    }

    return updated;

}