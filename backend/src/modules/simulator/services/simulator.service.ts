import OfficialExam from "../models/official-exam.model";
import { SimulatorStatus } from "../constants/simulator-status.enum";
import {
    deleteFileFromS3,
} from "../../../services/storage/s3.service";

import {
    uploadFileToS3,
} from "../../../services/storage/s3.service";

import satParserPipeline
from "../parser/sat/pipeline/sat-parser.pipeline";

class SimulatorService {

    async create({
        body,
        files,
    }: {
        body: any;
        files: {
            questionPdf: Express.Multer.File[];
            answerPdf: Express.Multer.File[];
        };
    }) {

        /*
        |--------------------------------------------------------------------------
        | Validation
        |--------------------------------------------------------------------------
        */

        const existing =
            await OfficialExam.findOne({
                examCode:
                    body.examCode
                        .trim()
                        .toUpperCase(),
            });

        if (existing) {

            throw new Error(
                "Exam Code already exists."
            );

        }

        const questionFile =
            files.questionPdf?.[0];

        if (!questionFile) {

            throw new Error(
                "Question PDF is required."
            );

        }

        const answerFile =
            files.answerPdf?.[0];

        /*
        |--------------------------------------------------------------------------
        | Upload Question PDF
        |--------------------------------------------------------------------------
        */

        const questionKey =
            `official-exams/${body.examType}/${body.examCode}/question.pdf`;

        const uploadedQuestion =
            await uploadFileToS3(
                questionFile,
                questionKey
            );

        /*
        |--------------------------------------------------------------------------
        | Upload Answer Key
        |--------------------------------------------------------------------------
        */

        let uploadedAnswer:
            | {
                  key: string;
                  url: string;
              }
            | undefined;

        if (answerFile) {

            const answerKey =
                `official-exams/${body.examType}/${body.examCode}/answer-key.pdf`;

            uploadedAnswer =
                await uploadFileToS3(
                    answerFile,
                    answerKey
                );

        }

        /*
        |--------------------------------------------------------------------------
        | Create Exam
        |--------------------------------------------------------------------------
        */

        const exam =
            await OfficialExam.create({

                examCode:
                    body.examCode
                        .trim()
                        .toUpperCase(),

                title:
                    body.title,

                examType:
                    body.examType,

                slug:
                    body.title
                        .trim()
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(
                            /[^a-z0-9-]/g,
                            ""
                        ),

                pdfUrl:
                    uploadedQuestion.url,

                pdfKey:
                    uploadedQuestion.key,

                answerPdfUrl:
                    uploadedAnswer?.url ??
                    "",

                answerPdfKey:
                    uploadedAnswer?.key ??
                    "",

                duration:
                    Number(
                        body.duration
                    ) || 180,

                status:
                    SimulatorStatus.UPLOADED,

            });

        return exam;

    }

  async getExamTypes() {
    return OfficialExam.distinct("examType");
  }

    async getPublishedExams(
    examType?: string,
    page = 1,
    limit = 20,
    search?: string
    ) {
    const query: any = {
        status: SimulatorStatus.PUBLISHED,
    };

    if (examType) {
        query.examType = examType;
    }

    if (search) {
        query.title = {
            $regex: search,
            $options: "i",
        };
    }

    return OfficialExam.find(query)
        .select("-sections")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    }

  async getExam(id: string) {
    return OfficialExam.findById(id);
  }

async parseExam(examId: string) {

    const exam =
        await OfficialExam.findById(
            examId
        );

    if (!exam) {

        throw new Error(
            "Official exam not found."
        );

    }

    if (
        exam.status ===
        SimulatorStatus.PARSING
    ) {

        throw new Error(
            "Exam is already being parsed."
        );

    }

    await OfficialExam.findByIdAndUpdate(
        examId,
        {
            status:
                SimulatorStatus.PARSING,
        }
    );

    try {

        switch (
            exam.examType
        ) {

            case "SAT":

                await satParserPipeline.execute(
                    exam
                );

                break;

            default:

                throw new Error(
                    `Parser not implemented for ${exam.examType}`
                );

        }

        await OfficialExam.findByIdAndUpdate(
            examId,
            {
                status:
                    SimulatorStatus.REVIEW,
            }
        );

        return await OfficialExam.findById(
            examId
        );

    } catch (error) {

        console.error(error);

        await OfficialExam.findByIdAndUpdate(
            examId,
            {
                status:
                    SimulatorStatus.FAILED,
            }
        );

        throw error;

    }

}

async startParsing(
    examId: string
) {

    return this.parseExam(
        examId
    );

}

async update(
    id: string,
    payload: any
) {

    delete payload.pdfUrl;
    delete payload.pdfKey;

    delete payload.answerPdfUrl;
    delete payload.answerPdfKey;

    delete payload.status;

    return OfficialExam.findByIdAndUpdate(

        id,

        payload,

        {

            new: true,

            runValidators: true,

        }

    );

}
async publish(id: string) {

    const exam =
        await OfficialExam.findById(id);

    if (!exam) {

        throw new Error(
            "Exam not found."
        );

    }

    if (
        exam.status !==
        SimulatorStatus.REVIEW
    ) {

        throw new Error(
            "Only reviewed exams can be published."
        );

    }

    exam.status =
        SimulatorStatus.PUBLISHED;

    await exam.save();

    return exam;

}

async getAll() {

    return OfficialExam.find()

        .sort({

            createdAt: -1,

        })

        .lean();

}

async archive(id: string) {

    const exam =
        await OfficialExam.findById(id);

    if (!exam) {

        throw new Error(
            "Exam not found."
        );

    }

    exam.status =
        SimulatorStatus.ARCHIVED;

    await exam.save();

    return exam;

}

async delete(id: string) {

    const exam =
        await OfficialExam.findById(id);

    if (!exam) {

        throw new Error(
            "Exam not found."
        );

    }

    if (exam.pdfKey) {

        await deleteFileFromS3(
            exam.pdfKey
        );

    }

    if (exam.answerPdfKey) {

        await deleteFileFromS3(
            exam.answerPdfKey
        );

    }

    await OfficialExam.findByIdAndDelete(
        id
    );

    return {
        success: true,
    };

}
}
export default new SimulatorService();