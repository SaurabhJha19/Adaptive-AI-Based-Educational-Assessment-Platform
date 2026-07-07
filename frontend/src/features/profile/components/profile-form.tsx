"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ChangePasswordForm from "./change-password-form";
import {
    useProfile,
    useUpdateProfile,
} from "../hooks/use-profile";
import ProfileAvatar from "./profile-avatar";

export default function ProfileForm() {

    const {
        data,
    } =
        useProfile();

    const {
        mutate,
        isPending,
    } =
        useUpdateProfile();

    const {

        register,

        handleSubmit,

        reset,

    } =
        useForm();

    useEffect(() => {

        if (data) {

            reset(data);

        }

    }, [

        data,

        reset,

    ]);

    return (

        <form

            onSubmit={handleSubmit(

                values =>

                    mutate(values)

            )}

            className="space-y-8"

        >
<div className="mb-10 flex items-start justify-between">

            <div>

                <h1 className="text-3xl font-bold">

                    Profile Settings

                </h1>

                <p className="text-muted-foreground">

                    Manage your personal information.

                </p>

            </div>

            <ProfileAvatar />
            </div>

            <div className="grid gap-5 md:grid-cols-2">

                <input
                    {...register("firstName")}
                    placeholder="First Name"
                    className="rounded-lg border p-3"
                />

                <input
                    {...register("lastName")}
                    placeholder="Last Name"
                    className="rounded-lg border p-3"
                />

                <input
                    {...register("username")}
                    placeholder="Username"
                    className="rounded-lg border p-3"
                />

                <input
                    value={data?.email ?? ""}
                    disabled
                    className="rounded-lg border bg-gray-100 p-3"
                />

                <input
                    {...register("mobile")}
                    placeholder="Mobile"
                    className="rounded-lg border p-3"
                />

                <select
                    {...register("targetExam")}
                    className="rounded-lg border p-3"
                >

                    <option value="SAT">SAT</option>

                    <option value="TOEFL">TOEFL</option>

                    <option value="GRE">GRE</option>

                    <option value="GMAT">GMAT</option>

                    <option value="ACT">ACT</option>

                    <option value="IELTS">IELTS</option>

                    <option value="OTHER">Other</option>

                </select>

            </div>

            <button

                disabled={isPending}

                className="rounded-lg bg-black px-6 py-3 text-white"

            >

                {

                    isPending

                        ? "Saving..."

                        : "Save Changes"

                }

            </button>

            <div className="mt-12">

                <ChangePasswordForm />

            </div>

        </form>

    );

}