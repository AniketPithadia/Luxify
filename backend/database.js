import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
async function connectToMongoDB() {
  const uri = process.env.MONGO_URL;
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((err) => {
      console.log(err);
    });
}
export default connectToMongoDB;
