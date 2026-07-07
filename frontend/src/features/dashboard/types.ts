export interface DashboardProfile {

    firstName: string;

    targetExam: string;

}

export interface DashboardStats {

    documentCount: number;

    examCount: number;

    averageScore: number;

    studyHours: number;

    questionsSolved: number;

}

export interface Recommendation {

    title: string;

    description: string;

}

export interface DashboardResponse {

    profile: DashboardProfile;

    stats: DashboardStats;

    continueLearning: any;

    recentDocuments: any[];

    recentExams: any[];

    weakAreas: any[];

    recommendations: Recommendation[];

}