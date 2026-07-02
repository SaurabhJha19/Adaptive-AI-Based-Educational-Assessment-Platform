import OfficialExam from "../models/official-exam.model";
import { SimulatorStatus } from "../constants/simulator-status.enum";

class SimulatorService {
  async create(payload: any) {
    return OfficialExam.create(payload);
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