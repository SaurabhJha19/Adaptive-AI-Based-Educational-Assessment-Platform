export interface DashboardStats {
  documentCount: number;
  examCount: number;
  averageScore: number;
  studyHours: number;
}

export interface Recommendation {
  title: string;
  description: string;
}

export interface WeeklyProgress {
  completedAssessments: number;
  averageScore: number;
}

export interface DashboardData {
  stats: DashboardStats;

  continueLearning: any;

  recentDocuments: any[];

  recentActivity: any[];

  recommendation: Recommendation;

  weeklyProgress: WeeklyProgress;
}

export interface DashboardResponse {
  success: boolean;
  dashboard: DashboardData;
}