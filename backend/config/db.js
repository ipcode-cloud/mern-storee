import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDB = async () => {
    const connect = await mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log(`MongoDB Connected`);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);//exit with failure 1=error, 0=success
  });
};

