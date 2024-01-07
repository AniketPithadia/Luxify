import express from "express";
import connectToMongoDB from "./database.js";

import userRoutes from "./Routes/UserRoutes.js";
import authRoutes from "./Routes/AuthRoutes.js";
import cookieParser from "cookie-parser";
import listingRoutes from "./Routes/ListingRoutes.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 5000;
app.listen(port, () => {
  connectToMongoDB()
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("Server started");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/listing", listingRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
