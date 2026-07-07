import api from "@/lib/api";

export async function getProfile() {
    const { data } = await api.get("/auth/me");
    return data.user;
}

export async function updateProfile(payload: any) {
    const { data } = await api.put("/auth/me", payload);
    return data.user;
}

export async function changePassword(
    payload: {

        currentPassword: string;

        newPassword: string;

    }
) {

    const { data } =
        await api.put(

            "/auth/change-password",

            payload

        );

    return data;

}

export async function updatePreferences(
    payload: any
) {

    const { data } =
        await api.put(

            "/auth/preferences",

            payload

        );

    return data.user;

}