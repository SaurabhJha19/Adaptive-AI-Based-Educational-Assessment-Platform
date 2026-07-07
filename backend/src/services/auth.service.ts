import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

interface RegisterInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobile?: string;
  targetExam: string;
  password: string;
}

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    user,
    token,
  };
};

export const registerUser = async ({
  firstName,
  lastName,
  username,
  email,
  mobile,
  targetExam,
  password,
}: RegisterInput) => {
const existingUser =
  await User.findOne({
    $or: [
      { email },
      { username },
    ],
  });

if (existingUser) {

  if (
    existingUser.email === email
  ) {

    throw new Error(
      "Email already exists"
    );

  }

  throw new Error(
    "Username already exists"
  );

}

  const passwordHash = await bcrypt.hash(password, 10);

const user = await User.create({
  firstName,
  lastName,
  username,
  email,
  mobile,
  targetExam,
  passwordHash,
});

  return user;
};

export const updateProfile = async (
    userId: string,
    data: {
        firstName: string;
        lastName: string;
        username: string;
        mobile?: string;
        targetExam: string;
    }
) => {

    const existing =
        await User.findOne({

            username: data.username,

            _id: {
                $ne: userId,
            },

        });

    if (existing) {

        throw new Error(
            "Username already exists"
        );

    }

    const user =
        await User.findByIdAndUpdate(

            userId,

            {

                firstName: data.firstName,

                lastName: data.lastName,

                username: data.username,

                mobile: data.mobile,

                targetExam: data.targetExam,

            },

            {

                new: true,

                runValidators: true,

            }

        ).select("-passwordHash");

    return user;

};

export const changePassword = async (
    userId: string,
    currentPassword: string,
    newPassword: string
) => {

    const user =
        await User.findById(userId);

    if (!user) {

        throw new Error(
            "User not found"
        );

    }

    const valid =
        await bcrypt.compare(

            currentPassword,

            user.passwordHash

        );

    if (!valid) {

        throw new Error(
            "Current password is incorrect"
        );

    }

    user.passwordHash =
        await bcrypt.hash(
            newPassword,
            10
        );

    await user.save();

    return true;

};

export const updatePreferences = async (
    userId: string,
    data: {
        theme: string;
        preferredLanguage: string;
        dailyStudyGoal: number;
        emailNotifications: boolean;
        pushNotifications: boolean;
    }
) => {

    return await User.findByIdAndUpdate(

        userId,

        data,

        {

            new: true,

            runValidators: true,

        }

    ).select("-passwordHash");

};