import { api }
from "@/services/api";

import {
  LoginDto,
  RegisterDto,
} from "@/types/auth";

export const login =
  async (
    data: LoginDto
  ) => {

    const response =
      await api.post(
        "/auth/login",
        data
      );

    return response.data;
  };

export const register =
  async (
    data: RegisterDto
  ) => {

    const response =
      await api.post(
        "/auth/register",
        data
      );

    return response.data;
  };