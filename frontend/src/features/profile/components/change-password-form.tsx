"use client";

import { useForm } from "react-hook-form";

import {
    useChangePassword,
} from "../hooks/use-profile";

interface FormValues {

    currentPassword: string;

    newPassword: string;

    confirmPassword: string;

}

export default function ChangePasswordForm() {

    const {

        mutate,

        isPending,

    } = useChangePassword();

    const {

        register,

        handleSubmit,

        reset,

    } = useForm<FormValues>();

    const onSubmit = (
        values: FormValues
    ) => {

        if (
            values.newPassword !==
            values.confirmPassword
        ) {

            alert(
                "Passwords do not match."
            );

            return;

        }

        mutate(

            {

                currentPassword:
                    values.currentPassword,

                newPassword:
                    values.newPassword,

            },

            {

                onSuccess() {

                    reset();

                    alert(
                        "Password updated successfully."
                    );

                },

                onError(error: any) {

                    alert(

                        error?.response?.data?.message ??

                        "Unable to update password."

                    );

                },

            }

        );

    };

    return (

        <form

            onSubmit={handleSubmit(onSubmit)}

            className="space-y-4 rounded-xl border p-6"

        >

            <h2 className="text-xl font-semibold">

                Change Password

            </h2>

            <input

                {...register("currentPassword")}

                type="password"

                placeholder="Current Password"

                className="w-full rounded-lg border p-3"

            />

            <input

                {...register("newPassword")}

                type="password"

                placeholder="New Password"

                className="w-full rounded-lg border p-3"

            />

            <input

                {...register("confirmPassword")}

                type="password"

                placeholder="Confirm New Password"

                className="w-full rounded-lg border p-3"

            />

            <button

                type="submit"

                disabled={isPending}

                className="rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50"

            >

                {

                    isPending

                        ? "Updating..."

                        : "Update Password"

                }

            </button>

        </form>

    );

}