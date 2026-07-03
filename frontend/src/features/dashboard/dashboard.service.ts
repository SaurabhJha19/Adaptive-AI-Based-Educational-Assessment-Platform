import api from "@/lib/api";

import { DashboardResponse } from "./types";

class DashboardService {
  async getDashboard() {
    const { data } =
      await api.get<DashboardResponse>(
        "/dashboard"
      );

    return data.dashboard;
  }
}

const dashboardService =
  new DashboardService();

export default dashboardService;