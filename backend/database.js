import MongoClient from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
async function connectToMongoDB() {
  //   const uri = process.env.MONGO_URL;
  //   const client = new MongoClient(uri);
  //   try {
  //     await client.connect();
  //     console.log("Connected to MongoDB");
  //     return client;
  //   } catch (error) {
  //     console.error("Error connecting to MongoDB:", error);
  //     throw error;
  //   }
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      throw err;
    });
}
export default connectToMongoDB;