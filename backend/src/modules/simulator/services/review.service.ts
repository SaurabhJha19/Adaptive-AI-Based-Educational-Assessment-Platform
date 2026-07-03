import OfficialExam from "../models/official-exam.model";

class ReviewService {
  async review(examId: string) {
    const exam = await OfficialExam.findById(examId);

    if (!exam) {
      throw new Error("Official exam not found.");
    }

    return exam;
  }

  async update(examId: string, payload: any) {
    const exam = await OfficialExam.findByIdAndUpdate(
      examId,
      payload,
      {
        new: true,
      }
    );

    if (!exam) {
      throw new Error("Official exam not found.");
    }

    return exam;
  }
}

export default new ReviewService();