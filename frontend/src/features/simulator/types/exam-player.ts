export interface PlayerState {
    currentSection: number;
    currentGroup: number;
    currentQuestion: number;

    answers: Record<string, string>;

    marked: string[];

    remainingTime: number;

    completed: boolean;
}