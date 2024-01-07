import express from "express";
import connectToMongoDB from "./database.js";

import userRoutes from "./Routes/UserRoutes.js";
import authRoutes from "./Routes/AuthRoutes.js";
import cookieParser from "cookie-parser";
import listingRoutes from "./Routes/ListingRoutes.js";
import cors from "cors";
import path from "path";
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// FOR DEPLOYMENT

const __dirname = path.resolve();

// FOR DEPLOYMENT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  connectToMongoDB();

  console.log("Server started");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/listing", listingRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
