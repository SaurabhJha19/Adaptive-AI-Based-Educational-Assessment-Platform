"use client";

import { useRouter }
from "next/navigation";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  registerSchema,
  RegisterForm,
} from "@/features/auth/auth.schema";

import {
  useRegister,
} from "@/features/auth/use-register";

export default function RegisterPage() {

  const router =
    useRouter();

  const mutation =
    useRegister();

  const {
    register,
    handleSubmit,
  } = useForm<RegisterForm>({
    resolver:
      zodResolver(
        registerSchema
      ),
  });

  const onSubmit =
    async (
      data: RegisterForm
    ) => {

      await mutation.mutateAsync(
        data
      );

      router.push(
        "/login"
      );
    };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="w-full max-w-md border rounded-lg p-8 space-y-4"
      >

        <h1 className="text-2xl font-bold">
          Register
        </h1>

        <input
          {...register(
            "username"
          )}
          placeholder="Username"
          className="w-full border p-2 rounded"
        />

        <input
          {...register(
            "email"
          )}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />

        <input
          {...register(
            "password"
          )}
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full border p-2 rounded"
        >
          Register
        </button>

      </form>

    </div>
  );
}