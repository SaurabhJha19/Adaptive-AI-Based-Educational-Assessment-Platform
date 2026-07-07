"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    registerSchema,
    RegisterForm,
} from "@/features/auth/auth.schema";

import {
    useRegister,
} from "@/features/auth/use-register";

export default function RegisterPage() {

    const router = useRouter();

    const mutation = useRegister();

    const {

        register,

        handleSubmit,

        formState: {

            errors,

        },

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

            try {

                await mutation.mutateAsync(

                    data

                );

                router.push(

                    "/login"

                );

            } catch (

                error

            ) {

                console.error(

                    error

                );

            }

        };

    return (

        <div className="min-h-screen grid lg:grid-cols-1 items-center justify-center ">


            <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-12">

                <form

                    onSubmit={

                        handleSubmit(

                            onSubmit

                        )

                    }

                    className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-10 shadow-2xl"

                >

                    <div className="mb-8">

                        <h1 className="text-4xl font-bold">

                            Create Account

                        </h1>

                        <p className="mt-2 text-slate-500">

                            Register to start your AI learning journey.

                        </p>

                    </div>

                    <div className="grid gap-5 md:grid-cols-2">

                        <div>

                            <input

                                {...register("firstName")}

                                placeholder="First Name"

                                className="h-12 w-full rounded-lg border px-4"

                            />

                            <p className="mt-1 text-sm text-red-600">

                                {errors.firstName?.message}

                            </p>

                        </div>

                        <div>

                            <input

                                {...register("lastName")}

                                placeholder="Last Name"

                                className="h-12 w-full rounded-lg border px-4"

                            />

                            <p className="mt-1 text-sm text-red-600">

                                {errors.lastName?.message}

                            </p>

                        </div>

                        <div>

                            <input

                                {...register("username")}

                                placeholder="Username"

                                className="h-12 w-full rounded-lg border px-4"

                            />

                            <p className="mt-1 text-sm text-red-600">

                                {errors.username?.message}

                            </p>

                        </div>

                        <div>

                            <input

                                {...register("email")}

                                placeholder="Email"

                                className="h-12 w-full rounded-lg border px-4"

                            />

                            <p className="mt-1 text-sm text-red-600">

                                {errors.email?.message}

                            </p>

                        </div>

                        <div>

                            <input

                                {...register("mobile")}

                                placeholder="Mobile Number (Optional)"

                                className="h-12 w-full rounded-lg border px-4"

                            />

                        </div>

                        <div>

                            <select

                                {...register("targetExam")}

                                className="h-12 w-full rounded-lg border bg-white px-4"

                            >

                                <option value="">

                                    Select Exam

                                </option>

                                <option value="SAT">SAT</option>

                                <option value="GRE">GRE</option>

                                <option value="GMAT">GMAT</option>

                                <option value="TOEFL">TOEFL</option>

                                <option value="IELTS">IELTS</option>

                                <option value="ACT">ACT</option>

                                <option value="OTHER">Other</option>

                            </select>

                            <p className="mt-1 text-sm text-red-600">

                                {errors.targetExam?.message}

                            </p>

                        </div>
                                                <div>

                            <input

                                {...register("password")}

                                type="password"

                                placeholder="Password"

                                className="h-12 w-full rounded-lg border px-4"

                            />

                            <p className="mt-1 text-sm text-red-600">

                                {errors.password?.message}

                            </p>

                        </div>

                        <div>

                            <input

                                {...register("confirmPassword")}

                                type="password"

                                placeholder="Confirm Password"

                                className="h-12 w-full rounded-lg border px-4"

                            />

                            <p className="mt-1 text-sm text-red-600">

                                {errors.confirmPassword?.message}

                            </p>

                        </div>

                    </div>

                    {

                        mutation.isError && (

                            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

                                {

                                    (mutation.error as any)?.response?.data?.message ??

                                    "Registration failed. Please try again."

                                }

                            </div>

                        )

                    }

                    <button

                        type="submit"

                        disabled={mutation.isPending}

                        className="mt-6 h-12 w-full rounded-lg bg-slate-950 text-black border border-gray-300 rounded px-4 py-2 transition hover:bg-slate-800 cursor-pointer disabled:opacity-60"

                    >

                        {

                            mutation.isPending

                                ? "Creating Account..."

                                : "Create Account"

                        }

                    </button>

                    <div className="mt-6 text-center text-sm text-slate-600">

                        Already have an account?{" "}

                        <Link

                            href="/login"

                            className="font-semibold text-blue-600 hover:underline"

                        >

                            Sign In

                        </Link>

                    </div>

                </form>

            </div>

        </div>

    );

}