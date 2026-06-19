import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

interface RegisterInput {
  username: string;
  email: string;
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
  username,
  email,
  password,
}: RegisterInput) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    passwordHash,
  });

  return user;
};