import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";
import { loginUser } from "../services/auth.service";
import { User } from "../models/user.model";
import { AuthRequest } from "../middleware/auth.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { asyncHandler } from "../utils/async-handler";
import { updateProfile, changePassword, updatePreferences,} from "../services/auth.service";

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
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        username: result.user.username,
        email: result.user.email,
        mobile: result.user.mobile,
        targetExam: result.user.targetExam,
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
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          mobile: user.mobile,
          targetExam: user.targetExam,
        },
      });
  }
);

export const updateCurrentUser =
asyncHandler(

    async (

        req: AuthRequest,

        res: Response

    ) => {

        const user =
            await updateProfile(

                req.user!.userId,

                req.body

            );

        res.json({

            success: true,

            user,

        });

    }

);

export const changeCurrentPassword =
asyncHandler(

    async (

        req: AuthRequest,

        res: Response

    ) => {

        const {

            currentPassword,

            newPassword,

        } = req.body;

        await changePassword(

            req.user!.userId,

            currentPassword,

            newPassword

        );

        res.json({

            success: true,

            message:
                "Password updated successfully",

        });

    }

);

export const updateCurrentPreferences =
asyncHandler(

    async (

        req: AuthRequest,

        res: Response

    ) => {

        const user =
            await updatePreferences(

                req.user!.userId,

                req.body

            );

        res.json({

            success: true,

            user,

        });

    }

);