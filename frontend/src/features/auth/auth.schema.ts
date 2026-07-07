import { z } from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
});

export const registerSchema = z.object({

    firstName: z.string().min(2),

    lastName: z.string().min(2),

    username: z.string().min(3),

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

            .min(

                8,

                "Password must be at least 8 characters."

            )

            .regex(

                /[A-Z]/,

                "Password must contain at least one uppercase letter."

            )

            .regex(

                /[a-z]/,

                "Password must contain at least one lowercase letter."

            )

            .regex(

                /[0-9]/,

                "Password must contain at least one number."

            ),

    confirmPassword: z.string(),

}).refine(

    data =>
        data.password ===
        data.confirmPassword,

    {

        path: [
            "confirmPassword",
        ],

        message:
            "Passwords do not match",

    }

);

export type LoginForm =
    z.infer<
        typeof loginSchema
    >;

export type RegisterForm =
    z.infer<
        typeof registerSchema
    >;