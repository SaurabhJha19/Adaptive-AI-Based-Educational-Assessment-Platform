import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(2),

    lastName: z.string().min(2),

    username: z.string().min(3).max(30),

    email: z.email(),

    mobile: z.string().optional(),

    targetExam: z.enum([
      "SAT",
      "TOEFL",
      "GRE",
      "GMAT",
      "ACT",
      "IELTS",
      "OTHER",
    ]),

    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/[0-9]/),

    confirmPassword: z.string(),
  })
  .refine(
    data =>
      data.password ===
      data.confirmPassword,
    {
      path: ["confirmPassword"],
      message:
        "Passwords do not match",
    }
  );

export const loginSchema = z.object({
  email: z
    .email("Invalid email format"),

  password: z
    .string()
    .min(1, "Password is required"),
});