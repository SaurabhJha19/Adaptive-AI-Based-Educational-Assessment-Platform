"use client";

import {
  useMutation,
} from "@tanstack/react-query";

import {
  register,
} from "./auth.service";

export const useRegister =
  () => {

    return useMutation({
      mutationFn: register,
    });
  };