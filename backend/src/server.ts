import app from "./app";
import { connectDB } from "./config/database";
import { env } from "./config/env";

//temp
import { runRegisterTest } from "./utils/test-register";
//temp

const startServer = async () => {
  await connectDB();

  //temp
  await runRegisterTest();
  //temp

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

startServer();