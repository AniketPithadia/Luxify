import express, { urlencoded } from "express";
import connectToMongoDB from "./database.js";
import userRoutes from "./Routes/UserRoutes.js";
import authRoutes from "./Routes/AuthRoutes.js";
const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(3000, () => {
  connectToMongoDB();
  console.log("Server started");
});
