export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {

    firstName: string;

    lastName: string;

    username: string;

    email: string;

    mobile?: string;

    targetExam:
        | "SAT"
        | "TOEFL"
        | "GRE"
        | "GMAT"
        | "ACT"
        | "IELTS"
        | "OTHER";

    password: string;

    confirmPassword: string;

}

export interface AuthResponse {
  token: string;

  user: {
    id: string;
    username: string;
    email: string;
  };
}