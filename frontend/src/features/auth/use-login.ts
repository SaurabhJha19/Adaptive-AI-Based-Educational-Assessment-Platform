"use client";

import {
  useMutation,
} from "@tanstack/react-query";

import {
  login,
} from "./auth.service";

export const useLogin =
  () => {

    return useMutation({
      mutationFn: login,
    });
  };