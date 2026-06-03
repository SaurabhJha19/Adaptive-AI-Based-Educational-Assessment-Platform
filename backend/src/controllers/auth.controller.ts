import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";
import { loginUser } from "../services/auth.service";
import { User } from "../models/user.model";
import { AuthRequest } from "../middleware/auth.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { asyncHandler } from "../utils/async-handler";

export const getCurrentUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    const user = await User.findById(
      req.user?.userId
    ).select("-passwordHash");

    res.status(200).json({
      success: true,
      user,
    });
  }
);

export const login = asyncHandler(
  async (req, res) => {

    const validatedData =
      loginSchema.parse(req.body);

    const result =
      await loginUser(
        validatedData.email,
        validatedData.password
      );

    res.status(200).json({
      success: true,
      token: result.token,
      user: {
        id: result.user._id,
        username: result.user.username,
        email: result.user.email,
      },
    });
  }
);

export const register = asyncHandler(
  async (req, res) => {

    const validatedData =
      registerSchema.parse(req.body);

    const user =
      await registerUser(validatedData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  }
);