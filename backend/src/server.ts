import app from "./app";
import { connectDB } from "./config/database";
import { env } from "./config/env";

//temp
import {
  testPdfExtraction
} from "./utils/test-pdf";
//temp


const startServer = async () => {
  await connectDB();

  //temp
  await testPdfExtraction();
  //temp


  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

startServer();