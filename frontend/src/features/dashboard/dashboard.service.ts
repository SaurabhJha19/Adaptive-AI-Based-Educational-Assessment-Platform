import api from "@/lib/api";

import { DashboardResponse } from "./types";

class DashboardService {

    async getDashboard(): Promise<DashboardResponse> {

        const { data } =

            await api.get<DashboardResponse>(
                "/dashboard"
            );

        return data;

    }

}

export default new DashboardService();