import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import * as service from "../profile.service";

export function useProfile() {

    return useQuery({

        queryKey: ["profile"],

        queryFn: service.getProfile,

    });

}

export function useUpdateProfile() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            service.updateProfile,

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: [
                    "profile",
                ],

            });

        },

    });

}


export function useChangePassword() {

    return useMutation({

        mutationFn:
            service.changePassword,

    });

}

export function useUpdatePreferences() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            service.updatePreferences,

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: [
                    "profile",
                ],

            });

        },

    });

}