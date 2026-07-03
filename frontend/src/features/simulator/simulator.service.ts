import api from "@/lib/api";

class SimulatorService {
  async getExamTypes() {
    const { data } = await api.get("/simulator/types");
    return data;
  }

  async getPublishedExams(examType?: string) {
    const { data } = await api.get("/simulator/exams", {
      params: { examType },
    });

    return data;
  }

    async startSimulator(id: string) {
    const { data } = await api.post(
        `/simulator/start/${id}`
    );

    return data;
    }

async getAttempt(id: string) {
  const { data } = await api.get(
    `/simulator/attempt/${id}`
  );

  return data;
}

}

export default new SimulatorService();