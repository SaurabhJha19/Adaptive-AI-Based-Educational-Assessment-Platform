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
  loginSchema,
  LoginForm,
} from "@/features/auth/auth.schema";

import {
  useLogin,
} from "@/features/auth/use-login";

import {
  useAuth,
} from "@/providers/auth-provider";

export default function LoginPage() {

  const router =
    useRouter();

  const auth =
    useAuth();

  const mutation =
    useLogin();

  const {
    register,
    handleSubmit,
  } = useForm<LoginForm>({
    resolver:
      zodResolver(
        loginSchema
      ),
  });

  const onSubmit =
    async (
      data: LoginForm
    ) => {

      const result =
        await mutation.mutateAsync(
          data
        );

      auth.login(
        result.token
      );

      router.push(
        "/dashboard"
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
          Login
        </h1>

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
          Login
        </button>

      </form>

    </div>
  );
}