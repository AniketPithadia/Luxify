import express, { urlencoded } from "express";
import connectToMongoDB from "./database.js";
import userRoutes from "./Routes/UserRoutes.js";
import authRoutes from "./Routes/AuthRoutes.js";

const app = express();
app.use(express.json());
app.listen(3000, () => {
  connectToMongoDB();
  console.log("Server started");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
