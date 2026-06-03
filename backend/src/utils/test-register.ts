import { registerUser } from "../services/auth.service";

export const runRegisterTest = async () => {
  try {
    const user = await registerUser({
      username: "saurabh",
      email: "saurabh@test.com",
      password: "Password123",
    });

    console.log("User Created:");
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};