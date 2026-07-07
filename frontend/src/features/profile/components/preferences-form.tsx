"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
    useProfile,
    useUpdatePreferences,
} from "../hooks/use-profile";

export default function PreferencesForm() {

    const { data } =
        useProfile();

    const {

        mutate,

        isPending,

    } =
        useUpdatePreferences();

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

            className="space-y-6"

        >

            <h1 className="text-3xl font-bold">

                Preferences

            </h1>

            <select
                {...register("theme")}
                className="w-full rounded-lg border p-3"
            >
                <option value="system">System</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
            </select>

            <input
                {...register("preferredLanguage")}
                placeholder="Preferred Language"
                className="w-full rounded-lg border p-3"
            />

            <input
                type="number"
                {...register("dailyStudyGoal")}
                placeholder="Daily Study Goal (minutes)"
                className="w-full rounded-lg border p-3"
            />

            <label className="flex items-center gap-2">

                <input
                    type="checkbox"
                    {...register("emailNotifications")}
                />

                Email Notifications

            </label>

            <label className="flex items-center gap-2">

                <input
                    type="checkbox"
                    {...register("pushNotifications")}
                />

                Push Notifications

            </label>

            <button

                disabled={isPending}

                className="rounded-lg bg-black px-6 py-3 text-white"

            >

                {

                    isPending

                        ? "Saving..."

                        : "Save Preferences"

                }

            </button>

        </form>

    );

}