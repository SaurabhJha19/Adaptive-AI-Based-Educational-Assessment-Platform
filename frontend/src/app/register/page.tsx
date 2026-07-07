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

import Link from "next/link";

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
      <div className="grid gap-4 md:grid-cols-2">
       <input
            {...register("firstName")}
            placeholder="First Name"
        />

        <input
            {...register("lastName")}
            placeholder="Last Name"
        />
       </div>
       <div className="grid gap-4 md:grid-cols-2">

        <input
            {...register("username")}
            placeholder="Username"
        />

        <input
            {...register("email")}
            placeholder="Email"
        />
        </div>
        <div className="grid gap-4 md:grid-cols-2">

        <input
            {...register("mobile")}
            type="tel"
            placeholder="Mobile Number (Optional)"
            className="h-11 rounded-md border px-3"
        />

        <select
            {...register("targetExam")}
            className="h-11 rounded-md border bg-background px-3"
        >

            <option value="">
                Select Exam
            </option>

            <option value="SAT">
                SAT
            </option>

            <option value="TOEFL">
                TOEFL
            </option>

            <option value="GRE">
                GRE
            </option>

            <option value="GMAT">
                GMAT
            </option>

            <option value="ACT">
                ACT
            </option>

            <option value="IELTS">
                IELTS
            </option>

            <option value="OTHER">
                Other
            </option>

        </select>
          </div>
          <div className="grid gap-4 md:grid-cols-2">

        <input
            {...register("password")}
            type="password"
            placeholder="Password"
        />

        <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
        />
        </div>
        <button
          type="submit"
          className="w-full border p-2 rounded"
        >
          Register
        </button>

      <div className="text-center text-sm">

          Already have an account?{" "}

        <Link
            href="/login"
            className="font-medium text-primary hover:underline"
        >
            Login
        </Link>

      </div>
      </form>

    </div>
  );
}

<div className="min-h-screen grid lg:grid-cols-2 bg-slate-950">

    {/* Left Branding */}

    <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-16">

        <div>

            <div className="flex items-center gap-3">

                <div className="h-12 w-12 rounded-xl bg-blue-600" />

                <div>

                    <h2 className="text-2xl font-bold text-white">
                        Adaptive AI
                    </h2>

                    <p className="text-slate-400">
                        Assessment Platform
                    </p>

                </div>

            </div>

        </div>

        <div className="space-y-6">

            <h1 className="text-5xl font-bold leading-tight text-white">

                Learn Smarter.

                <br />

                Score Higher.

            </h1>

            <p className="max-w-lg text-lg leading-8 text-slate-300">

                Prepare for SAT, TOEFL, GRE, GMAT and more using
                AI-powered adaptive practice tests and detailed
                performance analytics.

            </p>

        </div>

        <div className="text-slate-500">

            © 2026 Adaptive AI Assessment Platform

        </div>

    </div>

    {/* Right */}

    <div className="flex items-center justify-center bg-slate-100 p-10">

        {/* Form Here */}

    </div>

</div>