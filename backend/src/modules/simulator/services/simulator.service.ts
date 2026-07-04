import OfficialExam from "../models/official-exam.model";
import { SimulatorStatus } from "../constants/simulator-status.enum";
import { randomUUID } from "crypto";
import { uploadFileToS3 } from "../../../services/storage/s3.service";

class SimulatorService {
async create({
    body,
    file,
}: {
    body: any;
    file: Express.Multer.File;
}) {

    const key =
        `official-exams/${randomUUID()}-${file.originalname}`;

    const uploaded =
        await uploadFileToS3(
            file,
            key
        );

    const exam =
        await OfficialExam.create({

            title:
                body.title,

            examCode:
                body.examCode,

            examType:
                body.examType,

            slug: body.title
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, ""),

            pdfUrl:
                uploaded.url,

            duration: Number(body.duration) || 180,

            pdfKey:
                uploaded.key,

            status:
                SimulatorStatus.PROCESSING,
        });

    process.nextTick(async () => {
        try {

            await this.parseExam(
                exam._id.toString()
            );

        } catch (err) {

            console.error(err);

            await OfficialExam.findByIdAndUpdate(
                exam._id,
                {
                    status: "failed",
                }
            );

        }
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
    const exam = await OfficialExam.findById(examId);

    if (!exam) return;

    exam.sections = [
        {
            title: "Reading",
            order: 1,
            questionGroups: [],
        },
        {
            title: "Listening",
            order: 2,
            questionGroups: [],
        },
        {
            title: "Speaking",
            order: 3,
            questionGroups: [],
        },
        {
            title: "Writing",
            order: 4,
            questionGroups: [],
        },
    ];

    exam.status = SimulatorStatus.REVIEW;

    await exam.save();
}

  async update(id: string, payload: any) {
    return OfficialExam.findByIdAndUpdate(id, payload, {
      new: true,
    });
  }

  async publish(id: string) {
    return OfficialExam.findByIdAndUpdate(
      id,
      {
        status: SimulatorStatus.PUBLISHED,
      },
      {
        new: true,
      }
    );
  }

  async getAll() {
    return OfficialExam.find()
      .sort({
        createdAt: -1,
      });
  }

  async archive(id: string) {
    return OfficialExam.findByIdAndUpdate(
      id,
      {
        status: SimulatorStatus.ARCHIVED,
      },
      {
        new: true,
      }
    );
  }

  async delete(id: string) {
    return OfficialExam.findByIdAndDelete(id);
  }
}

export default new SimulatorService();