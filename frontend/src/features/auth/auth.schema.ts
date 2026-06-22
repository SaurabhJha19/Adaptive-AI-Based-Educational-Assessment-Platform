import { z }
from "zod";

export const loginSchema =
  z.object({
    email:
      z.email(),
    password:
      z.string()
        .min(6),
  });

export const registerSchema =
  z.object({
    username:
      z.string()
        .min(3),

    email:
      z.email(),

    password:
      z.string()
        .min(6),
  });

export type LoginForm =
  z.infer<
    typeof loginSchema
  >;

export type RegisterForm =
  z.infer<
    typeof registerSchema
  >;