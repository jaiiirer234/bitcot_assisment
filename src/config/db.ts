import { AppDataSource } from "../../ormconfig";

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");
  } catch (error) {
    console.log("DataBase connection failed with this error", error);
  }
};
