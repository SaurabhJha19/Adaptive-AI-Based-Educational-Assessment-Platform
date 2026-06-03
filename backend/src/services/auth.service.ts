import bcrypt from "bcryptjs";
import { User } from "../models/user.model";

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

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