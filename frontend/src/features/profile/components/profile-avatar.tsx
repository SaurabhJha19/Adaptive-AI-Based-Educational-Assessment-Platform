"use client";

import { useState } from "react";

export default function ProfileAvatar() {

    const [preview] =
        useState<string>("");

    return (

        <div className="flex flex-col items-center gap-4">

            <div className="flex h-32 w-32 items-center justify-center rounded-full border bg-muted text-4xl font-bold">

                {preview
                    ? (
                        <img
                            src={preview}
                            className="h-full w-full rounded-full object-cover"
                        />
                    )
                    : "👤"}

            </div>

            <button
                type="button"
                className="rounded-lg border px-4 py-2"
            >
                Upload Photo
            </button>

        </div>

    );

}